import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'lavender' | 'blue' | 'violet';
  showPercentage?: boolean;
}

export function ProgressBar({ 
  progress, 
  className = '', 
  size = 'md', 
  color = 'purple',
  showPercentage = true 
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    purple: 'bg-gradient-to-r from-bright-purple to-soft-lavender',
    lavender: 'bg-gradient-to-r from-soft-lavender to-pastel-blue',
    blue: 'bg-gradient-to-r from-pastel-blue to-bright-purple',
    violet: 'bg-gradient-to-r from-deep-violet to-bright-purple'
  };

  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`space-y-1 ${className}`}>
      <div className={`w-full bg-cool-white rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-muted-gray text-right">
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
}