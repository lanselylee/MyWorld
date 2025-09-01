export type ProjectLink = { label: string; href: string };
export type Project = {
  title: string;
  blurbEN: string;
  blurbZH: string;
  tags: string[];
  links: ProjectLink[];
};

export type Hobby = {
  emoji: string;
  nameEN: string;
  nameZH: string;
  descEN: string;
  descZH: string;
};

export type Links = {
  github: string;
  linkedin: string;
  email: string;
};

export const site = {
  name: 'Xiaomeng Li / 李晓蒙',
  headlineEN: 'Software Engineer — builds data dashboards & AI testing tools.',
  headlineZH: '软件工程师，专注数据看板与 AI 测试工具。',
};

export const projects: Project[] = [
  {
    title: 'TestSprite Metrics Dashboard',
    blurbEN: 'Next.js + AWS Lambda + DynamoDB. Retention, DAU/WAU, subscription cohorts.',
    blurbZH: 'Next.js + AWS Lambda + DynamoDB，包含留存、DAU/WAU、订阅分群。',
    tags: ['Next.js', 'Lambda', 'DynamoDB'],
    links: [
      { label: 'Live', href: '#' },
      { label: 'Code', href: '#' },
      { label: 'Case Study', href: '#' },
    ],
  },
  {
    title: 'PackageTrackr',
    blurbEN: 'Python + Sheets + Lambda. Multi-user parcel search with weekly stats.',
    blurbZH: 'Python + Sheets + Lambda，多人包裹查询与周统计。',
    tags: ['Python', 'Lambda', 'Sheets'],
    links: [{ label: 'Code', href: '#' }],
  },
];

export const hobbies: Hobby[] = [
  { emoji: '🥟', nameEN: 'Cooking (Hunan)', nameZH: '烹饪（湘菜）', descEN: 'Spicy experiments.', descZH: '剁椒 / 外婆菜 / 小笼包实验室' },
  { emoji: '📷', nameEN: 'Photography', nameZH: '摄影', descEN: 'Streets and misty trails.', descZH: '街拍与雾林步道' },
  { emoji: '🥾', nameEN: 'Hiking', nameZH: '徒步', descEN: 'Switchbacks and summits.', descZH: '之字坡与小峰顶' },
  { emoji: '✍️', nameEN: 'Writing', nameZH: '写作', descEN: 'Horror & suspense.', descZH: '恐怖悬疑小品' },
];

export const now: string[] = [
  'Building data products & serverless bits',
  'Practicing LeetCode + English interviews',
  'Exploring cafés (no cold brew!)',
];

export const links: Links = {
  github: 'https://github.com/yourname',
  linkedin: 'https://www.linkedin.com/in/yourname',
  email: 'you@email.com',
};



