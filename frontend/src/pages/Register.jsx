import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  // Navigate
  const navigate = useNavigate();
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  // Error State
  const [error, setError] = useState("");
  // Loading State
  const [loading, setLoading] = useState(false);
  // Terms State
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword, fullName } = formData;

    // Frontend Validation
    if (!username || !email || !password || !confirmPassword || !fullName) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        username,
        email,
        password,
        fullName,
      });
      console.log("Register Response", response);

      navigate("/");
    } catch (error) {
      console.error("Register Error", error);
      setError(error.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen bg-(--background) flex justify-center items-center px-4 py-8">
      {/* Register Card */}
      <div className="w-full max-w-md bg-(--card) border border-(--border) px-6 py-7 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-center text-(--text-heading) text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-center text-(--text-secondary) text-sm mt-2">
            Join <span className="text-(--accent) font-medium">SnapGrid</span>{" "}
            and start sharing
          </p>
        </div>

        {/* Errors */}
        {error && (
          <div className="mb-5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-(--text-primary) text-sm font-medium mb-2"
            >
              Full Name
            </label>

            <input
              value={formData.fullName}
              name="fullName"
              onChange={handleChange}
              type="text"
              id="username"
              placeholder="Enter your username"
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
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-(--text-primary) text-sm font-medium mb-2"
            >
              Username
            </label>

            <input
              value={formData.username}
              name="username"
              onChange={handleChange}
              type="text"
              id="username"
              placeholder="Enter your username"
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
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-(--text-primary) text-sm font-medium mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-(--text-primary) text-sm font-medium mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              autoComplete="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
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
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-(--text-primary) text-sm font-medium mb-2"
            >
              Confirm Password
            </label>

            <input
              type="password"
              autoComplete="confirm-password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-(--text-secondary) cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 accent-(--primary) cursor-pointer"
            />

            <span>
              I agree to the{" "}
              <span className="text-(--secondary)">Terms & Conditions</span>
            </span>
          </label>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
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
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-(--text-secondary) mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-(--accent) hover:text-pink-400 font-medium transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
