import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import LoginForm from "./features/auth/components/LoginForm";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default App;
