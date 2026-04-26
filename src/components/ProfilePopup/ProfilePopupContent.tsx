import { Vibrant } from "node-vibrant/node";

const ProfilePopupContent = async (props: Record<string, any> & {
  avatar: string,
  bio: string,
  canEdit: boolean,
  displayName: string,
  splash?: string,
  username: string
}) => {
  const accent = await Vibrant.from(props.avatar).getPalette();

  return (
    <div className="text-left" style={props.style}>
      <div className="h-7 w-full" aria-hidden style={{
        backgroundImage: props.splash ? `url(${props.splash})` : `linear-gradient(${accent.LightVibrant?.hex}, ${accent.LightVibrant?.hex})`,
        backgroundSize: "cover"
      }} />
      <div className="p-1 flex flex-col gap-1">
        <div className="flex gap-1">
          <img className="rounded-full w-6 h-6" src={props.avatar} alt={props.displayName + "'s avatar"} />
          <div>
            <div className="text-2xl font-bold">{props.displayName}</div>
            <sub>@{props.username}</sub>
          </div>
        </div>
        <div>{props.bio}</div>
      </div>
    </div>
  );
};

export default ProfilePopupContent;
