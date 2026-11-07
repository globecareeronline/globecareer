import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  deleteUser,
  User,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { UserSubscription } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  subscription: UserSubscription;
  isPro: boolean;
  isAdmin: boolean;
  remainingApplications: number;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  sendVerification: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  activateProSubscription: (plan: 'monthly' | 'annual', orderId?: string) => Promise<void>;
  cancelProSubscription: () => Promise<void>;
  recordJobApplication: (jobId: string, jobTitle: string, company: string, location?: string) => Promise<{ success: boolean; remaining: number }>;
}

const defaultSubscription: UserSubscription = {
  status: 'free',
  plan: 'free',
  applicationsUsedThisPeriod: 0,
  maxApplicationsAllowed: 999999, // 100% Free - unlimited eligible applications
  periodResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
};

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAILS = ['ahmadbusiness.pk@gmail.com'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscription, setSubscription] = useState<UserSubscription>(defaultSubscription);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    let unsubSub: (() => void) | null = null;

    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      
      // Clean up previous subscription listener if user changed
      if (unsubSub) {
        unsubSub();
        unsubSub = null;
      }

      if (currentUser) {
        // Check admin email
        const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email?.toLowerCase() || '');
        setIsAdmin(userIsAdmin);

        // Sync or get user profile
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || '',
              photoURL: currentUser.photoURL || '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }, { merge: true });
          }
        } catch (err) {
          console.warn('User profile sync:', err);
        }

        // Listen to subscription updates
        const subRef = doc(db, 'users', currentUser.uid, 'subscription', 'current');
        unsubSub = onSnapshot(subRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserSubscription;
            setSubscription(data);
          } else {
            // Default free tier
            setSubscription(defaultSubscription);
          }
          setLoading(false);
        }, (error) => {
          console.warn('Subscription listener:', error);
          setSubscription(defaultSubscription);
          setLoading(false);
        });
      } else {
        setIsAdmin(false);
        setSubscription(defaultSubscription);
        setLoading(false);
      }
    });

    return () => {
      if (unsubSub) unsubSub();
      unsubscribeAuth();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in Error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error('Email Sign-in Error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        // Set user profile display name immediately
        if (name && name.trim()) {
          try {
            await updateProfile(cred.user, { displayName: name.trim() });
          } catch (profileErr) {
            console.warn('Profile name update notice:', profileErr);
          }
        }

        // Send email verification with safe error capture
        try {
          await sendEmailVerification(cred.user);
        } catch (verifErr) {
          console.warn('Initial email verification send notice:', verifErr);
        }

        // Initialize user document in Firestore
        try {
          const userRef = doc(db, 'users', cred.user.uid);
          await setDoc(userRef, {
            uid: cred.user.uid,
            email: cred.user.email || '',
            displayName: name?.trim() || cred.user.displayName || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }, { merge: true });

          // Initialize free tier subscription document
          const subRef = doc(db, 'users', cred.user.uid, 'subscription', 'current');
          await setDoc(subRef, {
            status: 'free',
            plan: 'free',
            updatedAt: new Date().toISOString(),
          }, { merge: true });
        } catch (dbErr) {
          console.warn('Initial user profile firestore setup warning:', dbErr);
        }
      }
    } catch (error) {
      console.error('Sign-up Error:', error);
      throw error;
    }
  };

  const sendResetEmail = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password Reset Error:', error);
      throw error;
    }
  };

  const sendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        console.error('Email verification error:', error);
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSubscription(defaultSubscription);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        setUser(null);
        setSubscription(defaultSubscription);
      } catch (error) {
        console.error('Delete account error:', error);
        throw error;
      }
    }
  };

  const activateProSubscription = async (plan: 'monthly' | 'annual', orderId?: string) => {
    if (!auth.currentUser) {
      throw new Error('Must be signed in to activate subscription');
    }
    const now = new Date();
    const expiry = new Date();
    if (plan === 'monthly') {
      expiry.setDate(expiry.getDate() + 30);
    } else {
      expiry.setDate(expiry.getDate() + 365);
    }

    const maxAllowed = plan === 'monthly' ? 12 : 999999;
    const amountPaid = plan === 'monthly' ? 9.99 : 99.99;

    const subData: UserSubscription = {
      status: 'pro',
      plan,
      subscriptionId: orderId || `sub_${Date.now()}`,
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: expiry.toISOString(),
      cancelAtPeriodEnd: false,
      applicationsUsedThisPeriod: 0,
      maxApplicationsAllowed: maxAllowed,
      periodResetDate: expiry.toISOString().split('T')[0],
      paymentProvider: 'direct_secure',
      lastPaymentDate: now.toISOString(),
      amountPaid,
    };

    try {
      const subRef = doc(db, 'users', auth.currentUser.uid, 'subscription', 'current');
      await setDoc(subRef, subData, { merge: true });
      setSubscription(subData);
    } catch (err) {
      console.warn('Subscription Firestore sync note:', err);
      setSubscription(subData);
    }
  };

  const cancelProSubscription = async () => {
    if (!auth.currentUser) return;
    const subData: UserSubscription = {
      ...subscription,
      cancelAtPeriodEnd: true,
    };
    try {
      const subRef = doc(db, 'users', auth.currentUser.uid, 'subscription', 'current');
      await setDoc(subRef, subData, { merge: true });
      setSubscription(subData);
    } catch (err) {
      setSubscription(subData);
    }
  };

  const recordJobApplication = async (jobId: string, jobTitle: string, company: string, location?: string) => {
    const currentUsed = (subscription.applicationsUsedThisPeriod || 0) + 1;
    const remaining = 999999;

    const updatedSub: UserSubscription = {
      ...subscription,
      applicationsUsedThisPeriod: currentUsed,
    };

    // Update subscription in Firestore if user is signed in
    if (auth.currentUser) {
      try {
        const subRef = doc(db, 'users', auth.currentUser.uid, 'subscription', 'current');
        await setDoc(subRef, { applicationsUsedThisPeriod: currentUsed }, { merge: true });
      } catch (err) {
        console.warn('Subscription update warning:', err);
      }
    }
    setSubscription(updatedSub);

    // Record application in user's application pipeline
    const appId = `app_${Date.now()}`;
    const newAppRecord = {
      id: appId,
      userId: auth.currentUser?.uid || 'guest',
      jobId,
      jobTitle,
      company,
      location: location || 'International',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      notes: 'Applied via GlobeCareer Verified Portal (100% Free).',
    };

    if (auth.currentUser) {
      try {
        const appRef = doc(db, 'users', auth.currentUser.uid, 'applications', appId);
        await setDoc(appRef, newAppRecord);
      } catch (err) {
        console.warn('App pipeline record note:', err);
      }
    }

    // Also persist to localStorage pipeline for instant UI reflection
    try {
      const existing = localStorage.getItem('globecareer_applications') || localStorage.getItem('globecv_applications');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newAppRecord);
      localStorage.setItem('globecareer_applications', JSON.stringify(list));
    } catch (e) {
      // LocalStorage access safe catch
    }

    return { success: true, remaining };
  };

  const isPro = true; // All features 100% free sitewide
  const remainingApplications = 999999; // Unlimited applications

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        subscription,
        isPro,
        isAdmin,
        remainingApplications,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendResetEmail,
        sendVerification,
        logout,
        deleteAccount,
        activateProSubscription,
        cancelProSubscription,
        recordJobApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
