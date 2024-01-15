import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { router } from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
