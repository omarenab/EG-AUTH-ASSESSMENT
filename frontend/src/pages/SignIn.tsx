
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../Components/main/LoginForm";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const SignIn = () => {
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
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-400">
            Sign in to continue to your account
          </p>
        </div>

        <LoginForm onSuccess={() => navigate("/home")} />

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-violet-400 hover:text-violet-300"
          >
            Sign up
          </Link>
        </p>

      </div>
    </main>
  );
};

export default SignIn;
