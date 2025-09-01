'use client';

import { Box, Typography, Button } from '@mui/material';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          p: 4
        }}>
          <Typography variant="h3" component="h1" sx={{ mb: 2, color: '#e74c3c' }}>
            Something went wrong!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#7f8c8d' }}>
            {error.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            onClick={reset}
            sx={{
              bgcolor: '#3498db',
              '&:hover': { bgcolor: '#2980b9' }
            }}
          >
            Try again
          </Button>
        </Box>
      </body>
    </html>
  );
}

