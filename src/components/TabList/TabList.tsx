"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface Tab {
  icon: ReactNode;
  name: string;
}

const TabList = (props: {
  tab: number,
  tabList: Tab[],
  setTab: Dispatch<SetStateAction<number>>
}) => {
  const tabs = Object.keys(props.tabList).filter((value) => isNaN(parseInt(value))).length - 1;

  let [hoveredTab, setHoveredTab] = useState(tabs + 1);
  let [tabY, setTabY] = useState(1);

  requestAnimationFrame(() => {
    if (Math.abs(hoveredTab - tabs - tabY) > 0.0000001) setTabY(tabY + (hoveredTab - tabs - tabY) / 3);
  });

  return <div className="w-16 shrink-0 -m-2 p-2 pr-1 -mr-1 overflow-auto relative">
    <div className="rounded-xl absolute" style={{
      width: `calc(100% - 3rem - ${Math.abs(hoveredTab - tabs - tabY)}rem * 7)`,
      height: `calc(1lh + 0.8rem + ${Math.abs(hoveredTab - tabs - tabY)}rem * 2)`,
      left: "8.5rem",
      top: `calc((1lh + 0.8rem) * ${tabY} + (0.5lh + 0.2rem))`,
      translate: "-50% -50%",
      transition: "width 0.2s, height 0.25s, top 0.1s, background-color 0.3s",
      backgroundColor: props.tab === (hoveredTab - tabs - 1) ? "var(--accent-background)" : "var(--box-button-active)"
    }} />
    <div className="contents" onMouseLeave={() => setHoveredTab(props.tab + tabs + 1)}>
      {props.tabList.map((t, index) => {
        return (
          <button key={index} onMouseEnter={() => setHoveredTab(index)} className={"w-full text-left cursor-pointer transition relative z-1 flex items-center text-(--sub) hover:text-inherit" + (props.tabList[props.tab] === t ? " text-(--accent)!" : "")} onClick={() => props.setTab(index)} style={{
            gap: "0.4rem",
            padding: "0.4rem"
          }}>{t.icon}{t.name}</button>
        );
      })}
    </div>
  </div>
};

export default TabList;
