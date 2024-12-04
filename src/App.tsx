// import Signin from "./Pages/Signin";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import DashBoard from "./Pages/DashBoard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster />
    </>
  );
}

export default App;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
]);
