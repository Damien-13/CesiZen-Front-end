import { formatStringDate } from "../../services/utils.ts";
import { IRessource } from "../../types/Ressource.ts";
import { FaLock, FaUnlock } from "react-icons/fa";
import Button from "../Divers/Button.tsx";
import { TbUserShare } from "react-icons/tb";
import { useUser } from "../../contexts/AuthContext.tsx";
import { useState } from "react";
import Modal from "../Divers/Modal.tsx";
import ManageRessourceShare from "./RessourceShares/ManageRessourceShare.tsx";

interface RessourceDetailProps {
  ressource: IRessource;
  onRefresh?: () => void;
}

const RessourceDetail = ({ ressource }: RessourceDetailProps) => {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 bg-blue-100 px-4 py-2 rounded-md inline-block shadow-sm">
        {ressource.titre}
      </h2>

      <div className="text-sm text-gray-500 mt-5">
        <p>Ajouté le : {formatStringDate(ressource.created_at)}</p>
        <p>Par {ressource.user?.pseudo}</p>
      </div>

      <div className="text-sm mt-5">
        <p>
          Catégorie : {ressource.ressource_categorie?.lib_ressource_categorie}
        </p>
        <p>Type de relation : {ressource.relation_type?.lib_relation_type}</p>
        <div className="flex justify-center items-center gap-1 mt-2 text-sm">
          <span>Ressource </span>
          {ressource.restreint ? (
            <>
              <span>privée</span>
              <FaLock className="text-red-500" />
            </>
          ) : (
            <>
              <span>publique</span>
              <FaUnlock className="text-green-500" />
            </>
          )}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-600 whitespace-pre-line">
          {ressource.description}
        </p>
      </div>

      {ressource.url && (
        <div className="mt-5">
          <a
            href={ressource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            {ressource.url}
          </a>
        </div>
      )}

      {ressource.restreint && user?.id === ressource.user.id ? (
        <div className="mt-10">
          <Button
            onClick={() => setModalOpen(true)}
            label="Partager"
            icon={<TbUserShare size={20} />}
          />
        </div>
      ) : null}

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          dismissable={true}
          position="center"
        >
          {user && (
            <ManageRessourceShare
              ressource={ressource}
              user={user}
              onSubmit={(success) => {
                if (success) setModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}

    </div>
  );
};

export default RessourceDetail;
