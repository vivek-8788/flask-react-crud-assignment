import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { Edit2, Trash2, User } from 'lucide-react';

const CommentItem = ({ comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (commentData) => {
    await onUpdate(comment.id, commentData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="comment">
        <CommentForm
          comment={comment}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={14} />
          <span className="comment-author">{comment.author}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="comment-date">
            {formatDate(comment.created_at)}
            {comment.updated_at !== comment.created_at && ' (edited)'}
          </span>
        </div>
      </div>
      
      <div className="comment-content">
        {comment.content}
      </div>
      
      <div className="comment-actions">
        <button
          className="btn btn-primary btn-small"
          onClick={() => setIsEditing(true)}
        >
          <Edit2 size={12} />
          Edit
        </button>
        <button
          className="btn btn-danger btn-small"
          onClick={() => onDelete(comment.id)}
        >
          <Trash2 size={12} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentItem;