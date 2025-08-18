import React from 'react';
import { CheckCircle, Target, TrendingUp, Calendar } from 'lucide-react';
import { Task, Goal } from '../../types';
import { StatsCard } from './StatsCard';
import { ProgressBar } from '../Progress/ProgressBar';

interface DashboardProps {
  tasks: Task[];
  goals: Goal[];
}

export function Dashboard({ tasks, goals }: DashboardProps) {
  const today = new Date().toLocaleDateString();
  const todayISO = new Date().toISOString();
  const todayTasks = tasks.filter(task => new Date(task.date).toLocaleDateString() === today);
  const completedTasks = todayTasks.filter(task => task.completed);
  const completionRate = todayTasks.length > 0 ? (completedTasks.length / todayTasks.length) * 100 : 0;
  
  const activeGoals = goals.filter(goal => goal.currentValue < goal.targetValue);
  const completedGoals = goals.filter(goal => goal.currentValue >= goal.targetValue);
  
  const averageGoalProgress = goals.length > 0 
    ? goals.reduce((acc, goal) => acc + (goal.currentValue / goal.targetValue) * 100, 0) / goals.length 
    : 0;

  const thisWeekTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return taskDate >= weekStart && taskDate <= weekEnd;
  });

  const weeklyCompletionRate = thisWeekTasks.length > 0 
    ? (thisWeekTasks.filter(task => task.completed).length / thisWeekTasks.length) * 100 
    : 0;


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Tasks"
          value={`${completedTasks.length}/${todayTasks.length}`}
          subtitle="completed"
          icon={CheckCircle}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Goals"
          value={activeGoals.length}
          subtitle={`${completedGoals.length} completed`}
          icon={Target}
          color="purple"
        />
        <StatsCard
          title="Weekly Progress"
          value={`${weeklyCompletionRate.toFixed(0)}%`}
          subtitle="completion rate"
          icon={TrendingUp}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="This Month"
          value={tasks.filter(task => task.date.startsWith(todayISO.slice(0, 7))).length}
          subtitle="total tasks"
          icon={Calendar}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Task Completion</span>
                <span className="text-sm text-gray-600">{completedTasks.length}/{todayTasks.length}</span>
              </div>
              <ProgressBar progress={completionRate} color="purple" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Goal Progress</span>
                <span className="text-sm text-gray-600">{averageGoalProgress.toFixed(0)}%</span>
              </div>
              <ProgressBar progress={averageGoalProgress} color="purple" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Goals</h3>
          <div className="space-y-3">
            {goals.slice(0, 3).map(goal => {
              const progress = (goal.currentValue / goal.targetValue) * 100;
              return (
                <div key={goal._id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                    <p className="text-xs text-gray-500">{goal.currentValue}/{goal.targetValue} {goal.unit}</p>
                  </div>
                  <div className="w-20">
                    <ProgressBar progress={progress} size="sm" showPercentage={false} color="purple" />
                  </div>
                </div>
              );
            })}
            {goals.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No goals yet. Create your first goal!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}