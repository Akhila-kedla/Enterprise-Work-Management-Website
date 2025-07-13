import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#3B82F6"];

function ReportsPage() {
  const projects = useSelector((state) => state.projects.projects) || [];

  const barData = projects.map((proj) => {
    const taskArray = Array.isArray(proj.tasks) ? proj.tasks : [];
    const completed = taskArray.filter((t) => t.status === "done").length;
    const pending = taskArray.length - completed;

    return {
      name: proj.name || "Unnamed Project",
      Completed: completed,
      Pending: pending,
    };
  });

  const totalCompleted = barData.reduce((acc, p) => acc + p.Completed, 0);
  const totalPending = barData.reduce((acc, p) => acc + p.Pending, 0);
  const pieData = [
    { name: "Completed", value: totalCompleted },
    { name: "Pending", value: totalPending },
  ];

  const lineData = [
    { month: "Jan", tasks: 30 },
    { month: "Feb", tasks: 45 },
    { month: "Mar", tasks: 28 },
    { month: "Apr", tasks: 50 },
    { month: "May", tasks: 42 },
    { month: "Jun", tasks: 60 },
  ];

  return (
    <div className="page-container">
      <h1 className="page-header">📊 Reporting & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card animate-fadeInUp">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Project Completion Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Completed" fill="#10B981" />
              <Bar dataKey="Pending" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card animate-fadeInUp delay-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Overall Tasks Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card mt-10 animate-fadeInUp delay-400">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Tasks Created Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReportsPage;
