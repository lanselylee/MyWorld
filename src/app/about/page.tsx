'use client';

import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path as any);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 30% 70%, rgba(245, 245, 245, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(250, 250, 250, 0.4) 0%, transparent 50%),
        linear-gradient(135deg, #ffffff 0%, #fafafa 100%)
      `, // 白色简约背景 - 与首页和my-work保持一致

      position: 'relative',
      overflow: 'hidden',
      py: 8, // 上下内边距
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.02) 2px,
            rgba(0, 0, 0, 0.02) 4px
          )
        `, // 轻微的纸质纹理
        opacity: 0.3,
        zIndex: 0
      },

    }}>
      {/* Swimming Blue Jellyfish */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {/* Large Jellyfish */}
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${(i * 8 + 15) % 85}%`,
              top: '-30px',
              width: '20px',
              height: '16px',
              background: `radial-gradient(ellipse at 50% 20%, 
                rgba(65, 105, 225, 0.9), 
                rgba(135, 206, 250, 0.7),
                rgba(173, 216, 230, 0.5)
              )`,
              borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
              animation: `jellyFloat ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              '@keyframes jellyFloat': {
                '0%': { 
                  transform: 'translateY(-30px) translateX(0px) scale(1)',
                  opacity: 0
                },
                '10%': { 
                  opacity: 0.9,
                  transform: 'translateY(10vh) translateX(5px) scale(1.1)'
                },
                '30%': { 
                  transform: 'translateY(30vh) translateX(-5px) scale(1)'
                },
                '50%': { 
                  opacity: 1,
                  transform: 'translateY(50vh) translateX(8px) scale(1.05)'
                },
                '70%': { 
                  transform: 'translateY(70vh) translateX(-3px) scale(0.95)'
                },
                '90%': { 
                  opacity: 0.8,
                  transform: 'translateY(90vh) translateX(2px) scale(0.9)'
                },
                '100%': { 
                  transform: 'translateY(100vh) translateX(0px) scale(0.8)',
                  opacity: 0
                }
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '3px',
                height: '12px',
                background: `linear-gradient(to bottom, 
                  rgba(135, 206, 250, 0.8), 
                  rgba(135, 206, 250, 0.3)
                )`,
                borderRadius: '1.5px',
                animation: 'tentacleWave 2s ease-in-out infinite alternate'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '30%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '10px',
                background: `linear-gradient(to bottom, 
                  rgba(135, 206, 250, 0.6), 
                  rgba(135, 206, 250, 0.2)
                )`,
                borderRadius: '1px',
                animation: 'tentacleWave 2.5s ease-in-out infinite alternate-reverse'
              },
              '@keyframes tentacleWave': {
                '0%': { transform: 'translateX(-50%) rotate(-2deg)' },
                '100%': { transform: 'translateX(-50%) rotate(2deg)' }
              }
            }}
          />
        ))}
        
        {/* Small Jellyfish */}
        {[...Array(25)].map((_, i) => (
          <Box
            key={`small-${i}`}
            sx={{
              position: 'absolute',
              left: `${(i * 6 + 8) % 88}%`,
              top: '-15px',
              width: '12px',
              height: '9px',
              background: `radial-gradient(ellipse at 50% 25%, 
                rgba(100, 149, 237, 0.8), 
                rgba(176, 196, 222, 0.6),
                rgba(230, 230, 250, 0.4)
              )`,
              borderRadius: '50% 50% 50% 50% / 75% 75% 25% 25%',
              animation: `smallJellyFloat ${7 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              '@keyframes smallJellyFloat': {
                '0%': { 
                  transform: 'translateY(-15px) translateX(0px) scale(0.8)',
                  opacity: 0
                },
                '15%': { 
                  opacity: 0.7,
                  transform: 'translateY(15vh) translateX(3px) scale(1.1)'
                },
                '35%': { 
                  transform: 'translateY(35vh) translateX(-3px) scale(1)'
                },
                '50%': { 
                  opacity: 0.9,
                  transform: 'translateY(50vh) translateX(5px) scale(1.05)'
                },
                '65%': { 
                  transform: 'translateY(65vh) translateX(-2px) scale(0.95)'
                },
                '85%': { 
                  opacity: 0.6,
                  transform: 'translateY(85vh) translateX(1px) scale(0.9)'
                },
                '100%': { 
                  transform: 'translateY(100vh) translateX(0px) scale(0.7)',
                  opacity: 0
                }
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '6px',
                background: `linear-gradient(to bottom, 
                  rgba(176, 196, 222, 0.7), 
                  rgba(176, 196, 222, 0.2)
                )`,
                borderRadius: '1px',
                animation: 'smallTentacleWave 1.8s ease-in-out infinite alternate'
              },
              '@keyframes smallTentacleWave': {
                '0%': { transform: 'translateX(-50%) rotate(-1deg)' },
                '100%': { transform: 'translateX(-50%) rotate(1deg)' }
              }
            }}
          />
        ))}
      </Box>

      {/* 🎨 主要内容 */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* 页面标题 */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 300,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: '#2c2c2c', // 深色文字适应白色背景
            letterSpacing: '0.15em',
            mb: 2,
            fontFamily: '"Inter", "Helvetica", sans-serif',
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)' // 轻微的白色阴影
          }}
        >
          About Me
        </Typography>

        {/* 副标题 */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#6c6c6c', // 中性灰色适应白色背景
            fontWeight: 300,
            mb: 8,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textShadow: '1px 1px 2px rgba(255,255,255,0.6)'
          }}
        >
          Explore my journey through code, stories, and dreams ✨
        </Typography>

        {/* 🖼️ 三张背景图片水平排列 */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr',           // 手机端：单列
            md: 'repeat(3, 1fr)' // 桌面端：三列
          },
          gap: 3,                // 图片间距
          mt: 6,
          px: 2                  // 左右边距
        }}>
          
          {/* 💻 第一张图片 - LeetCode Journey */}
          <Box 
            onClick={() => handleNavigation('/leetcode')}
            sx={{
              position: 'relative',
              height: { xs: '300px', md: '400px' },
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundImage: 'url(/cartoon3.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
                '& .floating-button': {
                  transform: 'translateY(-5px)',
                  backgroundColor: 'rgba(255,255,255,0.95)'
                }
              }
            }}>
            {/* 悬浮按钮 */}
            <Box 
              className="floating-button"
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                  transform: 'translateX(-50%) translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Typography sx={{
                color: '#2c2c2c',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                letterSpacing: '0.5px'
              }}>
                LeetCode Journey
              </Typography>
            </Box>
          </Box>

          {/* 📚 第二张图片 - My Stories */}
          <Box 
            onClick={() => handleNavigation('/stories')}
            sx={{
              position: 'relative',
              height: { xs: '300px', md: '400px' },
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundImage: 'url(/cartoon4.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
                '& .floating-button': {
                  transform: 'translateY(-5px)',
                  backgroundColor: 'rgba(255,255,255,0.95)'
                }
              }
            }}>
            {/* 悬浮按钮 */}
            <Box 
              className="floating-button"
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                  transform: 'translateX(-50%) translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Typography sx={{
                color: '#2c2c2c',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                letterSpacing: '0.5px'
              }}>
                My Stories
              </Typography>
            </Box>
          </Box>

          {/* 🌙 第三张图片 - My Dreams */}
          <Box 
            onClick={() => handleNavigation('/dreams')}
            sx={{
              position: 'relative',
              height: { xs: '300px', md: '400px' },
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundImage: 'url(/cartoon5.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
                '& .floating-button': {
                  transform: 'translateY(-5px)',
                  backgroundColor: 'rgba(255,255,255,0.95)'
                }
              }
            }}>
            {/* 悬浮按钮 */}
            <Box 
              className="floating-button"
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                padding: '12px 24px',
                borderRadius: '25px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                  transform: 'translateX(-50%) translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Typography sx={{
                color: '#2c2c2c',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                letterSpacing: '0.5px'
              }}>
                My Dreams
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
