import LoginView from "@/View/login";
import Header from "@/layout/header";
import React from "react";

const login = () => {
  return (
    <>
      <Header />
      <main class="main" style={{ display: "flex", justifyContent: "center" }}>
        <LoginView />
      </main>
    </>
  );
};

export default login;
