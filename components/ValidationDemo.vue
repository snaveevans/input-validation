<script setup lang="ts">
import { ref, computed } from 'vue';
import DOMPurify from 'isomorphic-dompurify';

interface Comment {
  comment: string;
  timestamp: Date;
}

const commentText = ref('');
const error = ref('');
const submittedComments = ref<Comment[]>([]);
const showUnsanitized = ref(false);

const validateComment = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'Comment is required';
  }
  if (value.length < 10) {
    return 'Comment must be at least 10 characters';
  }
  if (value.length > 500) {
    return 'Comment must be less than 500 characters';
  }
  return undefined;
};

const validateField = () => {
  error.value = validateComment(commentText.value) || '';
};

const handleSubmit = () => {
  const validationError = validateComment(commentText.value);
  if (!validationError) {
    submittedComments.value.push({
      comment: commentText.value,
      timestamp: new Date()
    });
    commentText.value = '';
    error.value = '';
  } else {
    error.value = validationError;
  }
};

const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href']
  });
};

const insertXSSExample = () => {
  commentText.value = '<img src=x onerror="alert(\'XSS Attack!\')">';
  validateField();
};

const isFormValid = computed(() => {
  return commentText.value.trim() !== '' && !error.value;
});
</script>

<template>
  <div class="validation-demo">
    <div class="demo-container">
      <div class="form-section">
        <h3>Comment Form</h3>
        <p class="demo-description">
          Try entering invalid data or click the XSS button to test sanitization
        </p>

        <form @submit.prevent="handleSubmit" class="demo-form">
          <div class="form-group">
            <label for="comment">Comment</label>
            <textarea
              id="comment"
              v-model="commentText"
              @blur="validateField"
              @input="validateField"
              rows="4"
              placeholder="Enter your comment (min 10 characters)"
              :class="{ error: error }"
            />
            <span v-if="error" class="error-message">{{ error }}</span>
            <span class="char-count">{{ commentText.length }} / 500</span>
          </div>

          <div class="button-group">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!isFormValid"
            >
              Submit Comment
            </button>
            <button
              type="button"
              class="btn-danger"
              @click="insertXSSExample"
            >
              Insert XSS Payload
            </button>
          </div>
        </form>
      </div>

      <div class="comments-section">
        <div class="section-header">
          <h3>Submitted Comments</h3>
          <label class="toggle">
            <input type="checkbox" v-model="showUnsanitized" />
            <span>Show Unsanitized (Dangerous!)</span>
          </label>
        </div>

        <div v-if="submittedComments.length === 0" class="no-comments">
          No comments yet. Try submitting one!
        </div>

        <div v-else class="comments-list">
          <div
            v-for="(comment, index) in submittedComments"
            :key="index"
            class="comment-card"
          >
            <div class="comment-header">
              <strong>User</strong>
              <span class="comment-time">
                {{ comment.timestamp.toLocaleTimeString() }}
              </span>
            </div>
            <div class="comment-body">
              <div v-if="showUnsanitized" class="warning-banner">
                Warning: Displaying unsanitized content!
              </div>
              <div
                v-if="showUnsanitized"
                v-html="comment.comment"
                class="comment-text unsafe"
              />
              <div
                v-else
                v-html="sanitizeHTML(comment.comment)"
                class="comment-text safe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <h4>What's happening?</h4>
      <ul>
        <li><strong>Real-time Validation:</strong> Fields are validated as you type</li>
        <li><strong>Clear Feedback:</strong> Specific error messages guide you</li>
        <li><strong>XSS Protection:</strong> DOMPurify sanitizes all HTML content</li>
        <li><strong>Safe by Default:</strong> Dangerous scripts and handlers are removed</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
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

input,
textarea {
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 0.875rem;
  transition: all 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4a9eff;
  background: rgba(0, 0, 0, 0.3);
}

input.error,
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
</style>
