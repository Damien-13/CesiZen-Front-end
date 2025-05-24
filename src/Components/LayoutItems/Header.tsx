import React, { useState, useRef, useEffect } from "react";
import logo from '../Icons/logo.png';
import { useUser } from "../../contexts/AuthContext";

const navLinks = [
  { label: "Conditions générales d'utilisation", href: "#" },
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "Contact", href: "#" },
];

const Header: React.FC = () => {
  const { user } = useUser(); // Récupération de l'utilisateur via le hook useUser
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Ferme le menu si clic dehors ou touche Échap
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="bg-blue-50 shadow px-4 py-2 flex items-center justify-between mb-5">
      {/* Logo à gauche */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo du site" className="h-10 w-10" />
      </div>

      {/* Pseudo utilisateur au centre, affiché seulement si connecté */}
      <div className="flex-1 text-center">
        {user && user['pseudo'] ? (
          <span className="text-lg font-semibold text-gray-800">{user['pseudo']}</span>
        ) : null}
      </div>

      {/* Menu burger (mobile) */}
      <div className="relative md:hidden">
        <button
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {/* Icône burger/close */}
          <span aria-hidden="true">
            {menuOpen ? (
              // Croix
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Burger
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </span>
        </button>
        {/* Menu déroulant mobile */}
        {menuOpen && (
          <div
            ref={menuRef}
            id="menu-mobile"
            className="absolute right-0 mt-2 z-50 bg-white shadow-lg rounded-lg w-60 py-2 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 focus:bg-blue-100 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Liens horizontaux (desktop) */}
      <nav className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-gray-700 hover:underline focus:underline text-sm font-medium transition"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
