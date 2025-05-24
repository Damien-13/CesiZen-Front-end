import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";

type View = "login" | "register" | "reset";

const AuthPage: React.FC = () => {
  const [view, setView] = useState<View>("login");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      {view === "login" && (
        <>
          <Login />
          <div className="mt-4 text-sm text-center space-y-2 text-gray-600">
            <p>
              <button
                onClick={() => setView("reset")}
                className="text-blue-600 hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </p>
            <p>
              Vous n’avez pas encore de compte ?{" "}
              <button
                onClick={() => setView("register")}
                className="text-blue-600 hover:underline"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </>
      )}

      {view === "register" && (
        <>
          <Register onRegisterSuccess={(success) => success && setView("login")} />
          <div className="mt-4 text-sm text-center">
            <button
              onClick={() => setView("login")}
              className="text-blue-600 hover:underline"
            >
              Retour à la connexion
            </button>
          </div>
        </>
      )}

      {view === "reset" && (
        <>
          <PasswordReset onSuccess={() => setView("login")} />
          <div className="mt-4 text-sm text-center">
            <button
              onClick={() => setView("login")}
              className="text-blue-600 hover:underline"
            >
              Retour à la connexion
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthPage;
