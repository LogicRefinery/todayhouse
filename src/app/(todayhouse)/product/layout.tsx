import React from "react";
import Nav from "./_components/Nav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default layout;
