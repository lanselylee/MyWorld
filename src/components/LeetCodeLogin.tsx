'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { Login, Code } from '@mui/icons-material';

interface LeetCodeLoginProps {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

export default function LeetCodeLogin({ open, onClose, onLogin }: LeetCodeLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单验证
    if (!username.trim()) {
      setError('请输入用户名');
      return;
    }
    
    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    // 简单的"验证" (实际项目中需要真实的后端验证)
    if (password === 'xiaomeng' || password === 'admin' || password === '123456') {
      onLogin(username);
      onClose();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('密码错误！提示：试试 "xiaomeng", "admin" 或 "123456"');
    }
  };

  const handleClose = () => {
    onClose();
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Code sx={{ fontSize: '2rem' }} />
        <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
          LeetCode Journey 登录
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  '& .MuiAlert-icon': { color: '#ffcdd2' }
                }}
              >
                {error}
              </Alert>
            )}

            <TextField
              label="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                },
                '& .MuiInputLabel-root': { 
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': { color: 'white' }
                }
              }}
            />

            <TextField
              label="密码"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                },
                '& .MuiInputLabel-root': { 
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': { color: 'white' }
                }
              }}
            />

            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              💡 Demo密码: xiaomeng, admin, 或 123456
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleClose}
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            取消
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Login />}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              borderRadius: '8px',
              px: 3
            }}
          >
            登录
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
