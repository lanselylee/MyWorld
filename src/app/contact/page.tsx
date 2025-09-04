'use client';

import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Email, CheckCircle } from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName) {
      setSubmitStatus('error');
      setStatusMessage('请填写必需的字段（姓名和邮箱）');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // EmailJS配置 - 需要您在EmailJS.com注册并获取这些参数
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Xiaomen Li', // 您的姓名
      };

      // 发送邮件
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_default',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_default',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_default'
      );

      setSubmitStatus('success');
      setStatusMessage('消息发送成功！我会尽快回复您。');
      
      // 清空表单
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('邮件发送失败:', error);
      setSubmitStatus('error');
      setStatusMessage('发送失败，请稍后重试或直接发送邮件到 Li.xiaomen@northeastern.edu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 30% 70%, rgba(245, 245, 245, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(250, 250, 250, 0.4) 0%, transparent 50%),
        linear-gradient(135deg, #ffffff 0%, #fafafa 100%)
      `, // 与其他页面保持一致的白色背景
      py: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* 左右布局容器 */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: { xs: 4, md: 8 },
          alignItems: 'start'
        }}>
          {/* 左侧 - Contact表单 */}
          <Box>
            {/* 页面标题 */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                textAlign: 'left',
                fontWeight: 300,
                fontSize: { xs: '2rem', md: '2.8rem' },
                color: '#2c2c2c',
                letterSpacing: '0.05em',
                mb: 1.5,
                fontFamily: '"Inter", "Helvetica", sans-serif'
              }}
            >
              Contact
            </Typography>

            {/* 副标题 */}
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                color: '#6c6c6c',
                fontWeight: 300,
                mb: 4,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Please leave your email so I can contact you.
            </Typography>

            {/* 联系表单 */}
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '550px' }}>
          {/* 姓名输入框 */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 1.5, 
            mb: 2 
          }}>
            <Box>
              <Typography variant="body2" sx={{ 
                color: '#2c2c2c', 
                mb: 0.5,
                fontWeight: 400,
                fontSize: '0.85rem'
              }}>
                First Name
              </Typography>
              <TextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    height: '48px',  // 增加输入框高度
                    '& fieldset': {
                      borderColor: '#d1d5db',
                      borderWidth: '2px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#9ca3af'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1'
                    }
                  }
                }}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ 
                color: '#2c2c2c', 
                mb: 0.5,
                fontWeight: 400,
                fontSize: '0.85rem'
              }}>
                Last Name
              </Typography>
              <TextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    height: '48px',  // 增加输入框高度
                    '& fieldset': {
                      borderColor: '#d1d5db',
                      borderWidth: '2px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#9ca3af'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1'
                    }
                  }
                }}
              />
            </Box>
          </Box>

          {/* 邮箱输入框 */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ 
              color: '#2c2c2c', 
              mb: 0.5,
              fontWeight: 400,
              fontSize: '0.85rem'
            }}>
              Email *
            </Typography>
            <TextField
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1'
                  }
                }
              }}
            />
          </Box>

          {/* 消息输入框 */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ 
              color: '#2c2c2c', 
              mb: 0.5,
              fontWeight: 400,
              fontSize: '0.85rem'
            }}>
              Message
            </Typography>
            <TextField
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1'
                  }
                }
              }}
            />
          </Box>

          {/* 状态提示 */}
          {submitStatus !== 'idle' && (
            <Box sx={{ mb: 2 }}>
              <Alert 
                severity={submitStatus === 'success' ? 'success' : 'error'}
                icon={submitStatus === 'success' ? <CheckCircle /> : undefined}
                sx={{
                  borderRadius: '8px',
                  '& .MuiAlert-message': {
                    fontSize: '0.9rem'
                  }
                }}
              >
                {statusMessage}
              </Alert>
            </Box>
          )}

          {/* 提交按钮 */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              type="submit"
              variant="outlined"
              disabled={isLoading}
              sx={{
                px: 3,
                py: 1,
                borderRadius: '20px',
                borderColor: '#2c2c2c',
                color: '#2c2c2c',
                borderWidth: '2px',
                fontSize: '0.9rem',
                fontWeight: 400,
                textTransform: 'none',
                position: 'relative',
                '&:hover': {
                  borderColor: '#1a1a1a',
                  backgroundColor: '#f8f9fa'
                },
                '&:disabled': {
                  borderColor: '#9ca3af',
                  color: '#9ca3af'
                }
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress 
                    size={16} 
                    sx={{ 
                      mr: 1,
                      color: '#9ca3af'
                    }} 
                  />
                  发送中...
                </>
              ) : (
                'Send'
              )}
            </Button>
          </Box>
        </Box>

            {/* 底部联系信息 */}
            <Box sx={{
              borderTop: '1px solid #e5e7eb',
              pt: 3,
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Email sx={{ 
                  fontSize: '1.3rem', 
                  color: '#2c2c2c',
                  opacity: 0.8 
                }} />
                <Typography sx={{
                  color: '#2c2c2c',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  letterSpacing: '0.3px'
                }}>
                  Li.xiaomen@northeastern.edu
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 右侧 - Cartoon6 图片 */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'flex-start',
            pt: 20  // 向下偏移一些，与标题对齐
          }}>
            <Image
              src="/cartoon6.PNG"
              alt="Decorative illustration"
              width={500}
              height={300}
              style={{
                borderRadius: '16px',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))',
                opacity: 0.9,
                objectFit: 'contain'  // 保持原始比例
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
  