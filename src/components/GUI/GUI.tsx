"use client";

import AccountSettingsModal, { modalTabURLNames } from "../AccountSettingsModal/AccountSettingsModal";
import { AuthorizedAccountFromAPI } from "@/db/schema";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ModalType } from "@/lib/modals";
import { Prompt } from "../Prompt/Prompt";
import { setl10nData } from "../DefaultMessage/localize";
import SignUpModal from "../SignUpModal/SignUpModal";
import { useEffect, useState } from "react";
import UserIndicator from "../UserIndicator/UserIndicator";

const GUI = () => {
  const [account, setAccount] = useState<AuthorizedAccountFromAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalType | null>(null);
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  useEffect(() => {
    fetch("/whoami")
      .then((res) => res.json())
      .then((account) => {
        setAccount(account);
        setl10nData(account.lang)
          .then(() => setLoading(false));
      });

    if (location.pathname.startsWith("/settings")) {
      const tabName = location.pathname.match(/^\/settings\/?(.+)$/)?.[1]!;
      const tabIndex = modalTabURLNames.includes(tabName) ? modalTabURLNames.indexOf(tabName) : 0;
      setInitialAccountSettingsTab(tabIndex);
      history.replaceState(null, "", "/settings/" + modalTabURLNames[tabIndex]);
      setModal(ModalType.AccountSettings);
    }
  }, [0]);

  if (!account || loading) return (
    <LoadingScreen />
  );

  return (
    <>
      <div className="contents" inert={modal !== null}>
        <UserIndicator className="w-20" canEdit {...account} setModal={setModal} />
        <Prompt className="absolute bottom-1 left-22" style={{
          width: "calc(100vw - 23rem)"
        }} />
      </div>

      {modal === ModalType.AccountSettings &&
        <AccountSettingsModal closeModal={() => setModal(null)} account={account} setAccount={setAccount} startingTab={initialAccountSettingsTab} setInitialAccountSettingsTab={setInitialAccountSettingsTab} />
      }
      {modal === ModalType.SignUp &&
        <SignUpModal />
      }
    </>
  );
};

export default GUI;
