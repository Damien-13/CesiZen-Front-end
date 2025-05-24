import React from "react";

// J'ai laissé ce fichier comme ça aucun élément ne peut rester caché derrière la navbar grâce à l'écart de 50 pixels en bas de la page.
const Footer: React.FC = () => ( 
  <>
    <div className="h-[50px]" aria-hidden="true"></div>
  </>
);

export default Footer;
