import React, { useState } from 'react';
import { Edit2, Trash2, Target, Calendar } from 'lucide-react';
import { Goal } from '../../types';
import { ProgressBar } from '../Progress/ProgressBar';
import { CircularProgress } from '../Progress/CircularProgress';

interface GoalItemProps {
  goal: Goal;
  onEdit: (id: string, updates: Partial<Goal>) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (id: string, value: number) => void;
}

export function GoalItem({ goal, onEdit, onDelete, onUpdateProgress }: GoalItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [progressValue, setProgressValue] = useState(goal.currentValue);

  const progress = (goal.currentValue / goal.targetValue) * 100;
  const isCompleted = goal.currentValue >= goal.targetValue;
  const daysLeft = Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  const categoryColors = {
    fitness: 'bg-red-100 text-red-800 border-red-200',
    career: 'bg-blue-100 text-blue-800 border-blue-200',
    personal: 'bg-green-100 text-green-800 border-green-200',
    learning: 'bg-purple-100 text-purple-800 border-purple-200',
    financial: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const handleProgressUpdate = () => {
    onUpdateProgress(goal._id, progressValue);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 transition-all duration-200 hover:shadow-md ${
      isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
            {isCompleted && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Completed
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">{goal.description}</p>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${categoryColors[goal.category]}`}>
              {goal.category.charAt(0).toLocaleUpperCase()+goal.category.split(goal.category.charAt(0))[1].toLocaleLowerCase()}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {daysLeft === 0 ? 'Due today' : `${daysLeft} days left`}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <CircularProgress progress={progress} size={80} />
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(goal._id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <ProgressBar progress={progress} color="purple" />
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Progress: {goal.currentValue} / {goal.targetValue} {goal.unit}</span>
          <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
        </div>

        {isEditing && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700">Update Progress:</label>
              <input
                type="number"
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                min="0"
                max={goal.targetValue}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
              />
              <span className="text-sm text-gray-600">{goal.unit}</span>
              <button
                onClick={handleProgressUpdate}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}