import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task } from '../../types';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  selectedDate: string;
}

export function TaskForm({ onAdd, selectedDate }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Task['category']>('personal');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      category,
      priority,
      date: selectedDate,
    });

    setTitle('');
    setDescription('');
    setCategory('personal');
    setPriority('medium');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all duration-200"
      >
        <Plus className="w-5 h-5" />
        <span>Add new task</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Add New Task</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title..."
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Task['category'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="health">Health</option>
              <option value="learning">Learning</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-bright-purple to-soft-lavender text-white py-2 px-4 rounded-md hover:from-soft-lavender hover:to-bright-purple transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-soft-lavender text-deep-violet rounded-md hover:bg-cool-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}