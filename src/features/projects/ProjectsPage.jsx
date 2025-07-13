import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject, updateProject, deleteProject } from "./projectsSlice";
import { toast } from "react-toastify";

function ProjectsPage() {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const handleAdd = () => {
    if (!newProject.name.trim() || !newProject.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const id = Date.now();
    dispatch(addProject({ ...newProject, id }));
    toast.success("✅ Project added successfully");
    setNewProject({ name: "", description: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
    toast.success("🗑️ Project deleted");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Projects</h1>

      <div className="bg-white p-6 rounded shadow mb-8 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="border border-gray-300 focus:ring focus:ring-blue-200 p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="border border-gray-300 focus:ring focus:ring-blue-200 p-3 rounded w-full"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded shadow"
          >
            Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {project.name}
            </h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <button
              onClick={() => handleDelete(project.id)}
              className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded shadow"
            >
              Delete
            </button>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No projects available. Add one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
