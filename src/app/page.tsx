'use client';

import { 
  Box, 
  Container, 
  Typography
} from '@mui/material';

import Image from 'next/image';

export default function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'white',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(0,0,0,0.01) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0,0,0,0.01) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(0,0,0,0.005) 0%, transparent 30%)
      `,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.003) 2px,
            rgba(0,0,0,0.003) 4px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.002) 2px,
            rgba(0,0,0,0.002) 4px
          )
        `,
        pointerEvents: 'none',
        zIndex: 0
      }
    }}>
      {/* 💧 蓝色雨滴动画效果 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {/* 大雨滴 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,     // 随机水平位置覆盖整个屏幕
              top: '-20px',                       // 从屏幕顶部开始
              width: '3px',                       // 雨滴宽度 (可调整: 2px更细, 4px更粗)
              height: '12px',                     // 雨滴高度 (可调整: 8px更短, 16px更长)
              background: `linear-gradient(to bottom, 
                hsl(0, 0%, ${25 + Math.random() * 15}%),
                hsl(0, 0%, ${15 + Math.random() * 10}%)
              )`,                                 // 黑灰色渐变 - 适应白色背景
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // 雨滴形状
              animationName: 'rainDrop',
              animationDuration: `${1.5 + Math.random() * 2}s`, // 落下速度 (1.5-3.5秒) - 可改为更快或更慢
              animationIterationCount: 'infinite',  // 无限循环
              animationDelay: `${Math.random() * 3}s`, // 随机延迟 (0-3秒)
              animationTimingFunction: 'linear',    // 匀速下落
              opacity: 0.7,                        // 透明度 (可调整: 0.5更透明, 0.9更不透明)
              '@keyframes rainDrop': {
                '0%': {
                  transform: 'translateY(-20px)',   // 起始位置
                  opacity: 0                       // 淡入
                },
                '10%': {
                  opacity: 0.7                     // 显现
                },
                '90%': {
                  opacity: 0.7                     // 保持可见
                },
                '100%': {
                  transform: 'translateY(100vh)',   // 落到屏幕底部
                  opacity: 0                       // 淡出
                }
              }
            }}
          />
        ))}
        
        {/* 小雨滴 - 增加层次感 */}
        {Array.from({ length: 18 }).map((_, i) => (
          <Box
            key={`small-${i}`}
            sx={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-10px',
              width: '2px',                       // 更小的雨滴
              height: '8px',
              background: `linear-gradient(to bottom, 
                hsl(0, 0%, ${35 + Math.random() * 10}%),
                hsl(0, 0%, ${25 + Math.random() * 10}%)
              )`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              animationName: 'smallRainDrop',
              animationDuration: `${2 + Math.random() * 3}s`, // 稍慢一些
              animationIterationCount: 'infinite',
              animationDelay: `${Math.random() * 4}s`,
              animationTimingFunction: 'linear',
              opacity: 0.5,                       // 更透明
              '@keyframes smallRainDrop': {
                '0%': {
                  transform: 'translateY(-10px)',
                  opacity: 0
                },
                '15%': {
                  opacity: 0.5
                },
                '85%': {
                  opacity: 0.5
                },
                '100%': {
                  transform: 'translateY(100vh)',
                  opacity: 0
                }
              }
            }}
          />
        ))}
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ 
        position: 'relative', 
        zIndex: 2,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Large Illustration with Text Overlay */}
        <Box sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        
        
        }}>
          {/* Text Overlay - positioned above the cat */}
          <Box sx={{
            position: 'absolute',
            top: '15%',  // 从20%改为15%，向上移动
            left: '4%',
            zIndex: 10,
            textAlign: 'left'
          }}>
            {/* Main Title */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 300,
                fontSize: { xs: '2rem', md: '2.8rem' },  // 缩小字体：从2.5rem/3.5rem改为2rem/2.8rem
                color: '#2c3e50',
                letterSpacing: '0.2em',
                mb:3,
                fontFamily: '"Inter", "Helvetica", sans-serif',
                lineHeight: 1.1,
                textShadow: '0 2px 4px rgba(255,255,255,0.8)',
                textAlign: 'center'  // 让标题也居中对齐
              }}
            >
              XIAOMENG
            </Typography>
            
            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                color: '#7f8c8d',
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.1rem' },
                maxWidth: '500px',  // 增加最大宽度，让文字更长
                letterSpacing: '0.1em',
                lineHeight: 1.6,
                fontFamily: '"Inter", "Helvetica", sans-serif',
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                textAlign: 'center'  // 居中对齐
              }}
            >
              Welcome to Xiaomeng's World ✨<br/>
              <br/>

              Where you can find my journey <br/>
              as a Northeastern student
              — exploring code, sharing thoughts, and writing stories.
            </Typography>
          </Box>

          {/* Large Image */}
          <Box sx={{
            position: 'relative',
            transform: 'translate(18px, 60px)', // 向右2个单位(16px)，向下4个单位(32px)
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              background: 'radial-gradient(ellipse 60% 40% at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 40%, transparent 70%)',
              borderRadius: '50%',
              zIndex: -1,
              filter: 'blur(25px)',
              transform: 'scale(1.2)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '30px',
              left: '30px',
              right: '30px',
              bottom: '40px',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 50%, transparent 100%)',
              borderRadius: '40%',
              zIndex: -1,
              filter: 'blur(20px)'
            }
          }}>
          <Image
              src="/cartoon1.PNG"
              alt="Main illustration"
              width={1100}
              height={825}
              style={{
                objectFit: 'contain',
                filter: 'contrast(1.02) saturate(1.05) brightness(0.98)',
                transition: 'all 0.3s ease',
                mixBlendMode: 'multiply',
                opacity: 0.95
              }}
            priority
          />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}