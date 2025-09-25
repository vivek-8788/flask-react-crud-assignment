import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import { Plus, CheckSquare } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowTaskForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task? This will also delete all comments.')) {
      return;
    }

    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    await handleUpdateTask(taskId, { completed });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <CheckSquare size={24} />
          <span style={{ marginLeft: '0.5rem' }}>Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <p>Organize your tasks and collaborate with comments</p>
      </div>
      
      <div className="content">
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            Your Tasks ({tasks.length})
          </h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowTaskForm(true)}
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>

        {showTaskForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskForm(false)}
          />
        )}

        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}

export default App;