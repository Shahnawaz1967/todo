import express from 'express';
import {
  createProject,
  getProjects,
  getProjectDetails, 
  updateProjectTitle 
 
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { createTodo, updateTodo, deleteTodo } from '../controllers/projectController.js';
const router = express.Router();


router.route('/')
  .post(protect, createProject)
  .get(protect, getProjects);

router.route('/:projectId')
  .get(protect, getProjectDetails);  

  router.put("/:projectId/title", updateProjectTitle);
 
router.route('/:projectId/todos')
.post(protect, createTodo); 

router.route('/:projectId/todos/:todoId')
.put(protect, updateTodo) 
.delete(protect, deleteTodo);
export default router;