import React,{useState} from 'react';
import { Calendar, Target, List, BarChart3, User, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Task, Goal } from '../../types';

interface SidebarProps {
  currentView: 'tasks' | 'goals' | 'dashboard' | 'calendar';
  onViewChange: (view: 'tasks' | 'goals' | 'dashboard' | 'calendar') => void;
  tasks: Task[];
  goals: Goal[];
    
}

export function Sidebar({ currentView, onViewChange,  tasks, goals,  }: SidebarProps) {
 

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: List },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const categories = [
    { name: 'Personal', color: 'bg-blue-500', count: tasks.filter(t => t.category === 'personal').length },
    { name: 'Work', color: 'bg-purple-500', count: tasks.filter(t => t.category === 'work').length },
    { name: 'Health', color: 'bg-green-500', count: tasks.filter(t => t.category === 'health').length },
    { name: 'Learning', color: 'bg-orange-500', count: tasks.filter(t => t.category === 'learning').length },
  ];

  const completedGoals = goals.filter(goal => goal.currentValue >= goal.targetValue).length;

  return (
    <div className="w-80 bg-deep-violet text-white flex flex-col relative overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bright-purple/20 via-soft-lavender/10 to-pastel-blue/20"></div>
      <div className="relative z-10 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-bright-purple to-soft-lavender rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Milo</h1>
            <p className="text-soft-lavender text-sm">Smart Planner</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="w-8 h-8 bg-gradient-to-r from-bright-purple to-soft-lavender rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Antonio Loremio</p>
            <p className="text-xs text-muted-gray">Free Account</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-gray" />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-gradient-to-r from-bright-purple to-soft-lavender text-white shadow-lg'
                : 'text-soft-lavender hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>


    

      {/* Categories */}
      <div className="px-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-soft-lavender">Categories</h3>
          <ChevronDown className="w-4 h-4 text-muted-gray" />
        </div>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center space-x-3">
              <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
              <span className="text-sm text-soft-lavender flex-1">{category.name}</span>
              <span className="text-xs text-muted-gray">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Meeting Card */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-bright-purple to-soft-lavender rounded-lg p-4 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/90">12:00 - 13:30</span>
            <span className="text-xs text-white/90">14 min</span>
          </div>
          <h4 className="text-sm font-semibold mb-2">Meet Gabriel at the International Library</h4>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white/20 text-white text-xs rounded-md">
              Later
            </button>
            <button className="px-3 py-1 bg-white text-deep-violet text-xs rounded-md font-medium">
              Details
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}