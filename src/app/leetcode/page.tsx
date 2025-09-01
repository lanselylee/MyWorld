'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Code, TrendingUp, Star } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function LeetCodePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 30% 70%, rgba(15, 15, 35, 0.8) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(25, 25, 45, 0.6) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
      `,
      position: 'relative',
      overflow: 'hidden',
      py: 8,
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
            rgba(0, 255, 255, 0.05) 2px,
            rgba(0, 255, 255, 0.05) 4px
          )
        `,
        opacity: 0.4,
        zIndex: 0
      }
    }}>
      {/* 🔢 流动的代码背景 */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              rgba(100, 149, 237, 0.03) 1px,
              rgba(100, 149, 237, 0.03) 2px,
              transparent 3px,
              transparent 50px
            )
          `,
          animation: 'codeFlow 20s linear infinite',
          '@keyframes codeFlow': {
            '0%': { transform: 'translateX(-50%)' },
            '100%': { transform: 'translateX(0%)' }
          }
        }
      }}>
        {/* 流动的代码文字背景 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Box
            key={`bg-code-${i}`}
            sx={{
              position: 'absolute',
              left: `${(i * 15) % 120}%`,
              top: `${(i * 8) % 100}%`,
              fontSize: '12px',
              fontFamily: 'Monaco, Menlo, monospace',
              color: 'rgba(0, 255, 255, 0.15)',
              whiteSpace: 'nowrap',
              animation: `bgCodeDrift ${15 + (i % 3) * 5}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              transform: 'rotate(-15deg)',
              '@keyframes bgCodeDrift': {
                '0%': {
                  transform: 'translateX(-100px) translateY(-20px) rotate(-15deg)',
                  opacity: 0
                },
                '10%': {
                  opacity: 1
                },
                '90%': {
                  opacity: 1
                },
                '100%': {
                  transform: 'translateX(calc(100vw + 100px)) translateY(20px) rotate(-15deg)',
                  opacity: 0
                }
              }
            }}
          >
            {['const solve = (nums) =>', 'for (let i = 0; i < n; i++)', 'if (left < right)', 'return dp[n][target]', 'while (queue.length)', 'node.left = new TreeNode', 'map.set(key, value)', 'result.push(temp.slice())'][i % 8]}
          </Box>
        ))}
      </Box>

      {/* 💻 下落的代码行效果 */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {/* 代码行 */}
        {isClient && Array.from({ length: 10 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${(i * 9.5 + 5) % 95}%`,
              top: '-50px',
              fontSize: { xs: '10px', md: '12px' },
              fontFamily: 'Monaco, Menlo, Consolas, monospace',
              color: `rgba(0, 255, 255, ${0.7 + (i % 3) * 0.1})`,
              whiteSpace: 'nowrap',
              fontWeight: 500,
              animationName: 'codeDrop',
              animationDuration: `${3 + (i % 4)}s`,
              animationIterationCount: 'infinite',
              animationDelay: `${(i % 5)}s`,
              animationTimingFunction: 'linear',
              opacity: 0,
              '@keyframes codeDrop': {
                '0%': {
                  transform: 'translateY(-50px)',
                  opacity: 0
                },
                '10%': {
                  opacity: 0.8
                },
                '90%': {
                  opacity: 0.8
                },
                '100%': {
                  transform: 'translateY(100vh)',
                  opacity: 0
                }
              }
            }}
          >
            {[
              'function binarySearch(arr, target)',
              'let left = 0, right = arr.length - 1;',
              'while (left <= right) {',
              '  const mid = Math.floor((left + right) / 2);',
              '  if (arr[mid] === target) return mid;',
              '  else if (arr[mid] < target) left = mid + 1;',
              '  else right = mid - 1;',
              '}',
              'return -1;',
              'const result = quickSort(array);',
              'dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-w] + v);',
              'graph[u].push(v);',
              'visited[node] = true;',
              'queue.push([x, y, dist + 1]);',
              'if (memo.has(key)) return memo.get(key);'
            ][i % 15]}
          </Box>
        ))}
        
        {/* 数字矩阵雨效果 */}
        {isClient && Array.from({ length: 15 }).map((_, i) => (
          <Box
            key={`matrix-${i}`}
            sx={{
              position: 'absolute',
              left: `${(i * 6.67) % 100}%`,
              top: '-30px',
              fontSize: '14px',
              fontFamily: 'Monaco, Menlo, monospace',
              color: `rgba(0, 255, 0, ${0.3 + (i % 4) * 0.1})`,
              fontWeight: 600,
              animationName: 'matrixRain',
              animationDuration: `${2 + (i % 3)}s`,
              animationIterationCount: 'infinite',
              animationDelay: `${(i % 3)}s`,
              animationTimingFunction: 'linear',
              opacity: 0,
              '@keyframes matrixRain': {
                '0%': {
                  transform: 'translateY(-30px)',
                  opacity: 0
                },
                '15%': {
                  opacity: 1
                },
                '85%': {
                  opacity: 1
                },
                '100%': {
                  transform: 'translateY(100vh)',
                  opacity: 0
                }
              }
            }}
          >
            {i % 2 === 0 ? 
              String(i % 2) : 
              ['0', '1', '{', '}', '[', ']', '(', ')', ';', '='][i % 10]
            }
          </Box>
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* 页面标题 */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 300,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: '#00ffff',
            letterSpacing: '0.15em',
            mb: 2,
            fontFamily: '"Inter", "Helvetica", sans-serif',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
          }}
        >
          LeetCode Journey
        </Typography>

        {/* 副标题 */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#a0a0a0',
            fontWeight: 300,
            mb: 8,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textShadow: '0 0 5px rgba(160, 160, 160, 0.3)'
          }}
        >
          My coding adventure and problem-solving journey 💻
        </Typography>

        {/* 统计卡片 */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid xs={12} md={4}>
            <Card sx={{
              height: '200px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0f3460 0%, #0e4b99 100%)',
              color: '#00ffff',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 40px rgba(0, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(0, 255, 255, 0.4)'
              }
            }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <Code sx={{ fontSize: '3rem', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  150+
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  Problems Solved
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card sx={{
              height: '200px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #4a0e4e 0%, #81126d 100%)',
              color: '#ff6ec7',
              border: '1px solid rgba(255, 110, 199, 0.2)',
              boxShadow: '0 8px 32px rgba(255, 110, 199, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 40px rgba(255, 110, 199, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 110, 199, 0.4)'
              }
            }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <TrendingUp sx={{ fontSize: '3rem', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Medium
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  Current Level
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card sx={{
              height: '200px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0f4c75 0%, #00a8cc 100%)',
              color: '#00e6ff',
              border: '1px solid rgba(0, 230, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 230, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 40px rgba(0, 230, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(0, 230, 255, 0.4)'
              }
            }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <Star sx={{ fontSize: '3rem', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  6 Months
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  Journey Started
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 内容区域 */}
        <Box sx={{
          background: 'rgba(10, 15, 25, 0.85)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: 4,
          boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(15px)'
        }}>
          <Typography variant="h4" sx={{ 
            color: '#00ffff', 
            fontWeight: 500, 
            mb: 3,
            textAlign: 'center',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
          }}>
            My Coding Philosophy
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: '#b0b0b0', 
            lineHeight: 1.8,
            fontSize: '1.1rem',
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}>
            Every problem is a puzzle waiting to be solved. Through LeetCode, I've learned that 
            persistence and practice are the keys to mastering algorithms and data structures. 
            Each solution teaches me something new about efficiency, elegance, and the art of coding.
          </Typography>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ 
              color: '#00e6ff', 
              fontWeight: 500, 
              mb: 2,
              textShadow: '0 0 5px rgba(0, 230, 255, 0.3)'
            }}>
              Current Focus Areas
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: 2 
            }}>
              {['Dynamic Programming', 'Tree Traversal', 'Graph Algorithms', 'Binary Search'].map((topic) => (
                <Box key={topic} sx={{
                  background: 'linear-gradient(135deg, #0f3460 0%, #0e4b99 100%)',
                  color: '#00ffff',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(0, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 255, 255, 0.3)',
                    border: '1px solid rgba(0, 255, 255, 0.5)'
                  }
                }}>
                  {topic}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
