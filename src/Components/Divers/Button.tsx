import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  color?: "blue" | "red" | "green" | "gray";
}

const Button = (props: ButtonProps) => {
  const hasLabel = !!props.label;
  const colorClass = {
    blue: {
      gradient: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
      focus: "focus:ring-blue-300 dark:focus:ring-blue-800",
    },
    red: {
      gradient: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
      focus: "focus:ring-red-300 dark:focus:ring-red-800",
    },
    green: {
      gradient: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
      focus: "focus:ring-green-300 dark:focus:ring-green-800",
    },
    gray: {
      gradient: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500",
      focus: "focus:ring-gray-300 dark:focus:ring-gray-500",
    },
  };

  return (
    <button
      onClick={props.onClick}
      type="button"
      disabled={props.disabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg text-sm 
        text-white ${colorClass[props.color ?? "blue"].gradient}
        hover:bg-gradient-to-br 
        focus:ring-4 focus:outline-none ${
          colorClass[props.color ?? "blue"].focus
        }
        disabled:opacity-90 disabled:cursor-not-allowed
        ${hasLabel ? "px-5 py-2.5" : "p-2 w-10 h-10"}
      `}
    >
      {/* Affiche l'icône si elle est présente, avec un espacement adapté */}
      {props.icon && (
        <span className={`${hasLabel ? "mr-2" : ""}`}>{props.icon}</span>
      )}

      {/* Affiche le label et le spinner si le bouton est en mode "loading" */}
      {hasLabel && (
        <span className="inline-flex items-center">
          {props.label}
          {props.loading && <FaSpinner className="animate-spin w-4 h-4 ml-2" />}
        </span>
      )}

      {/* Affiche uniquement le spinner si le bouton est en mode "loading" et qu'il n'y a pas de label */}
      {!hasLabel && props.loading && (
        <FaSpinner className="animate-spin w-4 h-4" />
      )}
    </button>
  );
};

export default Button;
