import "./App.css";
import routes from "@/routes/routes";
import { useRoutes } from "react-router-dom";
import AppLayout from "./components/shared/layout";

function App() {
  const content = useRoutes(routes);

  return (
    <div>
      <AppLayout>{content}</AppLayout>
    </div>
  );
}

export default App;
