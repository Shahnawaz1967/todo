
// Create a new project
import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  const { title } = req.body;
  try {
    const project = new Project({ title, user: req.user._id });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProjectDetails = async (req, res) => {
  const { projectId } = req.params; 
  try {
    const project = await Project.findById(projectId); 
    if (!project) {
      return res.status(404).json({ message: 'Project not found' }); 
    }
    res.status(200).json(project); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};


export const updateProjectTitle = async (req, res) => {
  const { projectId } = req.params;
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { title },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project title updated successfully", project });
  } catch (error) {
    console.error("Error updating project title:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req, res) => {
  const { projectId } = req.params;
  const { description } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const newTodo = {
      description,
      status: 'pending', 
      createdAt: new Date(),
    };

    project.todos.push(newTodo);
    await project.save();

    res.status(201).json(newTodo); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateTodo = async (req, res) => {
  const { projectId, todoId } = req.params;
  const { description, status } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const todo = project.todos.id(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

  
    if (description) todo.description = description;
    if (status) todo.status = status;

    await project.save(); 

    res.status(200).json(todo); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteTodo = async (req, res) => {
  const { projectId, todoId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    
    const todoIndex = project.todos.findIndex((todo) => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    project.todos.splice(todoIndex, 1); 
    await project.save();

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(400).json({ message: error.message });
  }
};