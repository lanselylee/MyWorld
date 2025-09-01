// 🎯 LeetCode 题目数据类型定义

export interface LeetCodeProblem {
  id: string;                    // 唯一标识符
  title: string;                 // 题目标题
  difficulty: 'Easy' | 'Medium' | 'Hard'; // 难度等级
  approach: string;              // 解题方法
  keyInsight: string;            // 关键洞察
  solutionCode?: string;         // 解题代码 (可选)
  tags: string[];               // 标签 (如: Array, Two Pointers, etc.)
  timeComplexity: string;       // 时间复杂度
  spaceComplexity: string;      // 空间复杂度
  solveDate: Date;              // 解题日期
  notes?: string;               // 额外笔记
  leetcodeUrl?: string;         // LeetCode 链接
  rating: 1 | 2 | 3 | 4 | 5;    // 个人评分 (1-5星)
}

// 🔐 简单的用户状态
export interface UserAuth {
  isLoggedIn: boolean;
  username?: string;
  loginTime?: Date;
}

// 📊 统计信息
export interface LeetCodeStats {
  totalSolved: number;
  currentStreak: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  favoriteTopics: string[];
}
