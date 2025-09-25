import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const CommentForm = ({ comment = null, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    content: comment?.content || '',
    author: comment?.author || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert('Please enter comment content');
      return;
    }

    if (!formData.author.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="comment-form" style={{ marginBottom: '1rem' }}>
      <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: '600' }}>
        {isEditing ? 'Edit Comment' : 'Add Comment'}
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="author">
            Your Name *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your name..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="content">
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-input form-textarea"
            placeholder="Write your comment..."
            required
            disabled={isSubmitting}
            style={{ minHeight: '60px' }}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X size={12} />
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-small"
            disabled={isSubmitting}
          >
            <Save size={12} />
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Add Comment')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;