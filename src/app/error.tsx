'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ marginBottom: '1rem', color: '#e74c3c', fontSize: '2rem' }}>
        Something went wrong!
      </h1>
      <p style={{ marginBottom: '2rem', color: '#7f8c8d', fontSize: '1.1rem' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}
