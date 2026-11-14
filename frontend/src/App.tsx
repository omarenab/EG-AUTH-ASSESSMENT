import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import GlobalLoader from "./Components/shared/GlobalLoader";

function App() {
  const auth = useContext(AuthContext);
  return (
    <div>
      {auth?.isAuthLoading && <GlobalLoader />}
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
