
import axios from "axios";
const API_URL = "https://todo-waxj.onrender.com/api"


const getAuthToken = () => {
  return localStorage.getItem("token");
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await api.post("/projects", projectData);
  return data;
};

export const getProjectDetails = async (projectId) => {
  const { data } = await api.get(`/projects/${projectId}`);
  return data;
};

export const createTodo = async (projectId, todoData) => {
  const { data } = await api.post(`/projects/${projectId}/todos`, todoData);
  return data;
};

export const updateTodo = async (projectId, todoId, todoData) => {
  const { data } = await api.put(`/projects/${projectId}/todos/${todoId}`, todoData);
  return data;
};

export const deleteTodo = async (projectId, todoId) => {
  const { data } = await api.delete(`/projects/${projectId}/todos/${todoId}`);
  return data;
};


export const updateProjectTitle = async (projectId, title) => {

  console.log("Project ID:", projectId); 
  console.log("Title to update:", title); 
  if (typeof title !== "string") {
    throw new TypeError("Title must be a string");
  }
  const { data } = await api.put(`/projects/${projectId}/title`, { title });
  return data;
};