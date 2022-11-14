import React from "react";
import "./App.css";
import Layout from "antd/lib/layout";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes/routes";
import { UserContexProvider } from "./contexts/user";
import { NotebookContexProvider } from "./contexts/notebooks";

function App() {
  return (
    <Layout
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <UserContexProvider>
        <NotebookContexProvider>
          <RouterProvider router={router}></RouterProvider>
        </NotebookContexProvider>
      </UserContexProvider>
    </Layout>
  );
}

export default App;
