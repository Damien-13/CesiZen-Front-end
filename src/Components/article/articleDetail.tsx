import { formatStringDate } from "../../services/utils.ts";
import { Iarticle } from "../../types/article.ts";
import { FaLock, FaUnlock } from "react-icons/fa";
import Button from "../Divers/Button.tsx";
import { TbUserShare } from "react-icons/tb";
import { useUser } from "../../contexts/AuthContext.tsx";
import { useState } from "react";
import Modal from "../Divers/Modal.tsx";
import ManagearticleShare from "./articleShares/ManagearticleShare.tsx";

interface ArticleDetailProps {
  article: Iarticle;
  onRefresh?: () => void;
}

const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-green-800 bg-green-100 px-4 py-2 rounded-md inline-block shadow-sm">
        {article.titre}
      </h2>

      <div className="text-sm text-gray-500 mt-5">
        <p>Ajouté le : {formatStringDate(article.created_at)}</p>
        <p>Par {article.user?.pseudo}</p>
      </div>

      <div className="text-sm mt-5">
        <p>
          Catégorie : {article.article_categorie?.lib_article_categorie}
        </p>
        <p>Type de relation : {article.relation_type?.lib_relation_type}</p>
        <div className="flex justify-center items-center gap-1 mt-2 text-sm">
          <span>article </span>
          {article.restreint ? (
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
          {article.description}
        </p>
      </div>

      {article.url && (
        <div className="mt-5">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            {article.url}
          </a>
        </div>
      )}

      {article.restreint && user?.id === article.user.id ? (
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
            <ManagearticleShare
              article={article}
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

export default ArticleDetail;
