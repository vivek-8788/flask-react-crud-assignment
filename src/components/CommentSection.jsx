import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { getComments, createComment, updateComment, deleteComment } from '../services/api';
import { MessageSquare, Plus } from 'lucide-react';

const CommentSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(taskId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (commentData) => {
    try {
      const newComment = await createComment(taskId, commentData);
      setComments(prev => [newComment, ...prev]);
      setShowCommentForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create comment');
      console.error('Error creating comment:', err);
    }
  };

  const handleUpdateComment = async (commentId, commentData) => {
    try {
      const updatedComment = await updateComment(commentId, commentData);
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? updatedComment : comment
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update comment');
      console.error('Error updating comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      setError(null);
    } catch (err) {
      setError('Failed to delete comment');
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h4 className="comments-title">
          <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
          Comments ({comments.length})
        </h4>
        <button
          className="btn btn-primary btn-small"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          <Plus size={12} />
          Add Comment
        </button>
      </div>

      {error && (
        <div className="error" style={{ fontSize: '0.875rem', padding: '0.5rem' }}>
          {error}
        </div>
      )}

      {showCommentForm && (
        <CommentForm
          onSubmit={handleCreateComment}
          onCancel={() => setShowCommentForm(false)}
        />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
          Loading comments...
        </div>
      ) : (
        <CommentList
          comments={comments}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      )}
    </div>
  );
};

export default CommentSection;