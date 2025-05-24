import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";

interface ToastProps {
  type: "success" | "danger" | "warning";
  text: string;
  autoClose?: boolean;
}

const Toast = (props: ToastProps) => {
  const [visible, setVisible] = useState(true);

  // Gestion des icônes et couleurs
  const icons = {
    success: FaCheckCircle,
    danger: FaExclamationCircle,
    warning: FaExclamationTriangle,
  };
  const Icon = icons[props.type] || FaCheckCircle;

  const iconColors = {
    success: "green",
    danger: "red",
    warning: "orange",
  };
  const iconColor = iconColors[props.type] || "gray";

  // Fermeture automatique si activée
  useEffect(() => {
    if (!props.autoClose) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [props.autoClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 z-50"
      role="alert"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 text-${iconColor}-500 bg-${iconColor}-100 rounded-lg dark:bg-${iconColor}-800 dark:text-${iconColor}-200`}
      >
        <Icon size={20} />
      </div>
      <div className="ms-3 text-sm font-normal">{props.text}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        onClick={() => {
          setVisible(false);
        }}
      >
        <span className="sr-only">Close</span>
        <RiCloseLargeFill color="gray" />
      </button>
    </div>
  );
};

export default Toast;
