import { ChangeEvent, useEffect, useState } from "react";
import ArticleCard from "../article/articleCard.tsx";
import { Iarticle } from "../../types/article.ts";
import { ApiResponse } from "../../api/ApiResponse.ts";
import { get } from "../../api/apiClient";
import { RxReset } from "react-icons/rx";
import {
  FaArrowUpAZ as ArrowUpAZ,
  FaArrowDownZA as ArrowDownZA,
} from "react-icons/fa6";
import Button from "../Divers/Button.tsx";
import SearchInput from "../Divers/SearchBar/SearchInput.tsx";
import SearchSelectBox from "../Divers/SearchBar/SearchSelectBox.tsx";
import { ISelectBoxOption } from "../../types/SelectBoxOption.ts";
import { IRelationType } from "../../types/RelationType.ts";
import { IarticleCategorie } from "../../types/articleCategorie.ts";
import ArticleDetail from "../article/articleDetail.tsx";
import { FaBackward } from "react-icons/fa";
import Managearticles from "../article/Managearticle.tsx";
import { useUser } from "../../contexts/AuthContext.tsx";

interface FeedContainerProps {
  newarticle?: boolean
}

const FeedContainer = ({newarticle = false}: FeedContainerProps) => {
  const { user } = useUser();
  const userId = user?.id ?? 0;

  const [articles, setarticles] = useState<Iarticle[]>([]);

  const getarticles = async () => {
    const response = await get<ApiResponse<Iarticle[]>>(
      `articles?valide=true&catalogue=true&user_id=${userId}`
    );
    if (response?.status && response.data) {
      setarticles(response.data);
    }
  };

  useEffect(() => {
    getarticles();
  }, []);

  //Tri des articles
  const [sortByTitleAsc, setSortByTitleAsc] = useState(true);

  // //Récupération de toutes les catégories
  const [allCategories, setCategories] = useState<IarticleCategorie[]>([]);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<IarticleCategorie[]>>(
      "article_categories" + "?visible=" + true
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //Récupération de tous les types de relation
  const [allRelationTypes, setRelationTypes] = useState<IRelationType[]>([]);
  const getAllRelationTypes = async () => {
    const response = await get<ApiResponse<IRelationType[]>>(
      "relation_types" + "?visible=" + true + "?user_id=" + user?.id
    );
    if (response?.status && response.data) {
      setRelationTypes(response.data);
    }
  };
  useEffect(() => {
    getAllRelationTypes();
  }, []);

  // Filtrer articles
  const [searchTitrearticle, setSearchTitrearticle] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchRelationType, setSearchRelationType] = useState("");
  const [searchRestreint, setsearchRestreint] = useState("-1");

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
    } else if (name === "search_restreint") {
      setsearchRestreint(value);
    }
  };

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

  const filteredarticles = articles
    .filter(
      (ress) =>
        ress.titre.toLowerCase().includes(searchTitrearticle.toLowerCase()) &&
        (!searchCategorie ||
          String(ress.article_categorie.id) === searchCategorie) &&
        (!searchRelationType ||
          String(ress.relation_type.id) === searchRelationType) &&
        (searchRestreint === "-1" ||
          String(ress.restreint ? 1 : 0) === searchRestreint)
    )
    .sort((a, b) => {
      if (sortByTitleAsc) {
        return a.titre.localeCompare(b.titre);
      } else {
        return b.titre.localeCompare(a.titre);
      }
    });

  const restreintOptions: ISelectBoxOption[] = [
    { label: "Toute visibilité", value: "-1" },
    { label: "Privée", value: "1" },
    { label: "Publique", value: "0" },
  ];

  const resetFilters = () => {
    setSearchTitrearticle("");
    setSearchCategorie("");
    setSearchRelationType("");
    setsearchRestreint("-1");
  };

  //Détail d'une article
  const [selectedarticle, setSelectedarticle] = useState<Iarticle | null>(
    null
  );

  const handleConsulter = (article: Iarticle) => {
    setSelectedarticle(article);
  };

  const handleRetour = () => {
    setSelectedarticle(null);
  };

  return (
    <>
      {selectedarticle ? (
        <div className="p-4">
          <ArticleDetail article={selectedarticle} />

          <div className="mt-6 flex justify-center">
            <Button
              color="gray"
              onClick={handleRetour}
              label="Retour liste articles"
              icon={<FaBackward />}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Barre de recherche + tri */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
            <div className="mt-2 mr-0 mb-4 ml-2 flex flex-wrap gap-2">
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
                value={searchRestreint}
                name="search_restreint"
                options={restreintOptions}
              />
              <Button
                icon={<RxReset size={25} />}
                onClick={resetFilters}
                color="gray"
              />
              <Button
                icon={
                  sortByTitleAsc ? (
                    <ArrowUpAZ size={25} />
                  ) : (
                    <ArrowDownZA size={25} />
                  )
                }
                onClick={() => setSortByTitleAsc(!sortByTitleAsc)}
                color="green"
              />
            </div>
          </div>

          {/* Cartes de articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredarticles.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                index={index}
                article={article}
                onConsulter={() => handleConsulter(article)}
              />
            ))}
          </div>
        </>
      )}
      {newarticle && <Managearticles autoShow={newarticle}/>}
    </>
  );
};

export default FeedContainer;
