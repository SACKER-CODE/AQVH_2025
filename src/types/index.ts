export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'counsellor' | 'student' | 'student_volunteer';
  rollNumber?: string;
  department?: string;
  section?: string;
  address?: string;
  specialization?: string; // For counsellors
  isActive: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  studentId: string;
  counsellorId?: string;
  type: 'emergency' | 'scheduled';
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  date?: Date;
  time?: string;
  reason: string;
  cause: string;
  response?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  category: 'stress' | 'anxiety' | 'depression' | 'wellness' | 'other';
  language: string;
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  createdBy: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ForumPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  isAnonymous: boolean;
  isFlagged: boolean;
  isModerated: boolean;
  replies: ForumReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  isAnonymous: boolean;
  isFlagged: boolean;
  createdAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'counsellor' | 'helpline' | 'emergency';
  isActive: boolean;
  region?: string;
}

export interface AnalyticsData {
  totalUsers: number;
  totalBookings: number;
  emergencyBookings: number;
  resourceViews: number;
  forumPosts: number;
  trendData: {
    date: string;
    bookings: number;
    emergencies: number;
    resources: number;
  }[];
  categoryBreakdown: {
    category: string;
    count: number;
  }[];
}