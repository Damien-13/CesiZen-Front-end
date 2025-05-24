/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import { SelectBox } from "../Form/SelectBox";
import { ISelectBoxOption } from "../../types/SelectBoxOption";
import api from "../../api/apiConfiguration";
import Button from "../Divers/Button";
import { IRole } from "../../types/Role";
import { get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";

const token = localStorage.getItem("token");

interface AdminRegisterProps {
  onSuccess: () => void;
}

const AdminRegister: React.FC<AdminRegisterProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    password: "",
    password_confirmation: "",
    code_postal: "",
    ville: "",
    role_id: "2",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const payload = {
      ...formData,
      actif: true,
    };

    try {
      await api.post("users", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de la création du compte."
      );
    } finally {
      setLoading(false);
    }
  };

  //Récupération de tous les rôles
  const [roles, setRoles] = useState<IRole[]>([]);
  const getRoles = async () => {
    const response = await get<ApiResponse<IRole[]>>("roles");
    if (response?.status && response.data) {
      setRoles(response.data);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

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

  const rolesOptions: ISelectBoxOption[] = [
    ...roles.map((role) => ({
      label: role.name,
      value: String(role.id),
    })),
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-10">
        Créer un compte administrateur
      </h2>
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

        <p className="text-sm text-gray-400 mb-1 text-left">Ville</p>
        <SelectBox
          label=""
          name="ville"
          value={formData.ville}
          options={villesOptions}
          onChange={handleChange}
          required
        />

        <p className="text-sm text-gray-400 mb-1 text-left">Rôle</p>
        <SelectBox
          label=""
          name="role_id"
          value={formData.role_id}
          options={rolesOptions}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleSubmit} label="Créer un compte" />
      </form>
    </div>
  );
};

export default AdminRegister;
