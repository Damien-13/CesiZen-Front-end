import React, { useState, useRef, useEffect } from "react";
import {useUser} from "../../contexts/AuthContext.tsx";

// Interfaces
interface NavItem {
  key: string;
  tooltip: string;
  isCenter?: boolean;
  onClick?: () => void;
  icon: React.ReactNode; // Remplacement de JSX.Element par React.ReactNode
  srOnly: string;
  onlyAdmin?: boolean;
  isAdminMenu?: boolean;
}

interface AdminChoice {
  key: string;
  label: string;
}

// Données
const adminMenuChoices: AdminChoice[] = [
  { key: "categories", label: "Gestion des catégories" },
  { key: "ressources", label: "Gestion des ressources" },
  { key: "users", label: "Gestion des utilisateurs" },
  //{ key: "comments", label: "Gestion des commentaires" },
];

const Navbar: React.FC = ({isAdmin, setCurrentLayout, setAdminOption}) => {

  const [adminOpen, setAdminOpen] = useState(false);
  const adminRef = useRef<HTMLDivElement>(null);

  const onHome = () => setCurrentLayout('home');
  const onAdd = () => setCurrentLayout('new');
  const onProfile = () => setCurrentLayout('profile');

  const navItems: NavItem[] = [
    {
      key: "home",
      tooltip: "Accueil",
      onClick: onHome,
      srOnly: "Accueil",
      icon: (
          <svg
              className="w-6.5 h-6.5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
      ),
    },
    {
      key: "add",
      tooltip: "Ajouter du contenu",
      isCenter: true,
      onClick: onAdd,
      srOnly: "Ajouter du contenu",
      icon: (
          <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
          >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
            />
          </svg>
      ),
    },
    {
      key: "profile",
      tooltip: "Profil",
      onClick: onProfile,
      srOnly: "Profil",
      icon: (
          <svg
              className="w-7.5 h-7.5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
      ),
    },
    {
      key: "admin",
      tooltip: "Administration",
      onlyAdmin: true,
      isAdminMenu: true,
      srOnly: "Administration",
      icon: (
          <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
          >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg>
      ),
    },
  ];

  const onAdminChoice = (choice: string) => {
    setCurrentLayout('admin');
    setAdminOption(choice);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setAdminOpen(false);
      }
    };
    if (adminOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [adminOpen]);

  // Filtrer les boutons selon le statut admin
  const visibleNavItems = navItems.filter(
    (item: NavItem) => !item.onlyAdmin || isAdmin
  );

  // Adapter les classes de grille
  const gridColsClass = visibleNavItems.length === 4 
    ? "grid-cols-4" 
    : visibleNavItems.length === 3 
    ? "grid-cols-3" 
    : "grid-cols-5";

  // Récupérer les index des boutons non centraux
  const nonCenterIndexes = visibleNavItems
    .map((item: NavItem, idx: number) => (!item.isCenter ? idx : null))
    .filter((idx: number | null) => idx !== null) as number[];

  // Gestion des arrondis
  const getWrapperClass = (item: NavItem, index: number) => {
    if (item.isCenter) return "";
    if (index === nonCenterIndexes[0]) return "rounded-s-full";
    if (index === nonCenterIndexes[nonCenterIndexes.length - 1]) return "rounded-e-full";
    return "";
  };

  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className={`grid h-full max-w-lg mx-auto ${gridColsClass}`}>
        {visibleNavItems.map((item: NavItem, index: number) => {
          // Bouton central
          if (item.isCenter) {
            return (
              <div key={item.key} className="flex items-center justify-center">
                <div className="relative group flex flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="inline-flex items-center justify-center w-12 h-12 font-medium bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-colors duration-200 shadow-lg"
                  >
                    {item.icon}
                    <span className="sr-only">{item.srOnly}</span>
                  </button>
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                    {item.tooltip}
                  </span>
                </div>
              </div>
            );
          }
  
          // Bouton admin avec menu déroulant
          if (item.isAdminMenu) {
            return (
              <div
                key={item.key}
                className="relative group flex flex-col items-center justify-center h-full"
                ref={adminRef}
              >
                <button
                  type="button"
                  onClick={() => setAdminOpen((open) => !open)}
                  className={`w-full h-full flex flex-col items-center justify-center px-5 transition-colors duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${getWrapperClass(item, index)}`}
                >
                  {item.icon}
                  <span className="sr-only">{item.srOnly}</span>
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                  {item.tooltip}
                </span>
                {adminOpen && (
                  <div className="absolute bottom-full mb-12 right-0 min-w-max bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 animate-fade-in">
                    {adminMenuChoices.map((choice: AdminChoice) => (
                      <button
                        key={choice.key}
                        onClick={() => {
                          setAdminOpen(false);
                          onAdminChoice(choice.key);
                        }}
                        className="block w-full text-left px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100 transition"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
  
          // Boutons classiques
          return (
            <div
              key={item.key}
              className="relative group flex flex-col items-center justify-center h-full"
            >
              <button
                type="button"
                onClick={item.onClick}
                className={`w-full h-full flex flex-col items-center justify-center px-5 transition-colors duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${getWrapperClass(item, index)}`}
              >
                {item.icon}
                <span className="sr-only">{item.srOnly}</span>
              </button>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                {item.tooltip}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
  };

export default Navbar;
