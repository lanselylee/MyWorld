// Fallback JSX ambient types to satisfy TS when react types aren't yet resolved.
// Remove if your environment resolves @types/react correctly.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}


