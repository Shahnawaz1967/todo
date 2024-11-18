import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // Calculate the number of completed todos and total todos
  const completedTodos = project.todos.filter(todo => todo.completed).length;
  const totalTodos = project.todos.length;

  // Format the created date (optional, you can format it as you like)
  const createdDate = new Date(project.createdAt);
  const formattedDate = createdDate.toLocaleDateString();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="font-bold">{project.title}</h3>
      <p className="text-sm text-gray-600">Created on: {formattedDate}</p>

      <div className="mt-2">
        <p className="text-sm">
          {completedTodos} / {totalTodos} Todos Completed
        </p>
      </div>

      <div className="mt-4">
        <Link to={`/projects/${project._id}`} className="text-blue-500">
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
