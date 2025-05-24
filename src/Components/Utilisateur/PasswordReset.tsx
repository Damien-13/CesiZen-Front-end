import React, { useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import { API_BASE_URL } from "../../api/apiUrl";
import Button from "../Divers/Button";
import { MdOutlineLockReset } from "react-icons/md";

interface PasswordResetProps {
  onSuccess: () => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    // Vérification client : les deux mots de passe doivent être identiques
    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch(API_BASE_URL + "reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const data = isJson ? await res.json() : {};

      if (!res.ok) {
        if (data.errors) {
          const errors = data.errors as { [key: string]: string[] };
          const allErrors = Object.values(errors).flat();
          throw new Error(allErrors[0]);
        }
        throw new Error(data.message || "Erreur lors de la réinitialisation.");
      }

      setMessage("Mot de passe réinitialisé avec succès.");
      setFormData({ email: "", password: "", password_confirmation: "" });
      onSuccess();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Réinitialisation du mot de passe
      </h2>
      <form className="space-y-4 text-white">
        <FloatingInput
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          name="password"
          label="Nouveau mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          name="password_confirmation"
          label="Confirmation du mot de passe"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <Button
          label="Réinitialiser"
          icon={<MdOutlineLockReset size={20} />}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default PasswordReset;
