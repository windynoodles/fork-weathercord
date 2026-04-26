import Box from "../Box/Box";
import ProfilePopupContent from "../ProfilePopup/ProfilePopupContent";
import UserIndicatorClient from "./UserIndicatorClient";
import UserIndicatorContentClient from "./UserIndicatorContentClient";
import UserIndicatorSmall from "./UserIndicatorSmall";

const UserIndicator = (props: Record<string, any> & {
  avatar: string,
  bio: string,
  canEdit: boolean,
  displayName: string,
  splash?: string,
  username: string
}) => {
  return (
    <Box className="absolute bottom-1 left-1 rounded-2xl overflow-hidden">
      <div className="overflow-hidden" style={{
        transition: "height 0.25s"
      }}>
        <UserIndicatorContentClient>
          <ProfilePopupContent {...props} />
        </UserIndicatorContentClient>
      </div>
      <UserIndicatorClient>
        <UserIndicatorSmall {...props} />
      </UserIndicatorClient>
    </Box>
  );
};

export default UserIndicator;
