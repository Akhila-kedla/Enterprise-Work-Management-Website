import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    {
      id: 1,
      name: "Project Alpha",
      description: "First project",
      tasks: [
        { id: 1, title: "Task A1", status: "done" },
        { id: 2, title: "Task A2", status: "todo" },
        { id: 3, title: "Task A3", status: "todo" },
      ],
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Second project",
      tasks: [
        { id: 4, title: "Task B1", status: "done" },
        { id: 5, title: "Task B2", status: "done" },
        { id: 6, title: "Task B3", status: "todo" },
      ],
    },
  ],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.projects[index] = action.payload;
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addTaskToProject: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        if (!project.tasks) project.tasks = [];
        project.tasks.push(task);
      }
    },
  },
});

export const { addProject, updateProject, deleteProject, addTaskToProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
