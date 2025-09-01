'use client';

import { Box, Container, Typography, Card, CardContent, Grid, Modal, Fab, TextField, Button, IconButton } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface Dream {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
}

export default function DreamsPage() {
  const [dreams, setDreams] = useState<Dream[]>([
    {
      id: '1',
      title: '我梦见自己在海边奔跑',
      content: '夕阳西下，我赤着脚在柔软的沙滩上奔跑。海浪轻抚着我的脚踝，咸湿的海风吹散了我的头发。那一刻，我感到前所未有的自由，仿佛可以跑到天涯海角，跑到时间的尽头。',
      x: 15,
      y: 20,
      size: 'medium'
    },
    {
      id: '2', 
      title: '我梦到一只没有眼睛的人',
      content: '在昏暗的街道上，我遇到了一个奇怪的人。他没有眼睛，却能准确地看到一切。他告诉我，真正的视觉不在于眼睛，而在于心灵。当我醒来时，这句话依然在我耳边回响。',
      x: 70,
      y: 30,
      size: 'large'
    },
    {
      id: '3',
      title: '飞翔在星空中',
      content: '我张开双臂，缓缓升上夜空。星星在我身边闪烁，月亮为我照亮道路。我穿越云层，感受着宇宙的无垠与静谧。在这里，没有重力的束缚，只有无限的可能。',
      x: 40,
      y: 60,
      size: 'small'
    },
    {
      id: '4',
      title: '时间倒流的城市',
      content: '我走在一座奇特的城市里，这里的时间是倒流的。破碎的花瓶重新拼合，凋零的花朵重新绽放，老人变回年轻的模样。我意识到，也许时间本身就是一个幻象。',
      x: 25,
      y: 75,
      size: 'medium'
    }
  ]);

  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDreamTitle, setNewDreamTitle] = useState('');
  const [newDreamContent, setNewDreamContent] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDreamClick = (dream: Dream) => {
    setSelectedDream(dream);
  };

  const handleAddDream = () => {
    if (newDreamTitle.trim() && newDreamContent.trim()) {
      const newDream: Dream = {
        id: Date.now().toString(),
        title: newDreamTitle.trim(),
        content: newDreamContent.trim(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large'
      };
      setDreams([...dreams, newDream]);
      setNewDreamTitle('');
      setNewDreamContent('');
      setIsAddModalOpen(false);
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { width: 120, height: 80, fontSize: '0.75rem' };
      case 'large':
        return { width: 200, height: 120, fontSize: '0.9rem' };
      default:
        return { width: 160, height: 100, fontSize: '0.8rem' };
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 30% 20%, rgba(25, 25, 112, 0.8) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(75, 0, 130, 0.6) 0%, transparent 50%),
        linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)
      `,
      position: 'relative',
      overflow: 'hidden',
      py: 4
    }}>
      {/* 月亮 */}
      <Box sx={{
        position: 'fixed',
        top: '10%',
        right: '10%',
        width: { xs: '60px', md: '80px' },
        height: { xs: '60px', md: '80px' },
        borderRadius: '50%',
        background: `
          radial-gradient(circle at 30% 30%, #f5f5dc 0%, #e6e6fa 70%, #d8bfd8 100%)
        `,
        boxShadow: `
          0 0 20px rgba(245, 245, 220, 0.6),
          0 0 40px rgba(245, 245, 220, 0.3),
          inset -10px -10px 0px rgba(200, 200, 200, 0.2)
        `,
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'moonGlow 4s ease-in-out infinite alternate',
        '@keyframes moonGlow': {
          '0%': { 
            boxShadow: `
              0 0 20px rgba(245, 245, 220, 0.6),
              0 0 40px rgba(245, 245, 220, 0.3),
              inset -10px -10px 0px rgba(200, 200, 200, 0.2)
            `
          },
          '100%': { 
            boxShadow: `
              0 0 30px rgba(245, 245, 220, 0.8),
              0 0 60px rgba(245, 245, 220, 0.4),
              inset -10px -10px 0px rgba(200, 200, 200, 0.3)
            `
          }
        }
      }} />

      {/* 星星 */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {isClient && [...Array(30)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${(i * 13 + 7) % 95}%`,
              top: `${(i * 7 + 5) % 90}%`,
              width: '3px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              animation: `starTwinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i % 4) * 0.5}s`,
              '@keyframes starTwinkle': {
                '0%, 100%': { 
                  opacity: 0.3,
                  transform: 'scale(1)'
                },
                '50%': { 
                  opacity: 1,
                  transform: 'scale(1.5)'
                }
              }
            }}
          />
        ))}
      </Box>

      {/* 梦境云朵 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2
      }}>
        {isClient && dreams.map((dream, index) => {
          const sizeStyles = getSizeStyles(dream.size);
          return (
            <Box
              key={dream.id}
              onClick={() => handleDreamClick(dream)}
              sx={{
                position: 'absolute',
                left: { xs: '50%', md: `${dream.x}%` },
                top: { xs: `${20 + index * 15}%`, md: `${dream.y}%` },
                transform: { xs: 'translateX(-50%)', md: 'none' },
                width: sizeStyles.width,
                height: sizeStyles.height,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                transition: 'all 0.3s ease',
                animation: `cloudFloat${index % 3} ${8 + index % 3}s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`,
                // 云朵整体容器
                background: 'transparent',
                borderRadius: '0',
                border: 'none',
                boxShadow: 'none',
                backdropFilter: 'none',
                // 主云朵体 - 中央最大的圆
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '20%',
                  top: '25%',
                  width: '60%',
                  height: '50%',
                  background: `
                    radial-gradient(ellipse at center, 
                      rgba(255, 255, 255, 0.18) 0%, 
                      rgba(255, 255, 255, 0.12) 60%, 
                      rgba(255, 255, 255, 0.04) 100%)
                  `,
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 0 20px rgba(255, 255, 255, 0.15),
                    inset 0 0 15px rgba(255, 255, 255, 0.08)
                  `
                },
                // 左侧大泡泡
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: '5%',
                  top: '35%',
                  width: '45%',
                  height: '40%',
                  background: `
                    radial-gradient(ellipse at center, 
                      rgba(255, 255, 255, 0.16) 0%, 
                      rgba(255, 255, 255, 0.10) 60%, 
                      rgba(255, 255, 255, 0.03) 100%)
                  `,
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 15px rgba(255, 255, 255, 0.12),
                    inset 0 0 10px rgba(255, 255, 255, 0.06)
                  `
                },
                '&:hover': {
                  transform: { xs: 'translateX(-50%) scale(1.05)', md: 'scale(1.05)' },
                  '&::before': {
                    background: `
                      radial-gradient(ellipse at center, 
                        rgba(255, 255, 255, 0.25) 0%, 
                        rgba(255, 255, 255, 0.18) 60%, 
                        rgba(255, 255, 255, 0.08) 100%)
                    `,
                    boxShadow: `
                      0 0 25px rgba(255, 255, 255, 0.2),
                      inset 0 0 20px rgba(255, 255, 255, 0.12)
                    `
                  },
                  '&::after': {
                    background: `
                      radial-gradient(ellipse at center, 
                        rgba(255, 255, 255, 0.22) 0%, 
                        rgba(255, 255, 255, 0.15) 60%, 
                        rgba(255, 255, 255, 0.06) 100%)
                    `,
                    boxShadow: `
                      0 0 20px rgba(255, 255, 255, 0.18),
                      inset 0 0 15px rgba(255, 255, 255, 0.10)
                    `
                  }
                },
                '@keyframes cloudFloat0': {
                  '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
                  '33%': { transform: 'translateX(20px) translateY(-10px)' },
                  '66%': { transform: 'translateX(-15px) translateY(5px)' }
                },
                '@keyframes cloudFloat1': {
                  '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
                  '50%': { transform: 'translateX(-20px) translateY(-15px)' }
                },
                '@keyframes cloudFloat2': {
                  '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
                  '25%': { transform: 'translateX(15px) translateY(10px)' },
                  '75%': { transform: 'translateX(-10px) translateY(-5px)' }
                }
              }}
            >
              {/* 右侧中等泡泡 */}
              <Box sx={{
                position: 'absolute',
                right: '8%',
                top: '20%',
                width: '35%',
                height: '35%',
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, 0.14) 0%, 
                    rgba(255, 255, 255, 0.08) 60%, 
                    rgba(255, 255, 255, 0.02) 100%)
                `,
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(8px)',
                boxShadow: `
                  0 0 12px rgba(255, 255, 255, 0.10),
                  inset 0 0 8px rgba(255, 255, 255, 0.05)
                `
              }} />
              
              {/* 顶部小泡泡 */}
              <Box sx={{
                position: 'absolute',
                left: '35%',
                top: '5%',
                width: '25%',
                height: '25%',
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, 0.12) 0%, 
                    rgba(255, 255, 255, 0.06) 60%, 
                    rgba(255, 255, 255, 0.01) 100%)
                `,
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                backdropFilter: 'blur(6px)',
                boxShadow: `
                  0 0 8px rgba(255, 255, 255, 0.08),
                  inset 0 0 6px rgba(255, 255, 255, 0.04)
                `
              }} />

              {/* 右上角小泡泡 */}
              <Box sx={{
                position: 'absolute',
                right: '15%',
                top: '8%',
                width: '20%',
                height: '20%',
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, 0.10) 0%, 
                    rgba(255, 255, 255, 0.05) 60%, 
                    rgba(255, 255, 255, 0.01) 100%)
                `,
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(5px)',
                boxShadow: `
                  0 0 6px rgba(255, 255, 255, 0.06),
                  inset 0 0 4px rgba(255, 255, 255, 0.03)
                `
              }} />

              {/* 底部装饰泡泡 */}
              <Box sx={{
                position: 'absolute',
                left: '50%',
                bottom: '8%',
                width: '18%',
                height: '18%',
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    rgba(255, 255, 255, 0.04) 60%, 
                    rgba(255, 255, 255, 0.01) 100%)
                `,
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(4px)',
                boxShadow: `
                  0 0 5px rgba(255, 255, 255, 0.05),
                  inset 0 0 3px rgba(255, 255, 255, 0.02)
                `
              }} />

              <Typography sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: sizeStyles.fontSize,
                fontWeight: 300,
                textAlign: 'center',
                lineHeight: 1.4,
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                fontFamily: '"Inter", sans-serif',
                position: 'relative',
                zIndex: 2
              }}>
                {dream.title}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, pt: 6 }}>
        {/* 页面标题 */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 300,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.15em',
            mb: 2,
            fontFamily: '"Inter", "Helvetica", sans-serif',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        >
          My Dreams
        </Typography>

        {/* 副标题 */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 300,
            mb: 4,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
          }}
        >
          Click on the floating clouds to explore my dreams ✨
        </Typography>
      </Container>

      {/* Add Dream 按钮 */}
      <Fab
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          color: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)',
          zIndex: 10,
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)',
            boxShadow: '0 12px 40px rgba(255, 255, 255, 0.2)'
          }
        }}
      >
        <Add />
      </Fab>

      {/* 梦境详情弹窗 */}
      <Modal
        open={!!selectedDream}
        onClose={() => setSelectedDream(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          maxWidth: 600,
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
          p: 4
        }}>
          <IconButton
            onClick={() => setSelectedDream(null)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            <Close />
          </IconButton>
          
          {selectedDream && (
            <>
              <Typography variant="h4" sx={{
                color: '#2c2c2c',
                fontWeight: 500,
                mb: 3,
                textAlign: 'center',
                pr: 4
              }}>
                {selectedDream.title}
              </Typography>
              
              <Typography variant="body1" sx={{
                color: '#4a4a4a',
                lineHeight: 1.8,
                fontSize: '1.1rem',
                textAlign: 'justify'
              }}>
                {selectedDream.content}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* 添加梦境弹窗 */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          maxWidth: 600,
          width: '90%',
          position: 'relative',
          p: 4
        }}>
          <IconButton
            onClick={() => setIsAddModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            <Close />
          </IconButton>
          
          <Typography variant="h4" sx={{
            color: '#2c2c2c',
            fontWeight: 500,
            mb: 3,
            textAlign: 'center',
            pr: 4
          }}>
            Add New Dream
          </Typography>
          
          <TextField
            fullWidth
            label="Dream Title"
            value={newDreamTitle}
            onChange={(e) => setNewDreamTitle(e.target.value)}
            sx={{ mb: 3 }}
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Dream Content"
            value={newDreamContent}
            onChange={(e) => setNewDreamContent(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 3 }}
            variant="outlined"
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant="outlined"
              sx={{ color: '#666' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDream}
              variant="contained"
              disabled={!newDreamTitle.trim() || !newDreamContent.trim()}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                }
              }}
            >
              Add Dream
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
