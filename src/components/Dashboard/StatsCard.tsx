import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: typeof LucideIcon;
  color: 'purple' | 'lavender' | 'blue' | 'violet';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, subtitle, icon: Icon, color, trend }: StatsCardProps) {
  const colorClasses = {
    purple: 'bg-gradient-to-r from-bright-purple to-soft-lavender text-bright-purple bg-soft-lavender/20',
    lavender: 'bg-gradient-to-r from-soft-lavender to-pastel-blue text-soft-lavender bg-soft-lavender/20',
    blue: 'bg-gradient-to-r from-pastel-blue to-bright-purple text-pastel-blue bg-pastel-blue/20',
    violet: 'bg-gradient-to-r from-deep-violet to-bright-purple text-deep-violet bg-deep-violet/20'
  };

  const [bgClass, textClass, lightBgClass] = colorClasses[color].split(' ');

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-gray mb-1">{title}</p>
          <p className="text-2xl font-bold text-deep-violet">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-gray mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-bright-purple' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-muted-gray ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${lightBgClass} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${textClass}`} />
        </div>
      </div>
    </div>
  );
}