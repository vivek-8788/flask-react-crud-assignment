import React, { useState } from 'react';
import TaskForm from './TaskForm';
import CommentSection from './CommentSection';
import { Edit2, Trash2, Check, X, MessageSquare } from 'lucide-react';

const TaskCard = ({ task, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleUpdate = async (taskData) => {
    await onUpdate(task.id, taskData);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="task-card">
        <TaskForm
          task={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
            {task.completed ? (
              <>
                <Check size={14} />
                Completed
              </>
            ) : (
              <>
                <X size={14} />
                Pending
              </>
            )}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
        Created: {formatDate(task.created_at)}
        {task.updated_at !== task.created_at && (
          <span> • Updated: {formatDate(task.updated_at)}</span>
        )}
      </div>

      <div className="task-actions">
        <button
          className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
          onClick={handleToggleComplete}
        >
          {task.completed ? (
            <>
              <X size={14} />
              Mark Pending
            </>
          ) : (
            <>
              <Check size={14} />
              Mark Complete
            </>
          )}
        </button>
        
        <button
          className="btn btn-primary"
          onClick={() => setIsEditing(true)}
        >
          <Edit2 size={14} />
          Edit
        </button>
        
        <button
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={14} />
          Delete
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare size={14} />
          Comments ({task.comments_count || 0})
        </button>
      </div>

      {showComments && (
        <CommentSection taskId={task.id} />
      )}
    </div>
  );
};

export default TaskCard;