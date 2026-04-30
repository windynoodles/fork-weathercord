"use client";

import { useState } from "react";

const UsernameIDSwitcher = (props: {
  id: string
  username: string
}) => {
  const [toggled, setToggle] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  return (
    <button
      onMouseDown={() => {
        setDragging(false);
        setMouseDown(true);
      }}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={() => setDragging(mouseDown)}
      onClick={() => !dragging && setToggle(!toggled)}
      className="leading-[1em] box-content text-left select-text inline-block h-[1em] overflow-hidden"
      style={{
        cursor: dragging ? "auto" : "pointer"
      }}
    ><div className="transition" style={{
      translate: `0 ${toggled ? "-1em" : "0em"}`
    }}><span style={{
      userSelect: toggled ? "none" : "text"
    }}>@{props.username}</span><br className="select-none" /><code style={{
      userSelect: toggled ? "text" : "none"
    }}>{props.id}</code></div></button>
  )
}

export default UsernameIDSwitcher;
