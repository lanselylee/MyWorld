'use client';

import { useState, useEffect } from 'react';
import { LeetCodeProblem, UserAuth, LeetCodeStats } from '@/types/leetcode';

// 🏠 本地存储的键名
const STORAGE_KEYS = {
  PROBLEMS: 'leetcode_problems',
  AUTH: 'leetcode_auth',
  CURRENT_INDEX: 'leetcode_current_index'
};

// 📝 示例数据 - 初始化用
const SAMPLE_PROBLEMS: LeetCodeProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    approach: 'Hash Map',
    keyInsight: 'Use hash map to store complement',
    tags: ['Array', 'Hash Table'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solveDate: new Date('2024-01-15'),
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    rating: 4,
    notes: 'Classic problem, good for understanding hash maps'
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    approach: 'Stack',
    keyInsight: 'Stack for matching pairs',
    tags: ['String', 'Stack'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solveDate: new Date('2024-01-20'),
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    rating: 5,
    notes: 'Perfect stack use case'
  }
];

export function useLeetCodeData() {
  const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
  const [auth, setAuth] = useState<UserAuth>({ isLoggedIn: false });
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // 🔄 初始化数据
  useEffect(() => {
    const savedProblems = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
    const savedIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);

    if (savedProblems) {
      const parsedProblems = JSON.parse(savedProblems);
      setProblems(parsedProblems);
    } else {
      // 如果没有数据，使用示例数据
      setProblems(SAMPLE_PROBLEMS);
      localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(SAMPLE_PROBLEMS));
    }

    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }

    if (savedIndex) {
      setCurrentProblemIndex(parseInt(savedIndex));
    }
  }, []);

  // 🎠 自动轮播效果
  useEffect(() => {
    if (!isRotating || problems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentProblemIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % problems.length;
        localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, nextIndex.toString());
        return nextIndex;
      });
    }, 4000); // 每4秒切换一次

    return () => clearInterval(interval);
  }, [isRotating, problems.length]);

  // 🔐 登录函数 (简单版本)
  const login = (username: string) => {
    const newAuth: UserAuth = {
      isLoggedIn: true,
      username,
      loginTime: new Date()
    };
    setAuth(newAuth);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(newAuth));
  };

  // 🚪 登出函数
  const logout = () => {
    const newAuth: UserAuth = { isLoggedIn: false };
    setAuth(newAuth);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(newAuth));
  };

  // ➕ 添加新题目
  const addProblem = (newProblem: Omit<LeetCodeProblem, 'id'>) => {
    const problemWithId: LeetCodeProblem = {
      ...newProblem,
      id: Date.now().toString() // 简单的ID生成
    };
    
    const updatedProblems = [problemWithId, ...problems];
    setProblems(updatedProblems);
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(updatedProblems));
  };

  // 🗑️ 删除题目
  const deleteProblem = (problemId: string) => {
    const updatedProblems = problems.filter(p => p.id !== problemId);
    setProblems(updatedProblems);
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(updatedProblems));
    
    // 调整当前索引
    if (currentProblemIndex >= updatedProblems.length) {
      setCurrentProblemIndex(0);
    }
  };

  // 📊 计算统计信息
  const getStats = (): LeetCodeStats => {
    const easySolved = problems.filter(p => p.difficulty === 'Easy').length;
    const mediumSolved = problems.filter(p => p.difficulty === 'Medium').length;
    const hardSolved = problems.filter(p => p.difficulty === 'Hard').length;
    
    // 计算连续天数 (简化版)
    const sortedByDate = problems.sort((a, b) => 
      new Date(b.solveDate).getTime() - new Date(a.solveDate).getTime()
    );
    
    let currentStreak = 0;
    const today = new Date();
    
    for (const problem of sortedByDate) {
      const problemDate = new Date(problem.solveDate);
      const daysDiff = Math.floor((today.getTime() - problemDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= currentStreak + 1) {
        currentStreak++;
      } else {
        break;
      }
    }

    // 获取最常用标签
    const tagCount: { [key: string]: number } = {};
    problems.forEach(problem => {
      problem.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    
    const favoriteTopics = Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([tag]) => tag);

    return {
      totalSolved: problems.length,
      currentStreak,
      easySolved,
      mediumSolved,
      hardSolved,
      favoriteTopics
    };
  };

  // 🎯 手动切换到下一个题目
  const nextProblem = () => {
    if (problems.length > 0) {
      const nextIndex = (currentProblemIndex + 1) % problems.length;
      setCurrentProblemIndex(nextIndex);
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, nextIndex.toString());
    }
  };

  // ⏮️ 手动切换到上一个题目
  const prevProblem = () => {
    if (problems.length > 0) {
      const prevIndex = currentProblemIndex === 0 ? problems.length - 1 : currentProblemIndex - 1;
      setCurrentProblemIndex(prevIndex);
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, prevIndex.toString());
    }
  };

  // 🎠 切换自动轮播
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return {
    // 数据
    problems,
    auth,
    currentProblem: problems[currentProblemIndex],
    currentProblemIndex,
    isRotating,
    stats: getStats(),
    
    // 方法
    login,
    logout,
    addProblem,
    deleteProblem,
    nextProblem,
    prevProblem,
    toggleRotation
  };
}
