import { ChangeEvent, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";
import CheckBox from "../Form/CheckBox";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import { post, put } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";

interface CategoryFormProps {
  onSubmit: (success: boolean) => void;
  ressourceCategorie: IRessourceCategorie;
}

const CategoryForm = (props: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    lib_ressource_categorie:
      props.ressourceCategorie?.lib_ressource_categorie || "",
    visible: props.ressourceCategorie?.visible,
  });

  const validateForm = (value: string) => {
    const valueTrim = value.trim();
    if (!valueTrim) {
      return "Le libellé est requis.";
    }
    if (valueTrim.length > 50) {
      return "Le libellé ne doit pas dépasser 50 caractères.";
    }
    return "";
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "lib_ressource_categorie") {
      const errorMessage = validateForm(value);
      setError(errorMessage);
    }
  };

  const handleSubmit = async () => {
    //Validation des données
    const errorMessage = validateForm(formData.lib_ressource_categorie);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    //Enregistrement des données
    setError("");
    setLoading(true);
    const payload = {
      id: props.ressourceCategorie.id,
      lib_ressource_categorie: formData.lib_ressource_categorie,
      visible: formData.visible,
    };

    let response;
    if (props.ressourceCategorie.id === 0) {
      response = await post<typeof payload, ApiResponse<IRessourceCategorie>>(
        "ressource_categories",
        payload
      );
    } else {
      response = await put<typeof payload, ApiResponse<IRessourceCategorie>>(
        `ressource_categories/${props.ressourceCategorie.id}`,
        payload
      );
    }
    props.onSubmit(!!response?.status);
    setLoading(false);
  };

  const isFormInvalid = !!validateForm(formData.lib_ressource_categorie);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {props.ressourceCategorie.id && props.ressourceCategorie.id !== 0
            ? "Modifier"
            : "Créer"}{" "}
          catégorie de ressource
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 mt-5">
        <div className="grid gap-1 mb-4 grid-cols-2">
          <div className="col-span-2">
            <FloatingInput
              type="text"
              label="Libellé"
              value={formData.lib_ressource_categorie}
              name="lib_ressource_categorie"
              required={true}
              onChange={handleFormChange}
              error={!!error}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="col-span-2 mb-5">
            <CheckBox
              onChange={handleFormChange}
              isChecked={formData.visible}
              label="Visible"
              name="visible"
            />
          </div>
        </div>

        <Button
          label="Enregistrer"
          loading={loading}
          onClick={handleSubmit}
          disabled={isFormInvalid || loading}
          icon={<FaSave className="w-4 h-4 mr-2" />}
        ></Button>
      </div>
    </>
  );
};

export default CategoryForm;
