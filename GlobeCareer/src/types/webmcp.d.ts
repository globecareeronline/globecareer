// WebMCP (Web Model Context Protocol) HTML Attribute Types
import 'react';

declare module 'react' {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
  }
}

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: {
        name: string;
        description: string;
        inputSchema: {
          type: string;
          properties?: Record<string, { type: string; description: string }>;
          required?: string[];
        };
        execute: (params: any) => Promise<any> | any;
      }) => void;
      unregisterTool?: (name: string) => void;
    };
  }
}
