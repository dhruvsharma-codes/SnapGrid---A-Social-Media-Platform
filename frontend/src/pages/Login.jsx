

// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";

// const inputClass =
//   "w-full bg-(--input) border border-(--border) text-(--text-primary) placeholder:text-(--text-muted) outline-none px-3 py-2.5 rounded-lg transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 disabled:opacity-60";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // go back to the page the user tried to open (if a guard passed it)
//   const redirectTo = location.state?.from?.pathname || "/";

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [remember, setRemember] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return; // block double submit

//     setError("");

//     const email = formData.email.trim();
//     const { password } = formData;

//     if (!email || !password) {
//       setError("Email and Password are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await login({ email, password, remember });
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       console.error("Login Error", err);
//       setError(err.message || "Login Failed");
//       setLoading(false); // only reset on failure; we navigate away on success
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-(--background) flex justify-center items-center px-4">
//       <div className="w-full max-w-md bg-(--card) border border-(--border) px-6 py-7 rounded-2xl shadow-xl">
//         <div className="mb-6">
//           <h1 className="text-center text-(--text-heading) text-3xl font-bold">
//             Welcome Back
//           </h1>
//           <p className="text-center text-(--text-secondary) text-sm mt-2">
//             Login to continue to{" "}
//             <span className="text-(--accent) font-medium">SnapGrid</span>
//           </p>
//         </div>

//         {error && (
//           <div
//             role="alert"
//             className="mb-5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
//           >
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <div>
//             <label
//               className="block text-(--text-primary) text-sm font-medium mb-2"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               className={inputClass}
//               type="email"
//               id="email"
//               name="email"
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={loading}
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label
//               className="block text-(--text-primary) text-sm font-medium mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               className={inputClass}
//               type="password"
//               id="password"
//               name="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={loading}
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="flex justify-between items-center -mt-2 text-sm">
//             <label className="flex items-center gap-2 text-(--text-secondary) cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={remember}
//                 onChange={(e) => setRemember(e.target.checked)}
//                 className="accent-(--primary) cursor-pointer"
//               />
//               <span>Remember me</span>
//             </label>

//             <Link
//               to="/forgot-password"
//               className="text-(--secondary) hover:text-blue-400 transition"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-(--primary) hover:bg-(--primary-hover) text-white py-2.5 rounded-lg font-semibold cursor-pointer transition shadow-lg shadow-(--primary)/20 mb-4 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-(--text-secondary) mt-6">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-(--accent) hover:text-pink-400 font-medium transition"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



















import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { warmUpServer } from "../services/api.js";
import { preloadHome } from "../routes/preload.js";

const inputClass =
  "w-full bg-(--input) border border-(--border) text-(--text-primary) placeholder:text-(--text-muted) outline-none px-3 py-2.5 rounded-lg transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 disabled:opacity-60";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // go back to the page the user tried to open (if a guard passed it)
  const redirectTo = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);

  // while the user types: wake the server + download the Home page code
  useEffect(() => {
    warmUpServer();
    preloadHome();
  }, []);

  // if login takes long, tell the user instead of looking frozen
  useEffect(() => {
    if (!loading) {
      setSlow(false);
      return;
    }

    const timer = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // block double submit

    setError("");

    const email = formData.email.trim();
    const { password } = formData;

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      setLoading(true);
      await login({ email, password, remember });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login Error", err);
      setError(err.message || "Login Failed");
      setLoading(false); // only reset on failure; we navigate away on success
    }
  };

  return (
    <div className="w-full min-h-screen bg-(--background) flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-(--card) border border-(--border) px-6 py-7 rounded-2xl shadow-xl">
        <div className="mb-6">
          <h1 className="text-center text-(--text-heading) text-3xl font-bold">
            Welcome Back
          </h1>
          <p className="text-center text-(--text-secondary) text-sm mt-2">
            Login to continue to{" "}
            <span className="text-(--accent) font-medium">SnapGrid</span>
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              className="block text-(--text-primary) text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={inputClass}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              className="block text-(--text-primary) text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={inputClass}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center -mt-2 text-sm">
            <label className="flex items-center gap-2 text-(--text-secondary) cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-(--primary) cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-(--secondary) hover:text-blue-400 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--primary) hover:bg-(--primary-hover) text-white py-2.5 rounded-lg font-semibold cursor-pointer transition shadow-lg shadow-(--primary)/20 mb-4 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {slow && (
            <p role="status" className="-mt-2 text-center text-xs text-(--text-secondary)">
              Server start ho raha hai, 20-30 second lag sakte hain...
            </p>
          )}
        </form>

        <p className="text-center text-sm text-(--text-secondary) mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-(--accent) hover:text-pink-400 font-medium transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;