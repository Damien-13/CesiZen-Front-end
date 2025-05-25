import { useEffect, useState } from "react";
import { MdPersonAddDisabled } from "react-icons/md";
import { IarticlePartage } from "../../../types/articlePartage";
import { del, get } from "../../../api/apiClient";
import { ApiResponse } from "../../../api/ApiResponse";
import Button from "../../Divers/Button";
import ConfirmModal from "../../Divers/ConfirmModal";
import Toast from "../../Divers/Toast";

interface SharearticleListProps {
  refreshPartages: boolean;
  article_id: number;
}

const articleShareList = (props: SharearticleListProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Liste de tous les partages
  const [articlePartages, setarticlePartages] = useState<
    IarticlePartage[]
  >([]);
  const [selectedPartage, setSelectedPartage] =
    useState<IarticlePartage | null>(null);

  const getarticlePartages = async () => {
    setIsLoading(true);
    const response = await get<ApiResponse<IarticlePartage[]>>(
      "article_partages?article_id=" + props.article_id
    );
    if (response?.status && response.data) {
      setarticlePartages(response.data);
    }
    setIsLoading(false);
  };

  //Mise à jour de la liste
  useEffect(() => {
    getarticlePartages();
  }, [props.refreshPartages]);

  // Modal confirmation suppression
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedPartage) {
      deletearticle(selectedPartage);
    }
    setModalConfirmVisible(false);
  };

  // Supprimer une article
  const deletearticle = async (selectedPartage: IarticlePartage) => {
    const response = await del<ApiResponse<null>>(
      `article_partages/${selectedPartage.id}`
    );
    if (response?.status) {
      getarticlePartages();
    } else {
      setToastMessage("Erreur lors de la suppression du partage");
    }
  };

  // Toast en cas d'erreur http
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
      {/* Loading */}
      {isLoading ? (
        <div className="text-center text-gray-500 text-sm py-4">
          Chargement des partages...
        </div>
      ) : articlePartages.length > 0 ? (
        // Tableau si des partages existent
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 py-5">
                  Nom
                </th>
                <th scope="col" className="px-1 py-5">
                  Prénom
                </th>
                <th scope="col" className="px-1 py-5">
                  Pseudo
                </th>
                <th scope="col" className="px-1 py-5">
                  Email
                </th>
                <th scope="col" className="px-1 py-5">
                  <span className="sr-only">Supprimer</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {articlePartages.map((partage) => (
                <tr
                  key={partage.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                    {partage.destinataire.nom}
                  </td>
                  <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                    {partage.destinataire.prenom}
                  </td>
                  <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                    {partage.destinataire.pseudo}
                  </td>
                  <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                    {partage.destinataire.email}
                  </td>
                  <td className="px-1 py-3 text-right">
                    <Button
                      icon={<MdPersonAddDisabled size={20} />}
                      label=""
                      onClick={() => {
                        if (partage.destinataire.id && partage.article.id) {
                          setSelectedPartage(partage);
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
      ) : (
        // Si aucun partage
        <div className="text-center text-gray-500 text-sm py-4">
          Aucun partage pour cette article.
        </div>
      )}

      {/* Modal confirmation suppression */}
      <ConfirmModal
        isOpen={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        message="Êtes-vous sûr de vouloir supprimer ce partage ?"
        onConfirm={handleConfirmation}
      />

      {/* Toast en cas d'erreur */}
      {toastMessage && (
        <Toast type="danger" text={toastMessage} autoClose={true} />
      )}
    </>
  );
};

export default articleShareList;
