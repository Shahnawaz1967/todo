// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { createProject, getProjects } from "../utils/api";
// import ProjectCard from "../components/ProjectCard"; 

// const ProjectPage = () => {
//   const { user, logout } = useContext(AuthContext); 
//   const [projects, setProjects] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();


//   // Retrieve projects from localStorage on component mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       if (!user) {
//         setProjects([]);
//         return;
//       }
//       try {
//         const data = await getProjects(user.token); 
//         setProjects(data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };

//     fetchProjects();
//   }, [user]);

  
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const projectData = { title, description };
//       await createProject(projectData); 
//       navigate("/project-page"); 
//     } catch (err) {
//       setError(err.response?.data?.message || "Project creation failed");
//     }
//   };


//   return (
//     <div className="bg-emerald-50 min-h-screen p-8">
//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         <div className="bg-white p-6 shadow-lg rounded-lg">
//           <h2 className="text-lg font-bold">Create a New Project</h2>
//           <p>Organize your tasks in a dedicated project.</p>
//           {user ? (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   name="title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Project Title"
//                   className="w-full p-2 border rounded mb-2"
//                 />
//                 <textarea
//                   name="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Project Description"
//                   className="w-full p-2 border rounded mb-4"
//                 />
//                 <button
//                   type="submit"
//                   // disabled={loading}
//                   className="w-full px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <p className="mt-4 text-red-500">Login to create a project.</p>
//           )}
//         </div>
//       </div>

//       {/* Display the newly created projects */}
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {projects.map((project) => (
//           <ProjectCard key={project._id} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectPage;
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createProject, getProjects } from "../utils/api";
import ProjectCard from "../components/ProjectCard";

const ProjectPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch projects when the component mounts or when the user changes
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        return;
      }
      try {
        const data = await getProjects(user.token); 
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user]);

  // Handle project creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { title, description };
      const newProject = await createProject(projectData, user.token); 
      
      // Add the new project to the state
      setProjects((prevProjects) => [newProject, ...prevProjects]);

      // Clear the form fields
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Project creation failed");
    }
  };

  return (
    <div className="bg-emerald-50 min-h-screen p-8">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold">Create a New Project</h2>
          <p>Organize your tasks in a dedicated project.</p>
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Project Title"
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project Description"
                  className="w-full p-2 border rounded mb-4"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                >
                  Create Project
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-4 text-red-500">Login to create a project.</p>
          )}
        </div>
      </div>

      {/* Display the newly created projects */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p>No projects found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
