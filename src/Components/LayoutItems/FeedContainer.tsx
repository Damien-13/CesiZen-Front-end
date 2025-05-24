import { ChangeEvent, useEffect, useState } from "react";
import ResourceCard from "../Ressource/ResourceCard.tsx";
import { IRessource } from "../../types/Ressource.ts";
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
import { IRessourceCategorie } from "../../types/RessourceCategorie.ts";
import RessourceDetail from "../Ressource/RessourceDetail.tsx";
import { FaBackward } from "react-icons/fa";
import ManageRessources from "../Ressource/ManageRessources.tsx";
import { useUser } from "../../contexts/AuthContext.tsx";

interface FeedContainerProps {
  newRessource?: boolean,
  setCurrentLayout?: (layout: string) => void
}

const FeedContainer = ({ newRessource = false, setCurrentLayout }: FeedContainerProps) => {
  const { user } = useUser();
  const userId = user?.id ?? 0;

  const [ressources, setRessources] = useState<IRessource[]>([]);

  const getRessources = async () => {
    const response = await get<ApiResponse<IRessource[]>>(
      `ressources?valide=true&catalogue=true&user_id=${userId}`
    );
    if (response?.status && response.data) {
      setRessources(response.data);
    }
  };

  useEffect(() => {
    getRessources();
  }, []);

  //Tri des ressources
  const [sortByTitleAsc, setSortByTitleAsc] = useState(true);

  // //Récupération de toutes les catégories
  const [allCategories, setCategories] = useState<IRessourceCategorie[]>([]);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories" + "?visible=" + true
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

  // Filtrer ressources
  const [searchTitreRessource, setSearchTitreRessource] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchRelationType, setSearchRelationType] = useState("");
  const [searchRestreint, setsearchRestreint] = useState("-1");

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
    } else if (name === "search_restreint") {
      setsearchRestreint(value);
    }
  };

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

  const filteredRessources = ressources
    .filter(
      (ress) =>
        ress.titre.toLowerCase().includes(searchTitreRessource.toLowerCase()) &&
        (!searchCategorie ||
          String(ress.ressource_categorie.id) === searchCategorie) &&
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
    setSearchTitreRessource("");
    setSearchCategorie("");
    setSearchRelationType("");
    setsearchRestreint("-1");
  };

  //Détail d'une ressource
  const [selectedRessource, setSelectedRessource] = useState<IRessource | null>(
    null
  );

  const handleConsulter = (ressource: IRessource) => {
    setSelectedRessource(ressource);
  };

  const handleRetour = () => {
    setSelectedRessource(null);
  };

  return (
    <>
      {selectedRessource ? (
        <div className="p-4">
          <RessourceDetail ressource={selectedRessource} />

          <div className="mt-6 flex justify-center">
            <Button
              color="gray"
              onClick={handleRetour}
              label="Retour liste ressources"
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
              {user && user.id > 0 && (
                <SearchSelectBox
                  onChange={handleSearchChange}
                  value={searchRestreint}
                  name="search_restreint"
                  options={restreintOptions}
                />
              )}

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
                color="blue"
              />
            </div>
          </div>

          {/* Cartes de ressources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRessources.map((ressource, index) => (
              <ResourceCard
                key={ressource.id || index}
                index={index}
                ressource={ressource}
                onConsulter={() => handleConsulter(ressource)}
              />
            ))}
          </div>
        </>
      )}
      {newRessource && <ManageRessources autoShow={newRessource} setCurrentLayout={setCurrentLayout}/>}
    </>
  );
};

export default FeedContainer;
