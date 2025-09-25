import React from 'react';
import TaskCard from './TaskCard';
import { CheckSquare } from 'lucide-react';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <CheckSquare size={48} className="empty-state-icon" />
        <h3 style={{ marginBottom: '0.5rem' }}>No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;