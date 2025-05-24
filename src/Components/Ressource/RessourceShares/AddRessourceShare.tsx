import FloatingInput from "../../Form/FloatingInput";
import { IRessource } from "../../../types/Ressource";
import Button from "../../Divers/Button";
import { IUser } from "../../../types/User";
import { useState, ChangeEvent } from "react";
import { post } from "../../../api/apiClient";
import { ApiResponse } from "../../../api/ApiResponse";
import { IRessourcePartage } from "../../../types/RessourcePartage";
import { MdPersonAddAlt1 } from "react-icons/md";

interface AddRessourceShareProps {
  ressource: IRessource;
  user: IUser;
  onSubmit: (success: boolean) => void;
}

const AddRessourceShare = (props: AddRessourceShareProps) => {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email_destinataire: "",
  });

  const validateForm = (value: string) => {
    const valueTrim = value.trim();
    if (!valueTrim) {
      return "L'email est requis.";
    }
    if (valueTrim.length > 50) {
      return "L'email ne doit pas dépasser 50 caractères.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(valueTrim)) {
      return "Format de l'email invalide.";
    }
    return "";
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email_destinataire") {
      const errorMessage = validateForm(value);
      setError(errorMessage);
    }
  };

  const handleSubmit = async () => {
    //Validation des données
    const errorMessage = validateForm(formData.email_destinataire);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    //Enregistrement des données
    setError("");
    const payload = {
      ressource_id: props.ressource.id,
      email_destinataire: formData.email_destinataire.trim(),
    };

    const response = await post<typeof payload, ApiResponse<IRessourcePartage>>(
      "ressource_partages",
      payload
    );

    if (!response?.status) {
      setError(
        "Erreur lors de l'ajout du partage : l'email doit correspondre à un compte utilisateur actif ou ne pas figurer dans les partages de cette ressource."
      );
    }

    props.onSubmit(!!response?.status);
  };

  const isFormInvalid = !!validateForm(formData.email_destinataire);

  return (
    <>
      <div className="flex flex-row justify-items-stretch gap-3">
        <FloatingInput
          type="email"
          label="Email nouveau destinataire"
          value={formData.email_destinataire}
          name="email_destinataire"
          required={true}
          onChange={handleFormChange}
          error={!!error}
        />
        <Button
          label=""
          icon={<MdPersonAddAlt1 size={20} />}
          onClick={handleSubmit}
          disabled={isFormInvalid}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default AddRessourceShare;
