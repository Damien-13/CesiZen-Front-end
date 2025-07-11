import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/apiUrl";

const UserUpdate: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [] = useState({
    nom: "",
    prenom: "",
    email: "",
    pseudo: "",
    ville: "",
    code_postal: "",
  });

  const [message] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch(API_BASE_URL + "me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);



  return (

    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow text-gray-900 text-center">
  <h2 className="text-2xl font-bold mb-6">Mon profil</h2>

  {userData && (
    <div className="flex flex-col items-center gap-2 mb-6">
      <p><span className="font-semibold">Nom :</span> {userData.nom}</p>
      <p><span className="font-semibold">Prénom :</span> {userData.prenom}</p>
      <p><span className="font-semibold">Email :</span> {userData.email}</p>
      <p><span className="font-semibold">Pseudo :</span> {userData.pseudo}</p>
      <p><span className="font-semibold">Ville :</span> {userData.ville}</p>
      <p><span className="font-semibold">Code postal :</span> {userData.code_postal}</p>
    </div>
  )}

  

  {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
  {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
</div>

  );
};

export default UserUpdate;
