import { Outlet } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider />
      <Outlet />
    </>
  );
}

export default App;
