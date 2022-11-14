import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Notebook } from "../reusables/Notebook";
import { SignIn } from "../reusables/SignIn";
import { SignUp } from "../reusables/SignUp";
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Default</div>,
  },
  { path: "auth/signIn", element: <SignIn /> },
  { path: "auth/signUp", element: <SignUp /> },
  {
    path: "user/:userId/*",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  { path: "public/:notebookId", element: <Notebook isCheckPublic={true} /> },
]);

export default router;
