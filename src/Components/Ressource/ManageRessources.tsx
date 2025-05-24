import { useEffect, useState } from "react";
import Button from "../Divers/Button";
import { FaPlus } from "react-icons/fa";
import Modal from "../Divers/Modal";
import Toast from "../Divers/Toast";
import RessourcesAdminList from "./RessourcesAdminList";
import RessourceForm from "./RessourceForm";
import { IRessource } from "../../types/Ressource";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import { get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { IRelationType } from "../../types/RelationType";
import { useUser } from "../../contexts/AuthContext";

interface ManageRessourceProps {
  autoShow?: boolean;
}

const ManageRessources = ({autoShow = false}:ManageRessourceProps) => {
  const { user } = useUser();

  const [ressource, setRessource] = useState<IRessource | null>(null);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [toastCreationMessage, setToastCreationMessage] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  const [allCategorieTypes, setCategories] = useState<IRessourceCategorie[]>([]);
  const [allRelationTypes, setRelationTypes] = useState<IRelationType[]>([]);

  useEffect(() => {
    if (autoShow) {
      handleAddClick();
    }
  }, [autoShow]);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  const getAllCategories = async (visible?: boolean) => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories" + "?visible=" + visible
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  const getAllRelationTypes = async (visible?: boolean) => {
    const response = await get<ApiResponse<IRelationType[]>>(
      "relation_types" + "?visible=" + visible
    );
    if (response?.status && response.data) {
      setRelationTypes(response.data);
    }
  };

  useEffect(() => {
    getAllCategories(true);
    getAllRelationTypes(true);
  }, []);

  const handleAddClick = () => {
    if (!user) {
      setToastCreationMessage("Utilisateur non connecté");
      return;
    }

    setRessource({
      id: 0,
      titre: "",
      description: "",
      nom_fichier: "",
      restreint: false,
      url: "",
      valide: false,
      created_at: "",
      user: { ...user },
      ressource_categorie: {
        id: 0,
        lib_ressource_categorie: "",
        visible: false,
      },
      ressource_type: {
        id: 1,
        lib_ressource_type: "Texte",
        visible: true,
      },
      relation_type: {
        id: 0,
        lib_relation_type: "",
        visible: false,
      },
    });

    setModalFormVisible(true);
  };

  return (
    <>
      <div className={autoShow && 'hidden'}>
          <h3 className="text-3xl font-bold dark:text-white mt-4 mb-5">
            Gestion des ressources
          </h3>

          <Button icon={<FaPlus size={20} />} onClick={handleAddClick} />

          <div className="mt-4">
            {user && <RessourcesAdminList refreshRessources={refresh} user={user} />}
          </div>
      </div>
      {modalFormVisible && ressource && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable
          position="center"
        >
          <RessourceForm
            ressource={ressource}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                triggerRefresh();
              } else {
                setToastCreationMessage("Erreur lors de l'enregistrement");
              }
            }}
            user={user!}
            relationTypes={allRelationTypes}
            categoriesTypes={allCategorieTypes}
          />
        </Modal>
      )}

      {toastCreationMessage && (
        <Toast type="danger" text={toastCreationMessage} autoClose />
      )}
    </>
  );
};

export default ManageRessources;