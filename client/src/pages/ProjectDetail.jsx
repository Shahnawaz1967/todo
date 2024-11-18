import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProjectDetails,
  createTodo,
  updateTodo,
  deleteTodo,
  updateProjectTitle,
} from "../utils/api";
import { exportGist } from "../utils/gistGithub";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { MdOutlineDeleteOutline } from "react-icons/md";
// import { IoArrowBackOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import TodoItem from "../components/TodoItem"; // Import TodoItem component

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [gistData, setGistData] = useState(null);
  const [description, setDescription] = useState("");


  useEffect(() => {
    if (todoToEdit) {
      setDescription(todoToEdit.description);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim()) {
      if (todoToEdit) {
        onUpdate(todoToEdit._id, { description });
      } else {
        handleAddTodo({ description });
      }
      setDescription("");
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectDetails(projectId);
        setProject(data);
        setNewTitle(data.title);
        setLoading(false);
      } catch (err) {
        setError("Failed to load project details.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(projectId, newTodo);
      setProject((prevProject) => ({
        ...prevProject,
        todos: [...prevProject.todos, createdTodo],
      }));
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleUpdateTodo = async (todoId, updatedData) => {
    try {
      const updatedTodo = await updateTodo(projectId, todoId, updatedData);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.map((todo) =>
          todo._id === todoId ? updatedTodo : todo
        ),
      }));
      setTodoToEdit(null);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(projectId, todoId);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.filter((todo) => todo._id !== todoId),
      }));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    try {
      if (!newTitle || newTitle.trim() === "") {
        throw new Error("Title cannot be empty");
      }

      const updatedProject = await updateProjectTitle(projectId, newTitle);
      setProject((prev) => ({
        ...prev,
        title: updatedProject.project.title,
      }));
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Failed to update project title:", error);
      alert("Failed to update project title. Please try again.");
    }
  };

  const handleExportGist = async () => {
    setIsExporting(true);
    try {
      if (!project || !project.title || !Array.isArray(project.todos)) {
        alert("Project data is incomplete. Cannot export Gist.");
        setIsExporting(false);
        return;
      }
      if (project.todos.length === 0) {
        alert("No todos available to export.");
        setIsExporting(false);
        return;
      }
      const { url } = await exportGist(project.title, project.todos);
      setGistData({ url });
      setExportModal(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to export Gist. Please try again.";
      alert(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  const closeModal = () => {
    setExportModal(false);
    setGistData(null);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <>
    <div className="bg-emerald-50 min-h-screen p-8">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Project Details</h2>
        {isEditingTitle ? (
          <>
            <input
              type="text"
              name="title"
              value={newTitle}
              onChange={handleTitleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Project Title"
            />

            <button

              onClick={handleSaveTitle}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
              Save Changes
            </button>
          </>

        ) : (
          <div>
            <h3 className="font-bold">{project.title}</h3>
            <div className="mt-4">
              <button
                onClick={handleEditTitle}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              {/* <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
              >
                Delete
              </button> */}
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        <div className="mt-6">
          <button
            onClick={handleExportGist}
            disabled={isExporting}
            className={`bg-green-500 text-white px-4 py-2 rounded ${isExporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isExporting ? "Exporting..." : "Export Gist"}
          </button>
          <h4 className="text-lg font-bold mb-2">Todo List</h4>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Add a new todo"
            />
            <button
              type="submit"

              className="px-4 py-2 bg-emerald-500 text-white rounded mt-2"
            >
              {todoToEdit ? "Update-Todo" : "Add-Todo"}
            </button>
          </form>

          {/* Display Todo Items */}
          {project.todos.length === 0 ? (
            <p>No todos available.</p>
          ) : (
            project.todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                handleUpdateTodo={handleUpdateTodo}

                deleteTodo={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
    {exportModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
    <div className="relative bg-white p-6 rounded shadow-md text-center w-96">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
      >
        <IoClose />
      </button>
      <h2 className="text-xl font-bold mb-4">Successfully Exported as Gist</h2>
      <p className="mb-4">Your project has been successfully exported as a Gist. You can open it to view or download it in Markdown format.</p>
      <div className="flex justify-center space-x-4">
        <a
          href={gistData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 text-white hover:bg-blue-700 hover:text-white px-4 py-2 rounded-xl"
        >
          Preview Gist
        </a>
        <a
          href={`${gistData.url}/download`}
          download
          className="bg-emerald-600 text-white hover:bg-emerald-400 hover:text-black px-4 py-2 rounded-xl"
        >
          Save as Markdown File
        </a>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ProjectDetail;
