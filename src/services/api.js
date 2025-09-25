import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Task API functions
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTask = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

// Comment API functions
export const getComments = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}/comments`);
  return response.data;
};

export const getComment = async (commentId) => {
  const response = await api.get(`/comments/${commentId}`);
  return response.data;
};

export const createComment = async (taskId, commentData) => {
  const response = await api.post(`/tasks/${taskId}/comments`, commentData);
  return response.data;
};

export const updateComment = async (commentId, commentData) => {
  const response = await api.put(`/comments/${commentId}`, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};