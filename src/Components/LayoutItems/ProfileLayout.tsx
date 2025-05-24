import UserUpdate from "../Utilisateur/UserUpdate";
import LogoutButton from "../Utilisateur/LogoutButton.tsx";

const ProfileLayout = () => {

    return (
        <>
          <UserUpdate />
          <LogoutButton/>
        </>
    );
};

export default ProfileLayout;
