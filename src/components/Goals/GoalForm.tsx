import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Goal } from '../../types';

interface GoalFormProps {
  onAdd: (goal: Omit<Goal, '_id' | 'createdAt'>) => void;
}

export function GoalForm({ onAdd }: GoalFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetValue, setTargetValue] = useState(1);
  const [unit, setUnit] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState<Goal['category']>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !unit.trim() || !deadline) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      targetValue,
      currentValue: 0,
      unit: unit.trim(),
      deadline,
      category,
    });

    setTitle('');
    setDescription('');
    setTargetValue(1);
    setUnit('');
    setDeadline('');
    setCategory('personal');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-400 hover:text-purple-500 transition-all duration-200"
      >
        <Plus className="w-6 h-6" />
        <span className="text-lg">Add new goal</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Add New Goal</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="goal-title" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Title
          </label>
          <input
            type="text"
            id="goal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter goal title..."
            required
          />
        </div>

        <div>
          <label htmlFor="goal-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="goal-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe your goal..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="target-value" className="block text-sm font-medium text-gray-700 mb-1">
              Target Value
            </label>
            <input
              type="number"
              id="target-value"
              value={targetValue}
              onChange={(e) => setTargetValue(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., books, lbs, hours"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="goal-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="goal-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Goal['category'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="personal">Personal</option>
              <option value="fitness">Fitness</option>
              <option value="career">Career</option>
              <option value="learning">Learning</option>
              <option value="financial">Financial</option>
            </select>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
              required
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-bright-purple to-soft-lavender text-white py-2 px-4 rounded-md hover:from-soft-lavender hover:to-bright-purple transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Goal
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