import React, { useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import { SelectBox } from "../Form/SelectBox";
import { ISelectBoxOption } from "../../types/SelectBoxOption";
import { API_BASE_URL } from "../../api/apiUrl";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";

interface RegisterProps {
  onRegisterSuccess: (success: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    password: "",
    password_confirmation: "",
    code_postal: "",
    ville: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    const payload = {
      ...formData,
      actif: true,
      role_id: 4,
    };

    try {
      const res = await fetch(API_BASE_URL + "users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.message || "Erreur lors de la création du compte."
        );
      }

      setMessage(
        "Compte créé avec succès ! Vous pouvez maintenant vous connecter."
      );
      setFormData({
        nom: "",
        prenom: "",
        pseudo: "",
        email: "",
        password: "",
        password_confirmation: "",
        code_postal: "",
        ville: "",
      });
      onRegisterSuccess(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    }
  };

  const villesOptions: ISelectBoxOption[] = [
    { label: "Paris", value: "Paris" },
    { label: "Lyon", value: "Lyon" },
    { label: "Marseille", value: "Marseille" },
    { label: "Toulouse", value: "Toulouse" },
    { label: "Nice", value: "Nice" },
    { label: "Nantes", value: "Nantes" },
    { label: "Strasbourg", value: "Strasbourg" },
    { label: "Montpellier", value: "Montpellier" },
    { label: "Bordeaux", value: "Bordeaux" },
    { label: "Lille", value: "Lille" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Créer un compte</h2>
      <form className="space-y-6">
        <FloatingInput
          type="text"
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="text"
          label="Prénom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="text"
          label="Pseudo"
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          label="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          label="Confirmation du mot de passe"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="text"
          label="Code postal"
          name="code_postal"
          value={formData.code_postal}
          onChange={handleChange}
          required
        />

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-left">
          {" "}
          Ville{" "}
        </p>
        <SelectBox
          label=""
          name="ville"
          value={formData.ville}
          options={villesOptions}
          onChange={handleChange}
          required={true}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <Button
          onClick={handleSubmit}
          label="Créer un compte"
          icon={<FaSave className="w-4 h-4 mr-2" />}
        />
      </form>
    </div>
  );
};

export default Register;
