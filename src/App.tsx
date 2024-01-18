import "./App.css";
import routes from "@/routes/routes";
import { useRoutes } from "react-router-dom";

function App() {
  const content = useRoutes(routes);

  return <div>{content}</div>;
}

export default App;
