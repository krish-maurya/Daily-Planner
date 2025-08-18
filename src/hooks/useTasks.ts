import { useState, useCallback, useEffect } from "react";
import { Task } from "../types";
import cookie from "js-cookie";

export function useTasks() {
  const host = import.meta.env.HOST;
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback(
    async (task: Omit<Task, "_id" | "createdAt">) => {
      try {
        const response = await fetch(`${host}/tasks/addtask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const taskData = await response.json();
        console.log(taskData);
        setTasks((prev) => [...prev, taskData]);
        console.log("Task added:", taskData);
        return taskData;
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    [setTasks]
  );

  const updateTask = useCallback(
    async (id: string, updates: Partial<Task>) => {
      try {
        const response = await fetch(`${host}/tasks/${id}`, {
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

        const taskData = await response.json();
        console.log(taskData);
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? { ...task, ...updates } : task))
        );
        console.log("Task added:", taskData);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${host}/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie.get("token")}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${host}/tasks/complete/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${cookie.get("token")}`
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          )
        );
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    [setTasks]
  );

  const getTasksForDate = useCallback(
    async (date: string) => {
      return tasks.filter((task) => task.date === date);
    },
    [tasks]
  );

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`${host}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookie.get("token")}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedTasks = await response.json();

      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [setTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTasksForDate,
    fetchTasks,
  };
}
