import { useState } from "react";
import { IRessource } from "../../../types/Ressource";
import { IUser } from "../../../types/User";
import AddRessourceShare from "./AddRessourceShare";
import RessourceShareList from "./RessourceShareList";

interface ShareRessourceFormProps {
  ressource: IRessource;
  user: IUser;
  onSubmit: (success: boolean) => void;
}

const ManageRessourceShare = (props: ShareRessourceFormProps) => {
  const [refreshPartages, setRefreshPartages] = useState(false);

  const triggerRefresh = () => {
    setRefreshPartages((prev) => !prev);
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Partage ressource privée :
        </h3>
        <h4>{props.ressource.titre}</h4>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5">
        <div className="mb-4">
          <AddRessourceShare
            ressource={props.ressource}
            user={props.user}
            onSubmit={triggerRefresh}
          />
        </div>
        <div>
          <RessourceShareList
            refreshPartages={refreshPartages}
            ressource_id={props.ressource.id}
          />
        </div>
      </div>
    </>
  );
};

export default ManageRessourceShare;
