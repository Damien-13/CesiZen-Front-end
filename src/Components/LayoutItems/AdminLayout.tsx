import ManageCategories from "../Categorie/ManageCategories.tsx";
import ManageRessources from "../Ressource/ManageRessources.tsx";
import AdminUserManager from "../Utilisateur/AdminUserManager.tsx";

const AdminLayout = ({adminOption}) => {

    const getCurrentMenu = () => {
        switch (adminOption) {
            case 'categories':
                return <ManageCategories/>;
            case 'ressources':
                return <ManageRessources/>;
            case 'users':
                return <AdminUserManager/>;
            default:
                return <ManageCategories/>;
        }
    }
    return (
        <>
            {
                getCurrentMenu()
            }
        </>
    );
};

export default AdminLayout;
