import { ChangeEvent, useEffect, useState } from "react";
import { del, get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import CategoryForm from "./CategoryForm";
import SearchInput from "../Divers/SearchBar/SearchInput";
import Toast from "../Divers/Toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import ConfirmModal from "../Divers/ConfirmModal";

interface CategoriesListProps {
  refreshCategories: boolean;
}

const CategoriesList = (props: CategoriesListProps) => {
  // Liste des catégories
  const [allCategories, setCategories] = useState<IRessourceCategorie[]>([]);

  const [selectedCategorie, setSelectedCategorie] =
    useState<IRessourceCategorie | null>(null);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories"
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  // Supprimer une catégorie
  const deleteCategory = async (id: number) => {
    const response = await del<ApiResponse<null>>(`ressource_categories/${id}`);
    if (response?.status) {
      getAllCategories();
    } else {
      setToastMessage(
        "Erreur lors de la suppression de la catégorie : elle est peut-être déjà utilisée"
      );
    }
  };

  // Recherche d'une catégorie
  const [searchLibCategorie, setSearchLibCategorie] = useState("");
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchLibCategorie(e.target.value);
  };
  const filteredCategories = allCategories.filter((cat) =>
    cat.lib_ressource_categorie
      .toLowerCase()
      .includes(searchLibCategorie.toLowerCase())
  );

  //Modal modification
  const [modalFormVisible, setModalFormVisible] = useState(false);

  // Modal confirmation suppression
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedCategorie) {
      deleteCategory(selectedCategorie.id);
    }
    setModalConfirmVisible(false);
  };

  //Mise à jour de la liste des catégories
  useEffect(() => {
    getAllCategories();
  }, [props.refreshCategories]);

  // Toast en cas d'erreur http
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Barre de recherche */}
        <div className="mt-1 mr-0 mb-4 ml-2">
          <SearchInput
            placeholder="Chercher une catégorie"
            onChange={handleSearchInputChange}
            value={searchLibCategorie}
            name="search_categorie"
          />
        </div>
        {/* Liste des catégories */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Libellé
              </th>
              <th scope="col" className="px-6 py-4">
                Actif
              </th>
              <th scope="col" className="px-6 py-4">
                <span className="sr-only">Modifier</span>
              </th>
              <th scope="col" className="px-6 py-4">
                <span className="sr-only">Supprimer</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((categorie) => (
              <tr
                key={categorie.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {categorie.lib_ressource_categorie}
                </td>
                <td className="px-6 py-3">
                  {categorie.visible ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <RxCrossCircled className="text-red-500" />
                  )}
                </td>
                <td className="px-6 py-3 text-right">
                  <Button
                    icon={<MdModeEdit size={25} />}
                    label=""
                    onClick={() => {
                      if (categorie) {
                        setSelectedCategorie(categorie);
                        setModalFormVisible(true);
                      }
                    }}
                  />
                </td>
                <td className="px-6 py-3 text-right">
                  <Button
                    icon={<MdDelete size={20} />}
                    label=""
                    onClick={() => {
                      if (categorie) {
                        setSelectedCategorie(categorie);
                        setModalConfirmVisible(true);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal formulaire modification */}
      {modalFormVisible && selectedCategorie && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <CategoryForm
            ressourceCategorie={selectedCategorie}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                getAllCategories();
              } else {
                setToastMessage("Erreur lors de l'enregistrement");
              }
            }}
          />
        </Modal>
      )}

      {/* Modal confirmation suppression */}
      <ConfirmModal
        isOpen={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        message="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
        onConfirm={handleConfirmation}
      />

      {/* Visibilité toast en cas d'erreur http */}
      {toastMessage && (
        <Toast type="danger" text={toastMessage} autoClose={true} />
      )}
    </>
  );
};

export default CategoriesList;
