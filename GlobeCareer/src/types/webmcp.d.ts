// WebMCP (Web Model Context Protocol) HTML Attribute Types
import 'react';

declare module 'react' {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    'tool-name'?: string;
    'data-tool-name'?: string;
    tooldescription?: string;
    'tool-description'?: string;
    'data-tool-description'?: string;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
    'tool-param-description'?: string;
  }

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
    'tool-param-description'?: string;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
    'tool-param-description'?: string;
  }
}

declare global {
  interface ModelContextTool {
    name: string;
    title?: string;
    description: string;
    inputSchema: {
      type: string;
      properties?: Record<string, { type: string; description: string }>;
      required?: string[];
      additionalProperties?: boolean;
    };
    execute: (params: any) => Promise<any> | any;
  }

  interface ModelContext {
    registerTool: (tool: ModelContextTool, options?: any) => void | Promise<void>;
    unregisterTool?: (name: string) => void;
  }

  interface Document {
    modelContext?: ModelContext;
  }

  interface Navigator {
    modelContext?: ModelContext;
  }

  interface Window {
    modelContext?: ModelContext;
  }
}
