import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DOMPurify from 'isomorphic-dompurify';

interface CommentFormData {
  comment: string;
}

interface Comment {
  comment: string;
  timestamp: Date;
}

export default function ValidationDemo() {
  const [submittedComments, setSubmittedComments] = useState<Comment[]>([]);
  const [showUnsanitized, setShowUnsanitized] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CommentFormData>({
    mode: 'onChange'
  });

  const commentValue = watch('comment', '');

  const onSubmit = (data: CommentFormData) => {
    setSubmittedComments([
      ...submittedComments,
      {
        comment: data.comment,
        timestamp: new Date()
      }
    ]);
    setValue('comment', '');
  };

  const insertXSSExample = () => {
    setValue('comment', '<img src=x onerror="alert(\'XSS Attack!\')">', {
      shouldValidate: true
    });
  };

  const sanitizeHTML = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href']
    });
  };

  return (
    <div className="validation-demo">
      <div className="demo-container">
        <div className="form-section">
          <h3>Comment Form</h3>
          <p className="demo-description">
            Try entering invalid data or click the XSS button to test sanitization
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="demo-form">
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                {...register('comment', {
                  required: 'Comment is required',
                  minLength: {
                    value: 10,
                    message: 'Comment must be at least 10 characters'
                  },
                  maxLength: {
                    value: 500,
                    message: 'Comment must be less than 500 characters'
                  }
                })}
                rows={4}
                placeholder="Enter your comment (min 10 characters)"
                className={errors.comment ? 'error' : ''}
              />
              {errors.comment && (
                <span className="error-message">{errors.comment.message}</span>
              )}
              <span className="char-count">{commentValue.length} / 500</span>
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="btn-primary"
                disabled={!!errors.comment || !commentValue.trim()}
              >
                Submit Comment
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={insertXSSExample}
              >
                Insert XSS Payload
              </button>
            </div>
          </form>
        </div>

        <div className="comments-section">
          <div className="section-header">
            <h3>Submitted Comments</h3>
            <label className="toggle">
              <input
                type="checkbox"
                checked={showUnsanitized}
                onChange={(e) => setShowUnsanitized(e.target.checked)}
              />
              <span>Show Unsanitized (Dangerous!)</span>
            </label>
          </div>

          {submittedComments.length === 0 ? (
            <div className="no-comments">
              No comments yet. Try submitting one!
            </div>
          ) : (
            <div className="comments-list">
              {submittedComments.map((comment, index) => (
                <div key={index} className="comment-card">
                  <div className="comment-header">
                    <strong>User</strong>
                    <span className="comment-time">
                      {comment.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="comment-body">
                    {showUnsanitized && (
                      <div className="warning-banner">
                        Warning: Displaying unsanitized content!
                      </div>
                    )}
                    <div
                      className={`comment-text ${showUnsanitized ? 'unsafe' : 'safe'}`}
                      dangerouslySetInnerHTML={{
                        __html: showUnsanitized
                          ? comment.comment
                          : sanitizeHTML(comment.comment)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="info-panel">
        <h4>What's happening?</h4>
        <ul>
          <li><strong>Real-time Validation:</strong> Fields are validated as you type</li>
          <li><strong>Clear Feedback:</strong> Specific error messages guide you</li>
          <li><strong>XSS Protection:</strong> DOMPurify sanitizes all HTML content</li>
          <li><strong>Safe by Default:</strong> Dangerous scripts and handlers are removed</li>
        </ul>
      </div>

      <style jsx>{`
        .validation-demo {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          max-width: 100%;
          margin: 0 auto;
          padding: 1rem;
        }

        .demo-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-section,
        .comments-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .demo-description {
          font-size: 0.875rem;
          opacity: 0.7;
          margin-bottom: 1rem;
        }

        .demo-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-weight: 600;
          font-size: 0.875rem;
          color: #e0e0e0;
        }

        textarea {
          padding: 0.75rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.2);
          color: #fff;
          font-size: 0.875rem;
          font-family: inherit;
          transition: all 0.2s;
          resize: vertical;
        }

        textarea:focus {
          outline: none;
          border-color: #4a9eff;
          background: rgba(0, 0, 0, 0.3);
        }

        textarea.error {
          border-color: #ff4444;
        }

        .error-message {
          color: #ff6b6b;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .char-count {
          font-size: 0.75rem;
          opacity: 0.6;
          text-align: right;
        }

        .button-group {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #4a9eff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #3a8eef;
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          background: rgba(74, 158, 255, 0.3);
          cursor: not-allowed;
        }

        .btn-danger {
          background: #ff4444;
          color: white;
        }

        .btn-danger:hover {
          background: #ee3333;
          transform: translateY(-1px);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .toggle input[type="checkbox"] {
          width: auto;
          height: auto;
          cursor: pointer;
        }

        .no-comments {
          text-align: center;
          padding: 2rem;
          opacity: 0.5;
          font-style: italic;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .comment-card {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .comment-time {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        .warning-banner {
          background: #ff4444;
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .comment-text {
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .comment-text.safe {
          border-left: 3px solid #4caf50;
          padding-left: 0.75rem;
        }

        .comment-text.unsafe {
          border-left: 3px solid #ff4444;
          padding-left: 0.75rem;
        }

        .info-panel {
          background: rgba(74, 158, 255, 0.1);
          border: 1px solid rgba(74, 158, 255, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .info-panel h4 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #4a9eff;
        }

        .info-panel ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .info-panel li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .demo-container {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
