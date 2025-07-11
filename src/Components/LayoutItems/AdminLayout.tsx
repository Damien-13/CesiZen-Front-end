import ManageCategories from "../Categorie/ManageCategories.tsx";
import Managearticles from "../article/Managearticle.tsx";
import AdminUserManager from "../Utilisateur/AdminUserManager.tsx";

type AdminLayoutProps = {
    adminOption: string | null;
};

const AdminLayout = ({ adminOption }: AdminLayoutProps) => {

    const getCurrentMenu = () => {
        switch (adminOption) {
            case 'categories':
                return <ManageCategories/>;
            case 'articles':
                return <Managearticles/>;
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
