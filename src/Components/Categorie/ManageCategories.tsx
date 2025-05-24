import { useState } from "react";
import Button from "../Divers/Button";
import CategoriesList from "./CategoriesList";
import { FaPlus } from "react-icons/fa";
import Modal from "../Divers/Modal";
import CategoryForm from "./CategoryForm";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import Toast from "../Divers/Toast";

const ManageCategories = () => {
  const [ressourceCategorie, setRessourceCategorie] =
    useState<IRessourceCategorie>({
      id: 0,
      lib_ressource_categorie: "",
      visible: true,
    });

  const [modalFormVisible, setModalFormVisible] = useState(false);

  const [toastCreationMessage, setToastCreationMessage] = useState<
    string | null
  >(null);

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <h3 className="text-3xl font-bold dark:text-white mt-4 mb-5">
        Gestion des catégories
      </h3>
      <Button
        icon={<FaPlus size={20} />}
        onClick={() => {
          setRessourceCategorie({
            id: 0,
            lib_ressource_categorie: "",
            visible: true,
          });
          setModalFormVisible(true);
        }}
      />
      <div className="mt-4">
        <CategoriesList refreshCategories={refresh} />
      </div>

      {/* Modal modification */}
      {modalFormVisible && ressourceCategorie && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <CategoryForm
            ressourceCategorie={ressourceCategorie}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                triggerRefresh();
              } else {
                setToastCreationMessage("Erreur lors de l'enregistrement");
              }
            }}
          />
        </Modal>
      )}

      {/* Visibilité toast en cas d'erreur http */}
      {toastCreationMessage && (
        <Toast type="danger" text={toastCreationMessage} autoClose={true} />
      )}
    </>
  );
};

export default ManageCategories;
