import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("token", "mock-token");

      toast.success("🎉 Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      setError("general", {
        type: "manual",
        message: "❌ Invalid email or password",
      });
    }
  };

  return (
    <div className="hero-section">
      <div className="login-card">
        <h1 className="text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.general && (
            <div className="mb-4 text-center text-red-700">
              {errors.general.message}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="input-field"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="input-field"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
