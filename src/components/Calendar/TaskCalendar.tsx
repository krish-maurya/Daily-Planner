import React, { useCallback, useEffect, useState } from 'react';
import { Plus, X, ChevronDown, StickyNote } from 'lucide-react';
import { Task } from '../../types';
import Cookies from 'js-cookie';

interface CalendarProps {
  onAdd: (task: Omit<Task, '_id' | 'createdAt'>) => void;
  onDelete: (id: string) => void;
}


const TaskCalendar = ({ onAdd, onDelete }: CalendarProps) => {
  const host = "http://localhost:3000";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('work');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(2025);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const categoryColors = {
    work: 'bg-purple-100 text-purple-800 border-purple-200',
    health: 'bg-green-100 text-green-800 border-green-200',
    personal: 'bg-orange-100 text-orange-800 border-orange-200',
    learning: 'bg-pink-100 text-pink-800 border-pink-200',
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getDayName = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  // const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const num = ['01', '02', '03', '04', '05', '06', '07'];

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowTaskModal(true);
  };

  const handleAddTask = () => {
    if (title.trim() && selectedDate) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        category,
        priority,
        date: selectedDate,
      });

      setTitle('');
      setCategory('work');
      setDescription('');
      setPriority('medium');
      setShowTaskModal(false);
      setSelectedDate(null);
      setRefreshFlag(!refreshFlag);
    }
  };

// New effect to fetch all tasks for the selected month
useEffect(() => {
  const fetchMonthTasks = async () => {
    try {
        const response = await fetch(`${host}/tasks/month/${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const monthTasks = await response.json();
      setTasks(monthTasks);
    } catch (error) {
      console.error("Error fetching monthly tasks:", error);
    }
  };

  fetchMonthTasks();
}, [currentMonth, currentYear, refreshFlag]);

const getTasksForDate = (day: number) => {
  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.toISOString().slice(0, 10) === dateStr;
  });
};



  const handleDeleteTask = (taskId: string) => {
    onDelete(taskId)
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth(monthIndex);
    setShowMonthDropdown(false);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-4 border border-gray-100 bg-gray-50/30"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = getTasksForDate(day);
      console.log(dayTasks)
      const today = new Date();
      const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
      const dayName = getDayName(currentYear, currentMonth, day);

      days.push(
        <div
          key={day}
          className={`group relative rounded-xl p-4 border  border-gray-200 min-h-32 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-purple-200 hover:bg-purple-50/30 ${isToday ? 'bg-purple-50 border-purple-300 shadow-sm' : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-purple-50/20'
            }`}
          onClick={() => handleDateClick(day)}
        >
          {/* Date and Day Name */}
          <div className="flex items-center justify-between mb-3">
            <div className={`text-lg font-semibold ${isToday ? 'text-purple-600' : 'text-gray-900'}`}>
              {day}
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${isToday ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
              }`}>
              {dayName}
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-1.5">
            {dayTasks.slice(0, 3).map((task) => (
              <div
                key={task._id}
                className={`px-2.5 py-1.5 rounded-md text-xs border ${categoryColors[task.category]} truncate group/task relative shadow-sm hover:shadow-md transition-shadow`}
              >
                {task.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task._id);
                  }}
                  className="absolute top-1 right-1 w-4 h-4 bg-red-500/5 text-white rounded-full flex items-center justify-center opacity-0 group-hover/task:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500 px-2 font-medium">
                +{dayTasks.length - 3} more tasks
              </div>
            )}
          </div>

          {/* Add Task Button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-purple-600 transition-colors">
              <Plus size={14} />
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-4">

        <div className="flex items-center justify-between">
          {/* Month Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
            >
              <span className="text-lg font-semibold text-gray-700">
                {months[currentMonth]} {currentYear}
              </span>
              <ChevronDown size={18} className="text-gray-500" />
            </button>

            {showMonthDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                <div className="py-2 max-h-64 overflow-y-auto">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthChange(index)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${index === currentMonth ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700'
                        }`}
                    >
                      {month} {currentYear}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center gap-1 bg-gray-100 p-1 rounded-lg'>
            <h1 className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900'
            >
              <StickyNote size={16} />
              Total Tasks : {tasks.length}
            </h1>
          </div>
        </div>
      </div>



      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Week Day Headers */}
        <div className="grid grid-cols-7 gap-0 bg-gray-50 border-b border-gray-200">
          {num.map((day) => (
            <div key={day} className="p-4 font-semibold text-center text-sm text-gray-500 border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7  gap-0.5">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Task</h3>
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setSelectedDate(null);
                  setTitle('');
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

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

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddTask}
                  disabled={!title.trim()}
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setShowTaskModal(false);
                    setSelectedDate(null);
                    setTitle('');
                  }}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showMonthDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMonthDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default TaskCalendar;