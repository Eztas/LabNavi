import type { Comment } from '../types/comment';

export const initialComments: Comment[] = [
  {
    id: 1, // Added
    labId: 'system_control',
    labName: 'システム制御論研究室',
    statement: '研究室の設備が充実していて、実験には困らない。',
    createdAts: '2025-07-28T10:30:00Z',
    likes: 15,
  },
  {
    id: 2, // Added
    labId: 'system_control',
    labName: 'システム制御論研究室',
    statement: '先輩たちが親切で、研究に行き詰まっても相談しやすい雰囲気がある。',
    createdAts: '2025-07-25T15:45:10Z',
    likes: 23,
  },
  {
    id: 3, // Added
    labId: 'communication_theory',
    labName: '通信方式研究室',
    statement: '自分のペースで研究を進められるので、兼部やアルバイトとの両立がしやすい。',
    createdAts: '2025-06-12T09:00:00Z',
    likes: 8,
  },
  {
    id: 4, // Added
    labId: 'materials_science',
    labName: '材料科学研究室',
    statement: '教授の指導が熱心で、論文の書き方から丁寧に教えてもらえる。',
    createdAts: '2025-08-01T11:20:30Z',
    likes: 31,
  },
  {
    id: 5, // Added
    labId: 'materials_science',
    labName: '材料科学研究室',
    statement: 'コアタイムは長いが、その分、研究室のメンバーとの仲が深まる。',
    createdAts: '2025-05-20T18:10:05Z',
    likes: 18,
  },
  {
    id: 6, // Added
    labId: 'ai_robotics',
    labName: 'AIロボティクス研究室',
    statement: 'トップカンファレンスでの発表を目指せるので、研究者志望の学生には最高の環境。',
    createdAts: '2025-07-30T20:05:50Z',
    likes: 45,
  },
  {
    id: 7, // Added
    labId: 'ai_robotics',
    labName: 'AIロボティクス研究室',
    statement: '自由な発想で研究テーマを決められるのが魅力。',
    createdAts: '2025-04-15T14:22:00Z',
    likes: 29,
  },
  {
    id: 8, // Added
    labId: 'human_interface',
    labName: 'ヒューマンインタフェース研究室',
    statement: 'VRやARの最新機材に触れられるのが楽しい。',
    createdAts: '2025-08-02T09:55:15Z',
    likes: 35,
  },
  {
    id: 9, // Added
    labId: 'human_interface',
    labName: 'ヒューマンインタフェース研究室',
    statement: '学会発表だけでなく、展示会への出展など、アウトプットの機会が多い。',
    createdAts: '2024-11-30T12:00:00Z',
    likes: 0,
  },
  {
    id: 10, // Added
    labId: 'communication_theory',
    labName: '通信方式研究室',
    statement: '留学生が多く、国際的な交流ができる。',
    createdAts: '2025-02-10T17:40:40Z',
    likes: 12,
  },
];