import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="w-full min-h-screen bg-(--background) flex justify-center items-center px-4">
      {/* Forgot Password Card */}
      <div className="w-full max-w-md bg-(--card) border border-(--border) px-6 py-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-center text-(--text-heading) text-3xl font-bold">
            Forgot Password?
          </h1>

          <p className="text-center text-(--text-secondary) text-sm mt-2 leading-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
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

          {/* Reset Button */}
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
            "
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="
              text-(--secondary)
              hover:text-blue-400
              text-sm
              font-medium
              transition
            "
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
