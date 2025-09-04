'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { MenuBook, Create, AutoStories } from '@mui/icons-material';

export default function StoriesPage() {
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (cardId: string) => {
    setHoveredCard(prev => (prev === cardId ? null : cardId));
  };

  const handleBackdropClick = () => {
    setHoveredCard(null);
  };

  return (
    <>
      {/* 透明全屏遮罩：仅用于点击回退，不变暗 */}
      {hoveredCard && (
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 900,            // 低于放大的卡片(1000)
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        />
      )}

      <Box
        sx={{
          minHeight: '100vh',
          background: `
            linear-gradient(135deg, 
              #e8f5e8 0%, 
              #f0f8ff 25%, 
              #fff8dc 50%, 
              #ffefd5 75%, 
              #ffe4e1 100%
            )
          `,
          position: 'relative',
          overflow: 'hidden',
          py: 4,
          perspective: '1000px'
        }}
      >
        {/* 漂浮的几何形状 */}
        {isClient && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={`triangle-${i}`}
                sx={{
                  position: 'absolute',
                  left: `${(i * 15 + 10) % 80}%`,
                  top: `${(i * 20 + 15) % 70}%`,
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderBottom: `${16 + (i % 3) * 4}px solid rgba(255, 182, 193, ${0.3 + (i % 3) * 0.1})`,
                  animation: `floatTriangle${i % 3} ${8 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                  filter: 'blur(0.5px)',
                  '@keyframes floatTriangle0': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.6 },
                    '50%': { transform: 'translateY(-20px) rotate(10deg)', opacity: 0.9 }
                  },
                  '@keyframes floatTriangle1': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.5 },
                    '50%': { transform: 'translateY(-15px) rotate(-8deg)', opacity: 0.8 }
                  },
                  '@keyframes floatTriangle2': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.7 },
                    '50%': { transform: 'translateY(-25px) rotate(12deg)', opacity: 1 }
                  }
                }}
              />
            ))}

            {Array.from({ length: 4 }).map((_, i) => (
              <Box
                key={`cube-${i}`}
                sx={{
                  position: 'absolute',
                  left: `${(i * 25 + 20) % 75}%`,
                  top: `${(i * 25 + 30) % 60}%`,
                  width: `${12 + (i % 2) * 4}px`,
                  height: `${12 + (i % 2) * 4}px`,
                  background: `linear-gradient(45deg, 
                    rgba(135, 206, 250, ${0.4 + (i % 3) * 0.1}), 
                    rgba(173, 216, 230, ${0.3 + (i % 3) * 0.1})
                  )`,
                  borderRadius: '2px',
                  animation: `floatCube ${10 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 1.2}s`,
                  transform: 'rotateX(45deg) rotateY(45deg)',
                  '@keyframes floatCube': {
                    '0%, 100%': { transform: 'rotateX(45deg) rotateY(45deg) translateZ(0px)', opacity: 0.5 },
                    '50%': { transform: 'rotateX(55deg) rotateY(55deg) translateZ(10px)', opacity: 0.8 }
                  }
                }}
              />
            ))}
          </Box>
        )}

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          {/* 标题 */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              textAlign: 'center',
              fontWeight: 300,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#2c2c2c',
              letterSpacing: '0.15em',
              mb: 2,
              fontFamily: '"Inter", "Helvetica", sans-serif',
              textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
              animation: 'titleGlow 3s ease-in-out infinite alternate',
              '@keyframes titleGlow': {
                '0%': { textShadow: '2px 2px 4px rgba(255,255,255,0.8)' },
                '100%': { textShadow: '2px 2px 8px rgba(255,182,193,0.6)' }
              }
            }}
          >
            My Stories
          </Typography>

          {/* 副标题 */}
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#6c6c6c',
              fontWeight: 300,
              mb: 6,
              fontSize: { xs: '1rem', md: '1.1rem' },
              textShadow: '1px 1px 2px rgba(255,255,255,0.6)'
            }}
          >
            Join Me On A Literary Journey ✨
          </Typography>

          {/* 布局 */}
          <Box
            sx={{
              position: 'relative',
              minHeight: '800px',
              perspective: '1200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Card 1 */}
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick('life');
              }}
              sx={{
                position: hoveredCard === 'life' ? 'fixed' : { xs: 'relative', md: 'absolute' },
                left: hoveredCard === 'life' ? '50%' : { xs: 0, md: '10%' },
                top: hoveredCard === 'life' ? '50%' : { xs: 0, md: '50px' },
                width: hoveredCard === 'life' ? '500px' : { xs: '100%', md: '320px' },
                height: hoveredCard === 'life' ? '380px' : '240px',
                mb: { xs: 4, md: 0 },
                transform:
                  hoveredCard === 'life'
                    ? 'translate(-50%, -50%) scale(1.2)'
                    : { xs: 'none', md: 'rotateY(-15deg) rotateX(5deg)' },
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                zIndex: hoveredCard === 'life' ? 1000 : 10,
                boxShadow: hoveredCard === 'life' ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(135deg, 
                      #ff9a9e 0%, 
                      #fecfef 50%, 
                      #fecfef 100%
                    )
                  `,
                  borderRadius: '12px',
                  boxShadow: `
                    0 10px 30px rgba(255, 154, 158, 0.3),
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <MenuBook
                    sx={{
                      fontSize: '2.5rem',
                      mb: 1.5,
                      color: 'rgba(255, 255, 255, 0.9)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    Why I Write
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Words are my safe place. In writing I find a wider world, and I can say what speech can’t carry.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Card 2 */}
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick('creative');
              }}
              sx={{
                position: hoveredCard === 'creative' ? 'fixed' : { xs: 'relative', md: 'absolute' },
                left: hoveredCard === 'creative' ? '50%' : { xs: 0, md: '35%' },
                top: hoveredCard === 'creative' ? '50%' : { xs: 0, md: '150px' },
                width: hoveredCard === 'creative' ? '500px' : { xs: '100%', md: '320px' },
                height: hoveredCard === 'creative' ? '380px' : '240px',
                mb: { xs: 4, md: 0 },
                transform:
                  hoveredCard === 'creative'
                    ? 'translate(-50%, -50%) scale(1.2)'
                    : { xs: 'none', md: 'rotateY(0deg) rotateX(8deg)' },
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                zIndex: hoveredCard === 'creative' ? 1000 : 10,
                boxShadow: hoveredCard === 'creative' ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(135deg, 
                      #a8edea 0%, 
                      #fed6e3 50%, 
                      #fed6e3 100%
                    )
                  `,
                  borderRadius: '12px',
                  boxShadow: `
                    0 10px 30px rgba(168, 237, 234, 0.3),
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <Create
                    sx={{
                      fontSize: '2.5rem',
                      mb: 1.5,
                      color: 'rgba(255, 255, 255, 0.9)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    300k-Word Novel Published
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    I serialized and published a 300,000-word novel on a leading platform in China—my first long-form milestone.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Card 3 */}
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick('reflections');
              }}
              sx={{
                position: hoveredCard === 'reflections' ? 'fixed' : { xs: 'relative', md: 'absolute' },
                left: hoveredCard === 'reflections' ? '50%' : { xs: 0, md: '60%' },
                top: hoveredCard === 'reflections' ? '50%' : { xs: 0, md: '80px' },
                width: hoveredCard === 'reflections' ? '500px' : { xs: '100%', md: '320px' },
                height: hoveredCard === 'reflections' ? '380px' : '240px',
                mb: { xs: 4, md: 0 },
                transform:
                  hoveredCard === 'reflections'
                    ? 'translate(-50%, -50%) scale(1.2)'
                    : { xs: 'none', md: 'rotateY(15deg) rotateX(12deg)' },
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                zIndex: hoveredCard === 'reflections' ? 1000 : 10,
                boxShadow: hoveredCard === 'reflections' ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(135deg, 
                      #ffecd2 0%, 
                      #fcb69f 50%, 
                      #fcb69f 100%
                    )
                  `,
                  borderRadius: '12px',
                  boxShadow: `
                    0 10px 30px rgba(255, 236, 210, 0.3),
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <AutoStories
                    sx={{
                      fontSize: '2.5rem',
                      mb: 1.5,
                      color: 'rgba(255, 255, 255, 0.9)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    My Favorite Creative Moment
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Each time I finish a complete story, it feels like I’ve created a whole world—its characters come alive and keep breathing in my mind.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* 底部装饰 */}
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 3
            }}
          >
            {[
              { icon: '🌟', text: '10,000+ Followers', color: '#ff9a9e' },
              { icon: '📖', text: '300,000 Words Published', color: '#a8edea' },
              { icon: '📝', text: 'Dozens of Essays', color: '#ffecd2' },
              { icon: '💡', text: 'Endless Imagination', color: '#c471ed' }
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                  borderRadius: '16px',
                  padding: 2,
                  border: `2px solid ${item.color}60`,
                  backdropFilter: 'blur(10px)',
                  transform: `rotateY(${(index - 1.5) * 5}deg) rotateX(2deg)`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: `rotateY(${(index - 1.5) * 5}deg) rotateX(2deg) translateZ(10px) scale(1.05)`,
                    boxShadow: `0 10px 25px ${item.color}30`
                  }
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: '#2c2c2c',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>{item.icon}</span>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
