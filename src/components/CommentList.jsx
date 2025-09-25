import React from 'react';
import CommentItem from './CommentItem';
import { MessageSquare } from 'lucide-react';

const CommentList = ({ comments, onUpdate, onDelete }) => {
  if (comments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem', color: '#6b7280' }}>
        <MessageSquare size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;