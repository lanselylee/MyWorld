'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Rating,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Code,
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Login,
  Add,
  MoreVert,
  Delete,
  Edit,
  OpenInNew,
  Timeline,
  Psychology
} from '@mui/icons-material';
import { useLeetCodeData } from '@/hooks/useLeetCodeData';
import LeetCodeLogin from './LeetCodeLogin';
import LeetCodeUpload from './LeetCodeUpload';

const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  switch (difficulty) {
    case 'Easy': return '#4caf50';
    case 'Medium': return '#ff9800';
    case 'Hard': return '#f44336';
    default: return '#757575';
  }
};

export default function LeetCodeCard() {
  const {
    problems,
    auth,
    currentProblem,
    currentProblemIndex,
    isRotating,
    stats,
    login,
    logout,
    addProblem,
    deleteProblem,
    nextProblem,
    prevProblem,
    toggleRotation
  } = useLeetCodeData();

  const [loginOpen, setLoginOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    if (currentProblem && window.confirm(`comfirm delete "${currentProblem.title}" ?`)) {
      deleteProblem(currentProblem.id);
    }
    handleMenuClose();
  };

  const handleOpenLeetCode = () => {
    if (currentProblem?.leetcodeUrl) {
      window.open(currentProblem.leetcodeUrl, '_blank');
    }
    handleMenuClose();
  };

  // 如果没有题目，显示添加提示
  if (problems.length === 0) {
    return (
      <>
        <Card sx={{
          height: '400px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
          }
        }}
        onClick={() => setUploadOpen(true)}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Add sx={{ fontSize: '4rem', mb: 2, opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Start your LeetCode journey
            </Typography>
            <Typography sx={{ opacity: 0.9, mb: 3 }}>
              Add your first LeetCode problem
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                borderRadius: '8px'
              }}
            >
              Add problem
            </Button>
          </CardContent>
        </Card>

        <LeetCodeUpload
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          onAdd={addProblem}
        />
      </>
    );
  }

  // 正常显示题目
  return (
    <>
      <Card sx={{
        height: '400px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.2)',
        background: `
          linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%),
          url('/cartoon3.jpeg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
        },
        // 添加遮罩层
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%)', // 进一步降低透明度让背景更明显
          zIndex: 1
        },
        // 添加纹理遮罩
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.02) 50%, transparent 51%)
          `,
          backgroundSize: '30px 30px, 40px 40px, 20px 20px',
          zIndex: 2
        }
      }}>
        {/* 顶部控制栏 */}
        <Box sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 1,
          zIndex: 10
        }}>
          <Tooltip title={isRotating ? 'Pause rotation' : 'Start rotation'}>
            <IconButton
              onClick={toggleRotation}
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                bgcolor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.4)',
                  borderColor: 'rgba(255,255,255,0.3)'
                }
              }}
              size="small"
            >
              {isRotating ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>

          {/* Add 按钮 - 点击时登录或直接添加 */}
          <Tooltip title="Add new problem">
            <IconButton
              onClick={() => {
                if (auth.isLoggedIn) {
                  setUploadOpen(true);
                } else {
                  setLoginOpen(true);
                }
              }}
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                bgcolor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.4)',
                  borderColor: 'rgba(255,255,255,0.3)'
                }
              }}
              size="small"
            >
              <Add />
            </IconButton>
          </Tooltip>

          {/* 只有登录后才显示更多菜单 */}
          {auth.isLoggedIn && (
            <IconButton
              onClick={handleMenuOpen}
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                bgcolor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.4)',
                  borderColor: 'rgba(255,255,255,0.3)'
                }
              }}
              size="small"
            >
              <MoreVert />
            </IconButton>
          )}
        </Box>

        <CardContent sx={{ 
          p: 4, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          zIndex: 3  // 确保内容在遮罩层之上
        }}>
          {/* 标题和难度 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Code sx={{ fontSize: '1.5rem', mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {currentProblem?.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip 
                  label={currentProblem?.difficulty} 
                  size="small" 
                  sx={{ 
                    bgcolor: getDifficultyColor(currentProblem?.difficulty || 'Medium'),
                    color: 'white',
                    fontWeight: 500
                  }} 
                />
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {currentProblemIndex + 1} / {problems.length}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 标签 */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {currentProblem?.tags.slice(0, 4).map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontSize: '0.7rem'
                  }}
                />
              ))}
              {(currentProblem?.tags.length || 0) > 4 && (
                <Chip
                  label={`+${(currentProblem?.tags.length || 0) - 4}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.7rem' }}
                />
              )}
            </Box>
          </Box>

          {/* 内容 */}
          <Fade in={true} key={currentProblem?.id} timeout={300}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ 
                fontSize: '0.9rem', 
                lineHeight: 1.6, 
                opacity: 0.9,
                mb: 2
              }}>
                <strong>⚡ Method:</strong> {currentProblem?.approach}<br/>
                <strong>💡 Insight:</strong> {currentProblem?.keyInsight}<br/>
                <strong>⏰ Complexity:</strong> Time: {currentProblem?.timeComplexity}, Space: {currentProblem?.spaceComplexity}
              </Typography>
              
              {currentProblem?.notes && (
                <Typography sx={{ 
                  fontSize: '0.85rem', 
                  fontStyle: 'italic',
                  opacity: 0.8,
                  mb: 2
                }}>
                  📝 {currentProblem.notes}
                </Typography>
              )}
            </Box>
          </Fade>

          {/* 底部控制和评分 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Previous problem">
                <IconButton 
                  onClick={prevProblem}
                  disabled={problems.length <= 1}
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    bgcolor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.3)' },
                    '&:disabled': { 
                      color: 'rgba(255,255,255,0.6)',
                      bgcolor: 'rgba(0,0,0,0.6)'
                    }
                  }}
                  size="small"
                >
                  <SkipPrevious />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next problem">
                <IconButton 
                  onClick={nextProblem}
                  disabled={problems.length <= 1}
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.3)' },
                    '&:disabled': { 
                      color: 'rgba(255,255,255,0.3)',
                      bgcolor: 'rgba(0,0,0,0.1)'
                    }
                  }}
                  size="small"
                >
                  <SkipNext />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating
                value={currentProblem?.rating || 3}
                readOnly
                size="small"
                sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }}
              />
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {new Date(currentProblem?.solveDate || Date.now()).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          {/* 底部统计 */}
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {auth.isLoggedIn ? (
                <>🎯 Total: {stats.totalSolved} | 🔥 Streak: {stats.currentStreak} days | 
                📊 E:{stats.easySolved} M:{stats.mediumSolved} H:{stats.hardSolved}</>
              ) : (
                <>📚 Displaying: {stats.totalSolved} problems | 💡 Click + to add your problem</>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* 菜单 */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: '8px', minWidth: '180px' }
        }}
      >
        <MenuItem onClick={() => setUploadOpen(true)}>
          <ListItemIcon><Add /></ListItemIcon>
          <ListItemText>Add new problem</ListItemText>
        </MenuItem>
        
        {currentProblem?.solutionCode && (
          <MenuItem onClick={() => setCodeDialogOpen(true)}>
            <ListItemIcon><Code /></ListItemIcon>
            <ListItemText>View code</ListItemText>
          </MenuItem>
        )}
        
        {currentProblem?.leetcodeUrl && (
          <MenuItem onClick={handleOpenLeetCode}>
            <ListItemIcon><OpenInNew /></ListItemIcon>
            <ListItemText>Open in LeetCode</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText>Delete problem</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={logout} sx={{ borderTop: '1px solid #f0f0f0' }}>
          <ListItemIcon><Login /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* 代码查看对话框 */}
      <Dialog
        open={codeDialogOpen}
        onClose={() => setCodeDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentProblem?.title} - Solution code
        </DialogTitle>
        <DialogContent>
          <Box sx={{
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {currentProblem?.solutionCode || 'No code'}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCodeDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <LeetCodeLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(username) => {
          login(username);
          setLoginOpen(false);
          setUploadOpen(true); // 登录成功后自动打开上传对话框
        }}
      />

      <LeetCodeUpload
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onAdd={addProblem}
      />
    </>
  );
}
