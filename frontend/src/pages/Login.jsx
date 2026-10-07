import { useState } from "react";
// import {
//   GoogleLogin,
// } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const Login = () => {
  const { login } = useAuth();
  // Navigate
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error State
  const [error, setError] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  // Handle Input Submit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });
      console.log("Login Response", response);
      navigate("/");
    } catch (error) {
      console.error("Login Error", error);
      setError(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSuccess =
  // async (credentialResponse) => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/auth/google",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type":
  //             "application/json",
  //         },
  //         body: JSON.stringify({
  //           credential:
  //             credentialResponse.credential,
  //         }),
  //       }
  //     );

  //     const data =
  //       await response.json();

  //     if (!response.ok) {
  //       throw new Error(
  //         data.message ||
  //           "Google login failed"
  //       );
  //     }

  //     localStorage.setItem(
  //       "token",
  //       data.token
  //     );

  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify(data.user)
  //     );

  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error(
  //       error
  //     );
  //   }
  // };
  return (
    <div className="w-full min-h-screen bg-(--background) flex justify-center items-center px-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-(--card) border border-(--border) px-6 py-7 rounded-2xl shadow-xl">
        {/* Login Header */}
        <div className="mb-6">
          <h1 className="text-center text-(--text-heading) text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-center text-(--text-secondary) text-sm mt-2">
            Login to continue to{" "}
            <span className="text-(--accent) font-medium">SnapGrid</span>
          </p>
        </div>
        {/* Errors */}
        {error && (
          <div className="mb-5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label
              className="block text-(--text-primary) text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="
                w-full
                bg-(--input)
                border border-(--border)
                text-(--text-primary)
                placeholder:text-(--text-muted)
                outline-none
                px-3
                py-2.5
                rounded-lg
                transition
                focus:border-(--primary)
                focus:ring-2
                focus:ring-(--primary)/20
              "
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-(--text-primary) text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="
                w-full
                bg-(--input)
                border border-(--border)
                text-(--text-primary)
                placeholder:text-(--text-muted)
                outline-none
                px-3
                py-2.5
                rounded-lg
                transition
                focus:border-(--primary)
                focus:ring-2
                focus:ring-(--primary)/20
              "
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center -mt-2 text-sm">
            <label className="flex items-center gap-2 text-(--text-secondary) cursor-pointer">
              <input
                type="checkbox"
                className="
                  accent-(--primary)
                  cursor-pointer
                "
              />

              <span>Remember me</span>
            </label>

            <Link
              to={"/forgot-password"}
              className="text-(--secondary) hover:text-blue-400 cursor-pointer transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              bg-(--primary)
              hover:bg-(--primary-hover)
              text-white
              py-2.5
              rounded-lg
              font-semibold
              cursor-pointer
              transition
              shadow-lg
              shadow-(--primary)/20
              mb-4
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

{/* <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() =>
    console.error(
      "Google Login Failed"
    )
  }
/> */}

        {/* Signup */}
        <p className="text-center text-sm text-(--text-secondary) mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-(--accent) hover:text-pink-400 font-medium cursor-pointer transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
