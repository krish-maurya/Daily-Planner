export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'work' | 'personal' | 'health' | 'learning';
  priority: 'low' | 'medium' | 'high';
  date: string; // YYYY-MM-DD format
  createdAt: string;
}

export interface Goal {
  _id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string; // YYYY-MM-DD format
  category: 'fitness' | 'career' | 'personal' | 'learning' | 'financial';
  createdAt: string;
}

export interface DayData {
  date: string;
  tasks: Task[];
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
}

