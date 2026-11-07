export interface UserSubscription {
  status: 'free' | 'pro' | 'canceled' | 'past_due';
  plan: 'none' | 'free' | 'monthly' | 'annual';
  subscriptionId?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  applicationsUsedThisPeriod: number;
  maxApplicationsAllowed: number; // 12 for monthly, 999999 for annual (unlimited), 0 for free
  periodResetDate?: string;
  paymentProvider?: 'stripe' | 'paddle' | 'direct_secure';
  lastPaymentDate?: string;
  amountPaid?: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: string;
}

export interface AuthState {
  user: any | null;
  loading: boolean;
  subscription: UserSubscription;
  isPro: boolean;
  isAdmin: boolean;
}

