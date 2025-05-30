import { ChangeEvent, useEffect, useState } from "react";
import { del, get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import SearchInput from "../Divers/SearchBar/SearchInput";
import Toast from "../Divers/Toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import ConfirmModal from "../Divers/ConfirmModal";
import { Iarticle } from "../../types/article";
import ArticleForm from "./articleForm";
import { IUser } from "../../types/User";
import { IRelationType } from "../../types/RelationType";
import { IarticleCategorie } from "../../types/articleCategorie";
import SearchSelectBox from "../Divers/SearchBar/SearchSelectBox";
import { ISelectBoxOption } from "../../types/SelectBoxOption";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled, RxReset } from "react-icons/rx";

interface ArticlesAdminListProps {
  refresharticles: boolean;
  user: IUser;
}

const ArticlesAdminList = (props: ArticlesAdminListProps) => {
  // Liste de toutes les articles
  const [allarticles, setarticles] = useState<Iarticle[]>([]);
  const [selectedarticle, setSelectedarticle] = useState<Iarticle | null>(
    null
  );

  const getAllarticles = async () => {
    const response = await get<ApiResponse<Iarticle[]>>("articles");
    if (response?.status && response.data) {
      setarticles(response.data);
    }
  };

  //Mise à jour de la liste
  useEffect(() => {
    getAllarticles();
  }, [props.refresharticles]);

  //Récupération de toutes les catégories
  const [allCategories, setCategories] = useState<IarticleCategorie[]>([]);

  const getAllCategories = async (visible?: boolean) => {
    const response = await get<ApiResponse<IarticleCategorie[]>>(
      "article_categories" + "?visible=" + visible
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
    if (confirmed && selectedarticle) {
      deletearticle(selectedarticle.id);
    }
    setModalConfirmVisible(false);
  };

  // Supprimer une article
  const deletearticle = async (id: number) => {
    const response = await del<ApiResponse<null>>(`articles/${id}`);
    if (response?.status) {
      getAllarticles();
    } else {
      setToastMessage("Erreur lors de la suppression de la article");
    }
  };
  //

  // Filtrer article
  const [searchTitrearticle, setSearchTitrearticle] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchRelationType, setSearchRelationType] = useState("");
  const [searchValide, setSearchValide] = useState("0");

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "search_titre") {
      setSearchTitrearticle(value);
    } else if (name === "search_article_categorie") {
      setSearchCategorie(value);
    } else if (name === "search_relation_type") {
      setSearchRelationType(value);
    } else if (name === "search_valide") {
      setSearchValide(value);
    }
  };

  const filteredarticles = allarticles.filter(
    (ress) =>
      ress.titre.toLowerCase().includes(searchTitrearticle.toLowerCase()) &&
      (!searchCategorie ||
        String(ress.article_categorie.id) === searchCategorie) &&
      (!searchRelationType ||
        String(ress.relation_type.id) === searchRelationType) &&
      (searchValide === "-1" || Boolean(ress.valide) === (searchValide === "1"))
  );

  const categorieOptions: ISelectBoxOption[] = [
    { label: "Toutes les catégories", value: "0" },
    ...allCategories.map((categorie) => ({
      label: categorie.lib_article_categorie,
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
    setSearchTitrearticle("");
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
            value={searchTitrearticle}
            name="search_titre"
          />
          <SearchSelectBox
            onChange={handleSearchChange}
            value={searchCategorie}
            name="search_article_categorie"
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

        {/* Liste des articles */}
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
            {filteredarticles.map((article) => (
              <tr
                key={article.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {article.titre}
                </td>
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {article.article_categorie.lib_article_categorie}
                </td>
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {article.relation_type.lib_relation_type}
                </td>
                <td className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {article.valide ? (
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
                      if (article) {
                        setSelectedarticle(article);
                        setModalFormVisible(true);
                      }
                    }}
                  />
                </td>
                <td className="px-6 py-3 text-right">
                  <Button
                    icon={<MdDelete size={20} />}
                    label=""
                    color="red"
                    onClick={() => {
                      if (article) {
                        setSelectedarticle(article);
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
      {modalFormVisible && selectedarticle && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <ArticleForm
            article={selectedarticle}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                getAllarticles();
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
        message="Êtes-vous sûr de vouloir supprimer cette article ?"
        onConfirm={handleConfirmation}
      />

      {/* Visibilité toast en cas d'erreur http */}
      {toastMessage && (
        <Toast type="danger" text={toastMessage} autoClose={true} />
      )}
    </>
  );
};

export default ArticlesAdminList;
