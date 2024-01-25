import Home from "@/pages";
import Dashboard from "@/pages/dashboard";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default routes;
