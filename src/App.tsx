import React, { useState } from 'react';
import { Calendar, Target, List, BarChart3, User, ChevronDown } from 'lucide-react';
import { Task, Goal } from './types';
import { useTasks } from './hooks/useTasks';
import { useGoals } from './hooks/useGoals';
import { Sidebar } from './components/Navigation/Sidebar';
import { TaskForm } from './components/Tasks/TaskForm';
import { TaskItem } from './components/Tasks/TaskItem';
import { GoalForm } from './components/Goals/GoalForm';
import { GoalItem } from './components/Goals/GoalItem';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState< 'tasks' | 'goals' | 'dashboard'>('dashboard');

  const { tasks, addTask, updateTask, deleteTask, toggleTask,getTasksForDate,fetchTasks } = useTasks();
  const { goals, addGoal, updateGoal, deleteGoal, updateGoalProgress } = useGoals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cool-white to-white flex">
       <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        tasks={tasks}
        goals={goals}
      />

      <main className="flex-1 overflow-hidden">
       

        {currentView === 'dashboard' && (
          <div className="p-6">
            <Dashboard tasks={tasks} goals={goals} />
          </div>
        )}

       
        {currentView === 'tasks' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-deep-violet mb-6">All Tasks</h2>
              <TaskForm onAdd={addTask} selectedDate={new Date().toISOString()} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tasks.map((task,index) => (
                <TaskItem
                  key={`${task._id}-${index}`}
                  task={task}
                  onToggle={toggleTask}
                  onEdit={updateTask}
                  onDelete={deleteTask}
                />
                ))}
              {tasks.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <List className="w-12 h-12 text-muted-gray mx-auto mb-4" />
                  <p className="text-muted-gray text-lg">No tasks yet. Create your first task!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'goals' && (
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-deep-violet mb-6">Goals & Objectives</h2>
              <GoalForm onAdd={addGoal} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map(goal => (
                <GoalItem
                  key={goal._id}
                  goal={goal}
                  onEdit={updateGoal}
                  onDelete={deleteGoal}
                  onUpdateProgress={updateGoalProgress}
                />
              ))}
              {goals.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Target className="w-12 h-12 text-muted-gray mx-auto mb-4" />
                  <p className="text-muted-gray text-lg">No goals yet. Set your first goal!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;