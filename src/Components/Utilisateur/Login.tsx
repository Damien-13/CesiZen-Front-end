import React, { useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import { useUser } from "../../contexts/AuthContext.tsx";
import { API_BASE_URL } from "../../api/apiUrl.ts";
import { BiLogInCircle } from "react-icons/bi";
import Button from "../Divers/Button.tsx";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    try {
      const res = await fetch(API_BASE_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        throw new Error(data.message || "Échec de la connexion.");
      }

      setMessage("Connexion réussie.");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        setUser(data.user);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    }
  };

  return (
<div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          label="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <Button
          label="Se connecter"
          icon={<BiLogInCircle size={20} />}
          onClick={handleSubmit}
        />

      </form>
    </div>
  );
};

export default Login;
