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
  MenuItem,
  Chip,
  Rating,
  Alert
} from '@mui/material';
import { Add, Code, Save } from '@mui/icons-material';
import { LeetCodeProblem } from '@/types/leetcode';

interface LeetCodeUploadProps {
  open: boolean;
  onClose: () => void;
  onAdd: (problem: Omit<LeetCodeProblem, 'id'>) => void;
}

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'] as const;
const COMMON_TAGS = [
  'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting',
  'Greedy', 'Tree', 'Binary Search', 'Stack', 'Queue', 'Linked List',
  'Two Pointers', 'Sliding Window', 'Backtracking', 'Graph', 'DFS', 'BFS'
];

export default function LeetCodeUpload({ open, onClose, onAdd }: LeetCodeUploadProps) {
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Medium' as const,
    approach: '',
    keyInsight: '',
    solutionCode: '',
    timeComplexity: '',
    spaceComplexity: '',
    notes: '',
    leetcodeUrl: '',
    rating: 3 as const
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本验证
    if (!formData.title.trim()) {
      setError('请输入题目标题');
      return;
    }
    if (!formData.approach.trim()) {
      setError('请输入解题方法');
      return;
    }
    if (!formData.keyInsight.trim()) {
      setError('请输入关键洞察');
      return;
    }
    if (selectedTags.length === 0) {
      setError('请选择至少一个标签');
      return;
    }

    // 创建新题目对象
    const newProblem: Omit<LeetCodeProblem, 'id'> = {
      title: formData.title.trim(),
      difficulty: formData.difficulty,
      approach: formData.approach.trim(),
      keyInsight: formData.keyInsight.trim(),
      solutionCode: formData.solutionCode.trim() || undefined,
      tags: selectedTags,
      timeComplexity: formData.timeComplexity.trim() || 'O(?)',
      spaceComplexity: formData.spaceComplexity.trim() || 'O(?)',
      solveDate: new Date(),
      notes: formData.notes.trim() || undefined,
      leetcodeUrl: formData.leetcodeUrl.trim() || undefined,
      rating: formData.rating
    };

    onAdd(newProblem);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // 重置表单
    setFormData({
      title: '',
      difficulty: 'Medium',
      approach: '',
      keyInsight: '',
      solutionCode: '',
      timeComplexity: '',
      spaceComplexity: '',
      notes: '',
      leetcodeUrl: '',
      rating: 3
    });
    setSelectedTags([]);
    setCustomTag('');
    setError('');
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags(prev => [...prev, customTag.trim()]);
      setCustomTag('');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Add sx={{ fontSize: '1.5rem' }} />
        <Typography variant="h6" component="span">
          添加新的 LeetCode 题目
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {/* 基本信息 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
              <TextField
                label="题目标题 *"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                fullWidth
                placeholder="例: Two Sum"
              />
              <TextField
                label="难度 *"
                select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                fullWidth
              >
                {DIFFICULTY_OPTIONS.map(diff => (
                  <MenuItem key={diff} value={diff}>{diff}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* 解题信息 */}
            <TextField
              label="解题方法 *"
              value={formData.approach}
              onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
              fullWidth
              placeholder="例: Hash Map, Two Pointers, Dynamic Programming"
            />

            <TextField
              label="关键洞察 *"
              value={formData.keyInsight}
              onChange={(e) => setFormData(prev => ({ ...prev, keyInsight: e.target.value }))}
              fullWidth
              multiline
              rows={2}
              placeholder="例: 使用哈希表存储已遍历的元素，实现O(1)查找"
            />

            {/* 复杂度 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="时间复杂度"
                value={formData.timeComplexity}
                onChange={(e) => setFormData(prev => ({ ...prev, timeComplexity: e.target.value }))}
                placeholder="例: O(n)"
              />
              <TextField
                label="空间复杂度"
                value={formData.spaceComplexity}
                onChange={(e) => setFormData(prev => ({ ...prev, spaceComplexity: e.target.value }))}
                placeholder="例: O(1)"
              />
            </Box>

            {/* 标签选择 */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                标签 * (点击选择)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {COMMON_TAGS.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleTagToggle(tag)}
                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="自定义标签"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  size="small"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                />
                <Button 
                  onClick={handleAddCustomTag}
                  variant="outlined"
                  size="small"
                >
                  添加
                </Button>
              </Box>
              {selectedTags.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">已选择: </Typography>
                  {selectedTags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleTagToggle(tag)}
                      size="small"
                      sx={{ ml: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* 个人评分 */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                个人评分
              </Typography>
              <Rating
                value={formData.rating}
                onChange={(_, newValue) => 
                  setFormData(prev => ({ ...prev, rating: (newValue || 3) as 1|2|3|4|5 }))
                }
                size="large"
              />
            </Box>

            {/* 可选字段 */}
            <TextField
              label="LeetCode链接"
              value={formData.leetcodeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, leetcodeUrl: e.target.value }))}
              fullWidth
              placeholder="https://leetcode.com/problems/..."
            />

            <TextField
              label="解题代码"
              value={formData.solutionCode}
              onChange={(e) => setFormData(prev => ({ ...prev, solutionCode: e.target.value }))}
              fullWidth
              multiline
              rows={4}
              placeholder="可选：粘贴你的解题代码"
            />

            <TextField
              label="额外笔记"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
              multiline
              rows={2}
              placeholder="可选：任何额外的想法或笔记"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
              }
            }}
          >
            保存题目
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
