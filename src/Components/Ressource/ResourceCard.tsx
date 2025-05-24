import Button from "../Divers/Button.tsx";
import { IRessource } from "../../types/Ressource.ts";
import { FaReadme } from "react-icons/fa";

interface ResourceCardProps {
  index: number;
  ressource: IRessource;
  onConsulter: () => void;
}

const ResourceCard = ({ ressource, onConsulter }: ResourceCardProps) => {
  return (
    <div className="h-[300px] w-full max-w-sm flex flex-col">
      <h2 className="sr-only">Résumé</h2>
      <div className="flex flex-col justify-between h-full w-full rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 text-left">
        <dl className="flex flex-col flex-grow">
          <div className="px-6 pt-6 text-sm text-gray-500 font-medium">
            {new Date(ressource.created_at).toLocaleDateString()}
          </div>

          <div className="px-6 pt-2 font-semibold text-gray-900">
            <p className="text-lg truncate">{ressource.titre}</p>
            <p className="mt-1 text-sm text-gray-700 truncate">
              {ressource.user?.pseudo}
            </p>
          </div>

          <div className="mt-4 px-6 pb-4 flex-grow">
            <p className="text-sm text-gray-500 leading-snug line-clamp-5">
              {ressource.description}
            </p>
          </div>
        </dl>

        <div className="flex gap-4 border-t border-gray-200 px-6 py-4">
          <Button
            label="Consulter"
            onClick={onConsulter}
            icon={<FaReadme size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
