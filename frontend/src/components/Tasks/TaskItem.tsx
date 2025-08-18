import React, { useState } from 'react';
import { CheckCircle2, Circle, Edit2, Trash2, Clock } from 'lucide-react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    onEdit(task._id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-green-100 text-green-800',
    health: 'bg-red-100 text-red-800',
    learning: 'bg-purple-100 text-purple-800'
  };

  const priorityColors = {
    low: 'border-l-green-500',
    medium: 'border-l-yellow-500',
    high: 'border-l-red-500'
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 p-4 transition-all duration-200 hover:shadow-md ${priorityColors[task.priority]} ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggle(task._id)}
            className="mt-0.5 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[task.category]}`}>
                    {task.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(task.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="flex space-x-1 ml-2">
            <button
              onClick={() => {setIsEditing(true)
                
              }}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}