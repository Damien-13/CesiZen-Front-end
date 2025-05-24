import { FaCheck, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import Button from "./Button";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: (confirmed: boolean) => void;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      dismissable={true}
      closeOnEsc={true}
      size="small"
      position="center"
    >
      <div className="text-center">
        <div className="flex flex-col items-center mb-5">
          <IoIosInformationCircleOutline size={45} color="gray" />
          <span className="mt-2 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
            {message}
          </span>
        </div>

        <div className="flex justify-evenly space-x-4 mt-6">
          <Button
            label="Valider"
            color="green"
            onClick={() => {
              onConfirm(true);
              onClose();
            }}
            icon={<FaCheck size={20}/>}
          />
          <Button
            label="Fermer"
            color="red"
            onClick={() => {
              onConfirm(false);
              onClose();
            }}
            icon={<FaTimes size={20}/>}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
