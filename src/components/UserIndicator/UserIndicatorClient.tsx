"use client";

import { ReactNode, useState } from "react";

const UserIndicatorClient = (props: Record<string, any> & {
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false);

  return (
    <button className={`block${open ? " group open" : ""}`} onClick={(event) => {
      if (event.currentTarget) setOpen(!open);
    }}>
      {props.children}
    </button>
  );
};

export default UserIndicatorClient;
