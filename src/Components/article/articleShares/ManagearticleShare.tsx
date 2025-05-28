import { useState } from "react";
import { Iarticle } from "../../../types/article";
import { IUser } from "../../../types/User";
import AddarticleShare from "./AddarticleShare";
import ArticleShareList from "./articleShareList";

interface ShareArticleFormProps {
  article: Iarticle;
  user: IUser;
  onSubmit: (success: boolean) => void;
}

const ManagearticleShare = (props: ShareArticleFormProps) => {
  const [refreshPartages, setRefreshPartages] = useState(false);

  const triggerRefresh = () => {
    setRefreshPartages((prev) => !prev);
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Partage article privée :
        </h3>
        <h4>{props.article.titre}</h4>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5">
        <div className="mb-4">
          <AddarticleShare
            article={props.article}
            user={props.user}
            onSubmit={triggerRefresh}
          />
        </div>
        <div>
          <ArticleShareList
            refreshPartages={refreshPartages}
            article_id={props.article.id}
          />
        </div>
      </div>
    </>
  );
};

export default ManagearticleShare;
