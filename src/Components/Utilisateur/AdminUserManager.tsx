import React, { useEffect, useState } from "react";
import SwitchToggle from "../Divers/SwitchToggle";
import { FaPlus } from "react-icons/fa";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import AdminRegister from "../Utilisateur/AdminRegister";
import { API_BASE_URL } from "../../api/apiUrl";
import { useUser } from "../../contexts/AuthContext";

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  actif: boolean;
}

const AdminUserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const { user } = useUser();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL + "users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setUsers(result.data);
    } catch {
      console.error("Erreur lors de la récupération des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}admin/users/${id}/toggle`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUsers(); // Recharge après activation/désactivation
    } catch {
      console.error("Erreur lors de l’activation/désactivation.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">
        Gestion des comptes utilisateurs
      </h2>
      
      {user?.role_id === 1 && (
        <div className="mb-5">
          <Button
            icon={<FaPlus size={20} />}
            onClick={() => setModalFormVisible(true)}
          />
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">
          Chargement des utilisateurs...
        </p>
      ) : (
        <table className="mx-auto w-full max-w-3xl text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-4">
                Nom
              </th>
              <th scope="col" className="px-2 py-4">
                Prénom
              </th>
              <th scope="col" className="px-2 py-2">
                Email
              </th>
              <th scope="col" className="px-2 py-2">
                Actif
              </th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 50).map((user) => (
              <tr key={user.id} className="bg-white hover:bg-gray-50">
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {user.nom}
                </td>
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {user.prenom}
                </td>
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {user.email}
                </td>
                <td className="px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                  <SwitchToggle
                    checked={user.actif}
                    onToggle={() => toggleUser(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalFormVisible && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <div className="text-black p-4">
            <h3 className="text-xl font-semibold mb-4">Créer un compte</h3>
            <AdminRegister
              onSuccess={() => {
                setModalFormVisible(false);
                fetchUsers();
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminUserManager;
