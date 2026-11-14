import Button from "../Components/shared/Button";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { user, logout } = auth;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-white">
          Welcome to the application
        </h1>

        <span className="text-xl font-semibold text-violet-400">
          {user?.name}
        </span>

        <div className="mt-6 flex justify-center">
          <Button className="w-auto px-8 py-2" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
