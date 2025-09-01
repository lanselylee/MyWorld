export default function NotFound() {
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
      <h1 style={{ marginBottom: '1rem', color: '#2c3e50', fontSize: '3rem' }}>
        404
      </h1>
      <h2 style={{ marginBottom: '1rem', color: '#34495e', fontSize: '2rem' }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: '2rem', color: '#7f8c8d', fontSize: '1.1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '1rem'
        }}
      >
        Go Home
      </a>
    </div>
  );
}

