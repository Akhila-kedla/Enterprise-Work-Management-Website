import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const navigate = useNavigate();

  // ✅ Validation schema
  const schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
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
    // ✅ Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if email already exists
    const existingUser = users.find((u) => u.email === data.email);

    if (existingUser) {
      setError("email", {
        type: "manual",
        message: "❌ Email already registered",
      });
      return;
    }

    // ✅ Add new user
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("🎉 Signup successful! Redirecting to login...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // ✅ Redirect to login page
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="hero-section">
      <div className="signup-card">
        <h1 className="text-center mb-4">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="form-group">
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
