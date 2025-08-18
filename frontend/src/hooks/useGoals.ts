import { useCallback, useEffect, useState } from 'react';
import { Goal } from '../types';
import cookie from 'js-cookie';

export function useGoals() {
  const host = "http://localhost:3000";
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = useCallback(async(goal: Omit<Goal, '_id' | 'createdAt'>) => {
     try {
        const response = await fetch(`${host}/goals/addgoal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
          body: JSON.stringify(goal),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newGoal = await response.json();
        setGoals(prev => [...prev, newGoal]);
      } catch (error) {
        console.error("Error adding goal:", error);
      }
  }, [setGoals]);

  const updateGoal = useCallback(async(id: string, updates: Partial<Goal>) => {
    try {
        const response = await fetch(`${host}/goals/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const goalData = await response.json();
        console.log(goalData);
       setGoals(prev => prev.map(goal => 
      goal._id === id ? { ...goal, ...updates } : goal
    ));
        console.log("Goal added:", goalData);
      } catch (error) {
        console.error("Error adding Goal:", error);
      }
    
  }, [setGoals]);

  const deleteGoal = useCallback(async(id: string) => {
     try {
        const response = await fetch(`${host}/goals/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
    setGoals(prev => prev.filter(goal => goal._id !== id));
      } catch (error) {
        console.error("Error adding Goal:", error);
      }
  }, [setGoals]);

  const updateGoalProgress = useCallback(async(id: string, value: number) => {
     try {
        const response = await fetch(`${host}/goals/progress/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
          body: JSON.stringify({"currentValue": value}),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const goalData = await response.json();
        console.log(goalData);
       setGoals(prev => prev.map(goal =>
      goal._id === id ? { ...goal, currentValue: Math.min(value, goal.targetValue) } : goal
    ));
        console.log("Goal added:", goalData);
      } catch (error) {
        console.error("Error adding Goal:", error);
      }
    
  }, [setGoals]);

  const fetchGoals = useCallback(async () => {
      try {
        const response = await fetch(`${host}/goals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const fetchedGoals = await response.json();
  
        setGoals(fetchedGoals);
      } catch (error) {
        console.error("Error fetching Goals:", error);
      }
    }, [setGoals]);
  
    useEffect(() => {
      fetchGoals();
    }, [fetchGoals]);

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
  };
}