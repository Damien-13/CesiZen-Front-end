import { ChangeEvent, useEffect, useState } from "react";
import { del, get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import SearchInput from "../Divers/SearchBar/SearchInput";
import Toast from "../Divers/Toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import ConfirmModal from "../Divers/ConfirmModal";
import { IRessource } from "../../types/Ressource";
import RessourceForm from "./RessourceForm";
import { IUser } from "../../types/User";
import { IRelationType } from "../../types/RelationType";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import SearchSelectBox from "../Divers/SearchBar/SearchSelectBox";
import { ISelectBoxOption } from "../../types/SelectBoxOption";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled, RxReset } from "react-icons/rx";

interface RessourcesAdminListProps {
  refreshRessources: boolean;
  user: IUser;
}

const RessourcesAdminList = (props: RessourcesAdminListProps) => {
  // Liste de toutes les ressources
  const [allRessources, setRessources] = useState<IRessource[]>([]);
  const [selectedRessource, setSelectedRessource] = useState<IRessource | null>(
    null
  );

  const getAllRessources = async () => {
    const response = await get<ApiResponse<IRessource[]>>("ressources");
    if (response?.status && response.data) {
      setRessources(response.data);
    }
  };

  //Mise à jour de la liste
  useEffect(() => {
    getAllRessources();
  }, [props.refreshRessources]);

  //Récupération de toutes les catégories
  const [allCategories, setCategories] = useState<IRessourceCategorie[]>([]);

  const getAllCategories = async (visible?: boolean) => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories" + "?visible=" + visible
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getAllCategories(true);
  }, []);

  //Récupération de tous les types de relation
  const [allRelationTypes, setRelationTypes] = useState<IRelationType[]>([]);
  const getAllRelationTypes = async (visible?: boolean) => {
    const response = await get<ApiResponse<IRelationType[]>>(
      "relation_types" + "?visible=" + visible
    );
    if (response?.status && response.data) {
      setRelationTypes(response.data);
    }
  };
  useEffect(() => {
    getAllRelationTypes(true);
  }, []);

  //Modal modification
  const [modalFormVisible, setModalFormVisible] = useState(false);

// Modal confirmation suppression
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedRessource) {
      deleteRessource(selectedRessource.id);
    }
    setModalConfirmVisible(false);
  };

  // Supprimer une ressource
  const deleteRessource = async (id: number) => {
    const response = await del<ApiResponse<null>>(`ressources/${id}`);
    if (response?.status) {
      getAllRessources();
    } else {
      setToastMessage("Erreur lors de la suppression de la ressource");
    }
  };
  //

  // Filtrer ressource
  const [searchTitreRessource, setSearchTitreRessource] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchRelationType, setSearchRelationType] = useState("");
  const [searchValide, setSearchValide] = useState("0");

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "search_titre") {
      setSearchTitreRessource(value);
    } else if (name === "search_ressource_categorie") {
      setSearchCategorie(value);
    } else if (name === "search_relation_type") {
      setSearchRelationType(value);
    } else if (name === "search_valide") {
      setSearchValide(value);
    }
  };

  const filteredRessources = allRessources.filter(
    (ress) =>
      ress.titre.toLowerCase().includes(searchTitreRessource.toLowerCase()) &&
      (!searchCategorie ||
        String(ress.ressource_categorie.id) === searchCategorie) &&
      (!searchRelationType ||
        String(ress.relation_type.id) === searchRelationType) &&
      (searchValide === "-1" || Boolean(ress.valide) === (searchValide === "1"))
  );

  const categorieOptions: ISelectBoxOption[] = [
    { label: "Toutes les catégories", value: "0" },
    ...allCategories.map((categorie) => ({
      label: categorie.lib_ressource_categorie,
      value: String(categorie.id),
    })),
  ];

  const relationTypeOptions: ISelectBoxOption[] = [
    { label: "Tous les types de relation", value: "0" },
    ...allRelationTypes.map((relationType) => ({
      label: relationType.lib_relation_type,
      value: String(relationType.id),
    })),
  ];

  const valideOptions: ISelectBoxOption[] = [
    { label: "Validées", value: "1" },
    { label: "Non validées", value: "0" },
    { label: "Tout type de validation", value: "-1" },
  ];

  const resetFilters = () => {
    setSearchTitreRessource("");
    setSearchCategorie("");
    setSearchRelationType("");
    setSearchValide("0");
  };
  //

  // Toast en cas d'erreur http
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Barre de recherche */}
        <div className="mt-1 mr-0 mb-4 ml-2 flex flex-wrap gap-2 mt-2">
          <SearchInput
            placeholder="Chercher par titre"
            onChange={handleSearchChange}
            value={searchTitreRessource}
            name="search_titre"
          />
          <SearchSelectBox
            onChange={handleSearchChange}
            value={searchCategorie}
            name="search_ressource_categorie"
            options={categorieOptions}
          />
          <SearchSelectBox
            onChange={handleSearchChange}
            value={searchRelationType}
            name="search_relation_type"
            options={relationTypeOptions}
          />
          <SearchSelectBox
            onChange={handleSearchChange}
            value={searchValide}
            name="search_valide"
            options={valideOptions}
          />
          <div className="gap-4">
            <Button
              icon={<RxReset size={25} />}
              onClick={resetFilters}
              color="gray"
            />
          </div>
        </div>

        {/* Liste des ressources */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Titre
              </th>
              <th scope="col" className="px-6 py-4">
                Catégorie
              </th>
              <th scope="col" className="px-6 py-4">
                Relation
              </th>
              <th scope="col" className="px-6 py-4">
                Visible
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
            {filteredRessources.map((ressource) => (
              <tr
                key={ressource.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.titre}
                </td>
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.ressource_categorie.lib_ressource_categorie}
                </td>
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.relation_type.lib_relation_type}
                </td>
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.valide ? (
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
                      if (ressource) {
                        setSelectedRessource(ressource);
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
                      if (ressource) {
                        setSelectedRessource(ressource);
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
      {modalFormVisible && selectedRessource && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <RessourceForm
            ressource={selectedRessource}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                getAllRessources();
              } else {
                setToastMessage("Erreur lors de l'enregistrement");
              }
            }}
            user={props.user}
            relationTypes={allRelationTypes}
            categoriesTypes={allCategories}
          />
        </Modal>
      )}

      {/* Modal confirmation suppression */}
      <ConfirmModal
        isOpen={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        message="Êtes-vous sûr de vouloir supprimer cette ressource ?"
        onConfirm={handleConfirmation}
      />

      {/* Visibilité toast en cas d'erreur http */}
      {toastMessage && (
        <Toast type="danger" text={toastMessage} autoClose={true} />
      )}
    </>
  );
};

export default RessourcesAdminList;
