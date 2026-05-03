"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal/Modal";
import ProfileTab from "./ProfileTab";

export enum Tab {
  Profile = 0
};

const AccountSettingsModal = (props: {
  account: AuthorizedAccountFromAPI,
  closeModal: () => void,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>,
  startingTab?: Tab
}) => {
  let [tab, setTab] = useState(props.startingTab || Tab.Profile);

  return (
    <Modal className="w-65 h-40 flex gap-2">
      <div className="w-12">
        {Object.keys(Tab).map((t) => {
          if (isNaN(parseInt(t))) return (
            <button key={t} className={"w-full text-left rounded-xl cursor-pointer transition hover:bg-(--box-button-active)" + (Tab[tab] === t ? " text-(--accent) bg-(--accent-background)!" : "")} onClick={() => setTab(Tab[t as keyof typeof Tab])} style={{
              padding: "0.3rem 0.8rem"
            }}>{t}</button>
          )
        })}
      </div>
      <div className="grow overflow-auto -m-2 p-2">
        {tab === Tab.Profile &&
          <ProfileTab account={props.account} setAccount={props.setAccount} />
        }
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
