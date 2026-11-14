import { Link, Navigate, useNavigate } from "react-router-dom";
import SignupForm from "../Components/main/SignUpForm";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { isAuthenticated, isLoading } = auth;

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/80 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="mt-2 text-gray-400">Join us and get started</p>
        </div>

        <SignupForm onSuccess={() => navigate("/home")} />
        <div className="mt-2  text-gray-400">
          <p className="mb-1 mt-2 text-md font-medium text-gray-300">
            Password must contains 
          </p>
          <div className="text-xs">
          <ul>
            <li>• At least 8 characters</li>
            <li>• At least least one letter</li>
            <li>• At least one number</li>
            <li>• At least one special character (!@#$%^&*)</li>
          </ul>
            </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-violet-400 hover:text-violet-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
