/// <reference types="react-scripts" />

declare module 'react' {
  export interface FC<P = {}> {
    (props: P): JSX.Element | null;
  }
  
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  
  export default any;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): {
    render(element: JSX.Element): void;
  };
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
