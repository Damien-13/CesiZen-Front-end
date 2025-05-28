import { ChangeEvent, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";
import CheckBox from "../Form/CheckBox";
import { post, put } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { Iarticle } from "../../types/article";
import TextArea from "../Form/TextArea";
import { IUser } from "../../types/User";
import { IRelationType } from "../../types/RelationType";
import { IarticleCategorie } from "../../types/articleCategorie";
import { SelectBox } from "../Form/SelectBox";
import { formatStringDate } from "../../services/utils";
import { ISelectBoxOption } from "../../types/SelectBoxOption";

interface CategoryFormProps {
  onSubmit: (success: boolean) => void;
  user: IUser;
  relationTypes: IRelationType[];
  categoriesTypes: IarticleCategorie[];
  article: Iarticle;
}

const ArticleForm = (props: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const articleInput = {
    id: props.article?.id || 0,
    titre: props.article?.titre || "",
    description: props.article?.description || "",
    nom_fichier: props.article?.nom_fichier || "",
    restreint: props.article?.restreint || false,
    url: props.article?.url || "",
    valide: props.article?.valide || false,
    user_id: props.article?.user.id || 0,
    article_categorie_id: props.article?.article_categorie.id || 0,
    article_type_id: props.article?.article_type.id || 1,
    relation_type_id: props.article?.relation_type.id || 0,
  };

  const [formData, setFormData] = useState({
    ...articleInput,
  });

  const categorieOptions: ISelectBoxOption[] = [
    { label: "Sélectionner une catégorie", value: "0" },
    ...props.categoriesTypes.map((categorie) => ({
      label: categorie.lib_article_categorie,
      value: String(categorie.id),
    })),
  ];

  const relationTypesOptions: ISelectBoxOption[] = [
    { label: "Sélectionner un type de relation", value: "0" },
    ...props.relationTypes.map((relation) => ({
      label: relation.lib_relation_type,
      value: String(relation.id),
    })),
  ];

  const validateField = (name: string, value: string) => {
    if (name === "titre") {
      if (!value.trim()) return "Le titre est requis.";
      if (value.trim().length > 50)
        return "Le titre ne doit pas dépasser 50 caractères.";
    }
    if (name === "description") {
      if (!value.trim()) return "La description est requise.";
      if (value.trim().length > 1000)
        return "La description ne doit pas dépasser 1000 caractères.";
    }
    if (name === "url" && value.trim()) {
      try {
        new URL(value);
        if (value.length > 255)
          return "L'URL ne doit pas dépasser 255 caractères.";
      } catch {
        return "Le format d'URL n'est pas valide.";
      }
    }
    if (name === "article_categorie_id") {
      if (Number(value) === 0) return "La catégorie est requise.";
    }
    if (name === "relation_type_id") {
      if (Number(value) === 0) return "Le type de relation est requis.";
    }
    return "";
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));

    const errorMessage = validateField(name, String(value));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async () => {
    //Validation des données
    const errors: { [key: string]: string } = {};
    errors.titre = validateField("titre", formData.titre);
    errors.description = validateField("description", formData.description);
    errors.url = validateField("url", formData.url);
    errors.article_categorie_id = validateField(
      "article_categorie_id",
      String(formData.article_categorie_id)
    );
    errors.relation_type_id = validateField(
      "relation_type_id",
      String(formData.relation_type_id)
    );

    setFieldErrors(errors);

    // Vérifier s'il y a au moins une erreur
    const hasError = Object.values(errors).some((err) => err);
    if (hasError) return;

    //Enregistrement des données
    setLoading(true);
    const payload = {
      titre: formData.titre,
      description: formData.description,
      nom_fichier: formData.nom_fichier ?? "",
      restreint: formData.restreint,
      url: formData.url ?? "",
      valide: formData.valide,
      user_id: formData.user_id,
      article_categorie_id: Number(formData.article_categorie_id),
      article_type_id: formData.article_type_id,
      relation_type_id: Number(formData.relation_type_id),
    };

    let response;
    if (props.article.id === 0) {
      response = await post<typeof payload, ApiResponse<Iarticle>>(
        "articles",
        payload
      );
    } else {
      response = await put<typeof payload, ApiResponse<Iarticle>>(
        `articles/${props.article.id}`,
        payload
      );
    }
    props.onSubmit(!!response?.status);
    setLoading(false);
  };

  const isFormInvalid =
    !!validateField("titre", formData.titre) ||
    !!validateField("description", formData.description) ||
    !!validateField("url", formData.url) ||
    !!validateField(
      "article_categorie_id",
      String(formData.article_categorie_id)
    ) ||
    !!validateField("relation_type_id", String(formData.relation_type_id));

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {props.article.id && props.article.id !== 0
            ? "Modifier"
            : "Créer"}{" "}
          article
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 mt-1">
        <div className="grid gap-1 mb-4 grid-cols-2">
          {props.article.id !== 0 && (
            <div className="col-span-2 text-left mb-6 text-sm italic">
              <span>
                Créée par {props.article.user.pseudo}, le{" "}
                {formatStringDate(props.article.created_at)}
              </span>
            </div>
          )}

          <div className="col-span-2">
            <SelectBox
              options={categorieOptions}
              label="Catégorie"
              value={String(formData.article_categorie_id)}
              name="article_categorie_id"
              onChange={handleFormChange}
              error={!!fieldErrors.article_categorie_id}
              required={true}
            />
            {fieldErrors.article_categorie_id && (
              <p className="text-red-500 text-sm">
                {fieldErrors.article_categorie_id}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <SelectBox
              options={relationTypesOptions}
              label="Type de relation"
              value={String(formData.relation_type_id)}
              name="relation_type_id"
              onChange={handleFormChange}
              error={!!fieldErrors.relation_type_id}
              required={true}
            />
            {fieldErrors.relation_type_id && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.relation_type_id}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <FloatingInput
              type="text"
              label="Titre"
              value={formData.titre}
              name="titre"
              required={true}
              onChange={handleFormChange}
              error={!!fieldErrors.titre}
            />
            {fieldErrors.titre && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.titre}</p>
            )}
          </div>

          <div className="col-span-2">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Écrire le contenu ici ..."
              label="Contenu de la article"
              required={true}
              maxLength={1000}
              rows={20}
              error={!!fieldErrors.description}
            />
            {fieldErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div className="col-span-2 mt-5">
            <FloatingInput
              type="url"
              label="Lien vers une url"
              value={formData.url}
              name="url"
              onChange={handleFormChange}
              error={!!fieldErrors.url}
            />
            {fieldErrors.url && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.url}</p>
            )}
          </div>

          <div className="col-span-2 mb-5">
            <CheckBox
              onChange={handleFormChange}
              isChecked={formData.restreint}
              label="Privée"
              name="restreint"
            />
          </div>

          {/* Afficher uniquement pour administrateur */}
          <div className="col-span-2 mb-5">
            <CheckBox
              onChange={handleFormChange}
              isChecked={formData.valide}
              label="Valide"
              name="valide"
            />
          </div>
          {/* Pour admin */}
        </div>

        <div>
          <Button
            label="Enregistrer"
            loading={loading}
            onClick={handleSubmit}
            disabled={isFormInvalid || loading}
            icon={<FaSave className="w-4 h-4 mr-2" />}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default ArticleForm;
