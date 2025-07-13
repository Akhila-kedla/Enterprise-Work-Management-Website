import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {
    todo: [],
    inProgress: [],
    done: [],
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = action.payload;
      state.tasks[task.status].push(task);
    },

    removeTask: (state, action) => {
      const { taskId, status } = action.payload;
      state.tasks[status] = state.tasks[status].filter(
        (task) => task.id !== taskId
      );
    },

    updateTask: (state, action) => {
      const { task, status } = action.payload;
      state.tasks[status] = state.tasks[status].map((t) =>
        t.id === task.id ? task : t
      );
    },

    moveTask: (state, action) => {
      const { source, destination, task } = action.payload;

      state.tasks[source] = state.tasks[source].filter((t) => t.id !== task.id);

      const updatedTask = { ...task, status: destination };

      state.tasks[destination].push(updatedTask);
    },
  },
});

export const { addTask, removeTask, updateTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
