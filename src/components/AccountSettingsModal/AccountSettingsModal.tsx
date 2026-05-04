"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import BoxButton from "../BoxButton/BoxButton";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal/Modal";
import ProfileTab from "./ProfileTab";
import { X } from "lucide-react";

export enum Tab {
  Profile = 0,
  Connections = 1
};

const AccountSettingsModal = (props: {
  account: AuthorizedAccountFromAPI,
  closeModal: () => void,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>,
  startingTab?: Tab
}) => {
  let [tab, setTab] = useState(props.startingTab || Tab.Profile);

  return (
    <Modal className="w-65 h-40 flex gap-2 relative">
      <BoxButton className="absolute top-1 right-1 backdrop-blur-sm" onClick={props.closeModal}><X /></BoxButton>
      <div className="w-15 shrink-0 -m-2 p-2 pr-1 -mr-1 overflow-auto">
        {Object.keys(Tab).map((t) => {
          if (isNaN(parseInt(t))) return (
            <button key={t} className={"w-full text-left rounded-xl cursor-pointer transition hover:bg-(--box-button-active)" + (Tab[tab] === t ? " text-(--accent) bg-(--accent-background)!" : "")} onClick={() => setTab(Tab[t as keyof typeof Tab])} style={{
              padding: "0.3rem 0.8rem"
            }}>{t}</button>
          )
        })}
      </div>
      <div className="grow overflow-auto -m-2 p-2 pl-1 -ml-1">
        {tab === Tab.Profile &&
          <ProfileTab account={props.account} setAccount={props.setAccount} />
        }
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
