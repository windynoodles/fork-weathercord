"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import BoxButton from "../BoxButton/BoxButton";
import ConnectionsTab from "./ConnectionsTab";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal/Modal";
import ProfileTab from "./ProfileTab";
import { Puzzle, User, X } from "lucide-react";
import TabList, { Tab } from "../TabList/TabList";

export enum ModalTab {
  Profile = 0,
  Connections = 1
};

const tabList: Tab[] = [
  {
    icon: <User strokeWidth={1.5} />,
    name: "Profile"
  },
  {
    icon: <Puzzle strokeWidth={1.5} />,
    name: "Connections"
  }
];

const AccountSettingsModal = (props: {
  account: AuthorizedAccountFromAPI,
  closeModal: () => void,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>,
  startingTab?: ModalTab
}) => {
  let [tab, setTab] = useState(props.startingTab || ModalTab.Profile);

  return (
    <Modal className="w-65 h-40 flex gap-2 relative">
      <BoxButton className="absolute top-1 right-1 backdrop-blur-sm" onClick={props.closeModal}><X /></BoxButton>
      <TabList className="w-16 shrink-0 -m-2 p-2 pr-1 -mr-1 relative" tab={tab} tabList={tabList} setTab={setTab} />
      <div className="grow overflow-auto -m-2 p-2 pl-1 -ml-1">
        {tab === ModalTab.Profile &&
          <ProfileTab account={props.account} setAccount={props.setAccount} />
        }
        {tab === ModalTab.Connections &&
          <ConnectionsTab account={props.account} />
        }
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
