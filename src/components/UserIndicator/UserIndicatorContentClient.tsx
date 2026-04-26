// we do not talk about this and we do not touch this

"use client";

import { ReactNode, useEffect, useState } from "react";
import "./styles.css";

const UserIndicatorContentClient = (props: {
  children: ReactNode
}) => {
  let [height, setHeight] = useState<number>();
  useEffect(() => {
    setHeight(document.querySelector<HTMLElement>(".container > *")?.offsetHeight);
  });

  return (
    <div className="container" style={{ height }}>
      {props.children}
    </div>
  );
};

export default UserIndicatorContentClient;
