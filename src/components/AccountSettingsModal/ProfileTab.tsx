"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import Box from "../Box/Box";
import { Dispatch, SetStateAction, useState } from "react";
import { FeedbackState, FeedbackStateType } from "./AccountSettingsModal";
import { nullish } from "@/lib/api";
import ProfilePopupContent from "../ProfilePopup/ProfilePopupContent";

const ProfileTab = (props: {
  account: AuthorizedAccountFromAPI,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>,
  setFeedbackState: Dispatch<SetStateAction<FeedbackState | null>>
}) => {
  let [customAccent, setCustomAccent] = useState(!!props.account.accent1);
  let [avatarFile, setAvatarFile] = useState<File | null>(null);
  let [avatarPreviewURL, setAvatarPreviewURL] = useState(`/u/${props.account.username}/a`);
  let [accent1, setAccent1] = useState(props.account.accent1 ?? "#000000");
  let [accent2, setAccent2] = useState(props.account.accent2 ?? "#000000");
  let [bio, setBio] = useState(props.account.bio ?? "");
  let [displayName, setDisplayName] = useState(props.account.displayName ?? "");
  let [nameFont, setNameFont] = useState(props.account.nameFont ?? "");
  let [pronouns, setPronouns] = useState(props.account.pronouns ?? "");
  let [username, setUsername] = useState(props.account.username);

  return (
    <div className="flex gap-2 items-start">
      <div className="grow">
        <form onSubmit={async (event) => {
          event.preventDefault();

          props.setFeedbackState({
            type: FeedbackStateType.Loading
          });

          const res = await fetch(`/u/${props.account.username}`, {
            method: "PUT",
            body: JSON.stringify({
              accent1,
              accent2,
              avatar: avatarFile ? avatarPreviewURL : null,
              bio,
              displayName,
              pronouns,
              nameFont,
              username
            })
          });

          if (!res.ok) {
            props.setFeedbackState({
              type: FeedbackStateType.Error,
              message: await res.text()
            });
            return;
          }

          props.setAccount({
            accent1: customAccent ? accent1 : null,
            accent2: customAccent ? accent2 : null,
            admin: props.account.admin,
            bio: nullish(bio),
            connections: props.account.connections,
            displayName: nullish(displayName),
            email: props.account.email,
            id: props.account.id,
            joined: props.account.joined,
            nameFont: nullish(nameFont),
            pronouns: nullish(pronouns),
            username
          });
          props.setFeedbackState({
            type: FeedbackStateType.Message,
            message: "Saved profile"
          });
        }}>
          <label>
            <div>Avatar</div>
            <input type="file" onChange={(event) => {
              const avatarFile = event.currentTarget.files?.item(0);
              if (!avatarFile || !event.currentTarget.files) return;
              setAvatarFile(avatarFile);
              const reader = new FileReader();
              reader.onloadend = () => setAvatarPreviewURL(reader.result?.toString() ?? `/u/${username}/a`);
              reader.readAsDataURL(avatarFile)
            }} />
            <div>Maximum upload size of 1 MB.</div>
          </label>
          <label>
            <div>Display Name</div>
            <input type="text" value={displayName} placeholder={username} onChange={(event) => setDisplayName(event.currentTarget.value)} />
          </label>
          <label>
            <div>Name Font</div>
            <select value={nameFont} onChange={(event) => {
              setNameFont(event.target.value);
            }} style={{
              fontFamily: nameFont
            }}>
              <option value="">Default</option>
              <option value="Alfa Slab One">Bold</option>
              <option value="Leckerli One">Cursive</option>
              <option value="Maple Mono">Monospace</option>
              <option value="Merriweather">Serif</option>
              <option value="Goldman">Techno</option>
            </select>
          </label>
          <label>
            <div>Username</div>
            <input type="text" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
          </label>
          <label>
            <div>Pronouns</div>
            <input type="text" value={pronouns} onChange={(event) => setPronouns(event.currentTarget.value)} />
          </label>
          <label>
            <div><input type="checkbox" checked={customAccent} onChange={(event) => setCustomAccent(event.currentTarget.checked)} /> Card Accent</div>
            {customAccent && <>
              <input type="color" value={accent1} onChange={(event) => setAccent1(event.currentTarget.value)} />
              <input type="color" value={accent2} onChange={(event) => setAccent2(event.currentTarget.value)} />
            </>}
          </label>
          <label>
            <div>Bio</div>
            <textarea value={bio} onChange={(event) => setBio(event.currentTarget.value)}></textarea>
          </label>
          <input type="submit" value="Save profile" />
        </form>
      </div>
      <Box className="w-20 rounded-2xl overflow-auto">
        <ProfilePopupContent
          accent1={customAccent ? accent1 : null}
          accent2={customAccent ? accent2 : null}
          admin={props.account.admin}
          bio={nullish(bio)}
          connections={props.account.connections}
          displayName={nullish(displayName)}
          id={props.account.id}
          joined={props.account.joined}
          nameFont={nullish(nameFont)}
          pronouns={nullish(pronouns)}
          username={username}
          avatar={avatarPreviewURL}
          splash={"/banner.png"}
        />
      </Box>
    </div>
  )
}

export default ProfileTab;
