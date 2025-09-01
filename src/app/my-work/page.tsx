'use client';

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 🍃 绿色叶子飘落动画效果 */}
      <Box sx={{
        position: 'fixed',           // 固定定位，覆盖整个屏幕
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',      // 不阻挡鼠标点击
        zIndex: 1                   // 在背景之上，内容之下
      }}>
        {/* 创建大叶子 (15片) */}
        {Array.from({ length: 15 }).map((_, i) => (  // 叶子数量：可改为10(更少)或20(更多)
          <Box
            key={i}
            sx={{
              position: 'absolute',
              right: `${Math.random() * 20}%`,         // 起始位置：从右上角开始 (0-20%的范围)
              top: '-20px',                           // 从屏幕上方开始
              width: '12px',                          // 叶子宽度 (可调整: 8px更小, 16px更大)
              height: '12px',                         // 叶子高度
              backgroundColor: `hsl(${120 + Math.random() * 30}, 60%, ${40 + Math.random() * 20}%)`, // 绿色变化 (120-150色相=绿色系)
              borderRadius: '0 100% 0 100%',          // 叶子形状 (圆角造型)
              animationName: 'leafFall',              // 动画名称
              animationDuration: `${4 + Math.random() * 6}s`, // 飘落时间 (4-10秒) - 可改为2+4(更快)或6+8(更慢)
              animationIterationCount: 'infinite',    // 无限循环
              animationDelay: `${Math.random() * 8}s`, // 随机延迟 (0-8秒) - 可改为更小的数字让叶子更密集
              animationTimingFunction: 'ease-in-out', // 缓动效果
              transform: `rotate(${Math.random() * 360}deg)`, // 初始随机旋转
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '1px',
                height: '8px',
                backgroundColor: 'inherit',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                opacity: 0.7
              },
              '@keyframes leafFall': {
                '0%': {
                  transform: `translateX(0) translateY(-50px) rotate(${Math.random() * 360}deg)`,
                  opacity: 0
                },
                '10%': {
                  opacity: 0.8
                },
                '50%': {
                  transform: `translateX(-${30 + Math.random() * 40}vw) translateY(50vh) rotate(${180 + Math.random() * 360}deg)`,
                  opacity: 0.6
                },
                '100%': {
                  transform: `translateX(-${60 + Math.random() * 40}vw) translateY(110vh) rotate(${360 + Math.random() * 360}deg)`,
                  opacity: 0
                }
              }
            }}
          />
        ))}
        
        {/* Additional smaller leaves for variety */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Box
            key={`small-${i}`}
            sx={{
              position: 'absolute',
              right: `${Math.random() * 15}%`,
              top: '-10px',
              width: '8px',
              height: '8px',
              backgroundColor: `hsl(${110 + Math.random() * 40}, 70%, ${30 + Math.random() * 25}%)`,
              borderRadius: '0 100% 0 100%',
              animationName: 'smallLeafFall',
              animationDuration: `${6 + Math.random() * 8}s`,
              animationIterationCount: 'infinite',
              animationDelay: `${Math.random() * 10}s`,
              animationTimingFunction: 'ease-in-out',
              transform: `rotate(${Math.random() * 360}deg)`,
              '@keyframes smallLeafFall': {
                '0%': {
                  transform: `translateX(0) translateY(-30px) rotate(${Math.random() * 360}deg)`,
                  opacity: 0
                },
                '15%': {
                  opacity: 0.7
                },
                '50%': {
                  transform: `translateX(-${20 + Math.random() * 50}vw) translateY(50vh) rotate(${180 + Math.random() * 360}deg)`,
                  opacity: 0.5
                },
                '100%': {
                  transform: `translateX(-${70 + Math.random() * 30}vw) translateY(110vh) rotate(${360 + Math.random() * 360}deg)`,
                  opacity: 0
                }
              }
            }}
          />
        ))}
      </Box>

      {/* 🎨 主要内容区域 */}
      <Container maxWidth="lg" sx={{    // maxWidth: "sm"更窄, "xl"更宽
        position: 'relative',
        zIndex: 2,                      // 在叶子动画之上
        minHeight: '100vh',             // 最小高度为全屏
        display: 'flex',
        alignItems: 'center',           // 垂直居中
        py: 8                          // 上下内边距 (可调整: 4更小, 12更大)
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',                           // 垂直对齐
          gap: { xs: 4, md: 8 },                         // 图片和文字间距 (手机端4, 桌面端8) - 可调整
          flexDirection: { xs: 'column', md: 'row' },    // 手机端垂直排列, 桌面端水平排列
          width: '100%'
        }}>
          {/* 📸 左侧 - 图片区域 */}
          <Box sx={{
            flex: '0 0 auto',           // 不缩放，保持原始大小
            display: 'flex',
            justifyContent: 'center'    // 图片居中
          }}>
            <Box sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '15px',
                left: '15px',
                right: '15px',
                bottom: '15px',
                background: 'radial-gradient(ellipse 60% 40% at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 40%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                filter: 'blur(20px)',
                transform: 'scale(1.1)'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '25px',
                left: '25px',
                right: '25px',
                bottom: '35px',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 50%, transparent 100%)',
                borderRadius: '40%',
                zIndex: -1,
                filter: 'blur(15px)'
              }
            }}>
              <Image
                src="/cartoon2.PNG"
                alt="Profile illustration"
                width={400}
                height={400}
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

          {/* 右侧 - 文字内容区域 */}
          <Box sx={{
            flex: 1,                                    // 占据剩余空间
            display: 'flex',
            flexDirection: 'column',                    // 垂直排列
            justifyContent: 'center',                   // 垂直居中
            textAlign: { xs: 'center', md: 'left' }    // 手机端居中，桌面端左对齐
          }}>
            {/* 主标题 */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 300,                        // 字体粗细 (100-900, 300=细)
                fontSize: { xs: '2.5rem', md: '3.5rem' }, // 字体大小 (手机端2.5rem, 桌面端3.5rem)
                color: '#2c3e50',                       // 字体颜色 (深蓝灰色)
                letterSpacing: '0.2em',                 // 字母间距 (可调整: 0.05em更紧密, 0.2em更宽松)
                mt: -10,                                 // 上边距 (负数向上移动: -1轻微, -2适中, -4很多)
                mb: 5,                                  // 下边距 (1=8px, 可改为2,3,5,6等调整标题和描述间距)
                fontFamily: '"Inter", "Helvetica", sans-serif', // 字体系列
                lineHeight: 1.1,                       // 行高 (1.0更紧密, 1.2更松散)
                textShadow: '0 2px 4px rgba(255,255,255,0.8)' // 文字阴影 (让文字更清晰)
              }}
            >
              潇 濛 
            </Typography>

            {/* 描述文字 */}
            <Typography
              variant="body1"
              sx={{
                color: '#7f8c8d',                       // 文字颜色 (浅灰色)
                fontWeight: 300,                        // 字体粗细
                fontSize: { xs: '1.1rem', md: '1.2rem' }, // 字体大小 (可调整: 1.0rem更小, 1.3rem更大)
                lineHeight: 1.9,                       // 行间距 (1.5更紧密, 2.0更宽松)
                fontFamily: '"Inter", "Helvetica", sans-serif',
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                maxWidth: '600px'                       // 最大宽度 (可调整: 500px更窄, 700px更宽)
              }}
            >
              I love my name, the meaning that means “delicate drizzle and soft, hazy weather.”
              <br/>
              <br/>
              Despite the softness of my name, I often feel a wind-and-storm strength inside me .
              I love learning and chasing new things—the beauty of knowledge itself. 
              In code, I look for order and balance ; in literature, I seek breadth and compassion ;
              in dreams, I pursue the unreal and the audacious 🌙💭. 
              <br/>
              <br/>This is me, doing what I love—believing the world is an apple I can reach by standing on tiptoe 🍎.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
