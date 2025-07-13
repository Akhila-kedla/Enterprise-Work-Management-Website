import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { moveTask, addTask, removeTask, updateTask } from "./tasksSlice";

function TasksPage() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("Bug");
  const [newTaskPriority, setNewTaskPriority] = useState("Normal");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    type: "Bug",
    priority: "Normal",
    dueDate: "",
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId !== destination.droppableId ||
      source.index !== destination.index
    ) {
      const task = tasks[source.droppableId][source.index];
      dispatch(
        moveTask({
          source: source.droppableId,
          destination: destination.droppableId,
          task,
        })
      );
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      type: newTaskType,
      priority: newTaskPriority,
      dueDate: newTaskDueDate || new Date().toLocaleDateString(),
      status: "todo",
      file: null,
      comments: [],
    };

    dispatch(addTask(newTask));
    setNewTaskTitle("");
    setNewTaskType("Bug");
    setNewTaskPriority("Normal");
    setNewTaskDueDate("");
  };

  const handleDeleteTask = (taskId, col) => {
    dispatch(removeTask({ taskId, status: col }));
  };

  const handleMoveForward = (task, col) => {
    const nextStatus =
      col === "todo" ? "inProgress" : col === "inProgress" ? "done" : "done";

    dispatch(
      moveTask({
        source: col,
        destination: nextStatus,
        task,
      })
    );
  };

  const handleFileChange = (e, task, col) => {
    const file = e.target.files[0];
    const updatedTask = { ...task, file: file ? file.name : null };

    dispatch(updateTask({ task: updatedTask, status: col }));
  };

  const handleCommentSubmit = (e, task, col) => {
    e.preventDefault();
    const comment = commentInputs[task.id];
    if (!comment || comment.trim() === "") return;

    const updatedTask = {
      ...task,
      comments: [...(task.comments || []), comment],
    };

    dispatch(updateTask({ task: updatedTask, status: col }));
    setCommentInputs({ ...commentInputs, [task.id]: "" });
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditForm({
      title: task.title,
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...editingTask,
      ...editForm,
    };
    dispatch(updateTask({ task: updatedTask, status: editingTask.status }));
    setEditingTask(null);
  };

  const columns = ["todo", "inProgress", "done"];
  const columnTitles = {
    todo: "📝 To Do",
    inProgress: "⏳ In Progress",
    done: "✅ Done",
  };

  return (
    <div className="page-container p-6">
      <h1 className="page-header text-3xl mb-4 font-bold">Tasks Board</h1>

      <form
        onSubmit={handleAddTask}
        className="flex gap-4 mb-6 bg-gray-100 p-4 rounded"
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border p-2 rounded w-1/4"
          required
        />
        <select
          value={newTaskType}
          onChange={(e) => setNewTaskType(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Bug</option>
          <option>Feature</option>
          <option>Improvement</option>
        </select>
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="btn bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 p-4 rounded w-1/3 min-h-[500px]"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {columnTitles[col]}
                  </h2>
                  {tasks[col].map((task, index) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 mb-4 rounded shadow"
                        >
                          <p className="font-bold">{task.title}</p>
                          <p className="text-sm text-gray-600">
                            {task.type} | {task.priority}
                          </p>
                          <p className="text-sm">Due: {task.dueDate}</p>

                          <div className="mt-2">
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, task, col)}
                            />
                            {task.file && (
                              <p className="text-xs">Attached: {task.file}</p>
                            )}
                          </div>

                          <div className="mt-2">
                            <h4 className="text-sm font-semibold">Comments</h4>
                            <ul className="pl-4 list-disc">
                              {(task.comments || []).map((c, idx) => (
                                <li key={idx} className="text-sm">
                                  {c}
                                </li>
                              ))}
                            </ul>

                            <form
                              onSubmit={(e) =>
                                handleCommentSubmit(e, task, col)
                              }
                              className="flex gap-2 mt-2"
                            >
                              <input
                                type="text"
                                placeholder="Add comment"
                                value={commentInputs[task.id] || ""}
                                onChange={(e) =>
                                  setCommentInputs({
                                    ...commentInputs,
                                    [task.id]: e.target.value,
                                  })
                                }
                                className="border p-1 rounded w-full"
                              />
                              <button
                                type="submit"
                                className="bg-green-600 text-white px-2 rounded"
                              >
                                Add
                              </button>
                            </form>
                          </div>

                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleEditClick(task)}
                              className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id, col)}
                              className="bg-red-600 text-white px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                            {col !== "done" && (
                              <button
                                onClick={() => handleMoveForward(task, col)}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                              >
                                Move Forward
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded w-96 space-y-4"
          >
            <h2 className="text-xl font-semibold">Edit Task</h2>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
            <select
              value={editForm.type}
              onChange={(e) =>
                setEditForm({ ...editForm, type: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option>Bug</option>
              <option>Feature</option>
              <option>Improvement</option>
            </select>
            <select
              value={editForm.priority}
              onChange={(e) =>
                setEditForm({ ...editForm, priority: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Critical</option>
            </select>
            <input
              type="date"
              value={editForm.dueDate}
              onChange={(e) =>
                setEditForm({ ...editForm, dueDate: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
