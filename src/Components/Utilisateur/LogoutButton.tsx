import React from "react";
import Button from "../Divers/Button";
import { BiLogOutCircle } from "react-icons/bi";
import { API_BASE_URL } from "../../api/apiUrl";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token introuvable, suppression locale seulement.");
      localStorage.removeItem("user");
      return;
    }

    try {
      const res = await fetch(API_BASE_URL + "logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // Suppression du token et de l'utilisateur dans tous les cas
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (!res.ok) {
        console.error("Erreur lors de la déconnexion (backend).");
        return;
      }

      // Redirection après déconnexion réussie
      window.location.href = "/login";
    } catch (err) {
      console.error("Erreur réseau lors du logout", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      label="Se déconnecter"
      icon={<BiLogOutCircle size={20} />}
    />
  );
};

export default LogoutButton;
