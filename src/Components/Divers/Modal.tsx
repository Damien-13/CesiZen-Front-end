import React, { useEffect, useRef } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissable?: boolean; // Fermeture modal clic extérieur
  closeOnEsc?: boolean; // Fermeture modal ESC
  size?: "small" | "medium" | "large";
  position?: "center" | "top" | "bottom";
}

const Modal = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        props.dismissable &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        props.onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (props.closeOnEsc && e.key === "Escape") {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props.isOpen, props.onClose, props.dismissable, props.closeOnEsc]);

  if (!props.isOpen) return null;

  const sizeClass = {
    small: "w-[300px]",
    medium: "w-[500px]",
    large: "w-[800px]",
  }[props.size ?? "medium"];

  const positionClass = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
  }[props.position ?? "center"];

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center ${positionClass} bg-black/50 p-4`}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`relative bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-auto ${sizeClass}`}
      >
        <button
          onClick={props.onClose}
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <RiCloseLargeFill color="gray" size={20} />
          <span className="sr-only">Close modal</span>
        </button>

        {/* Modal content */}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
