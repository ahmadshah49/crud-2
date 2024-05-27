"use client";
import React, { useState } from "react";
import InputModal from "./InputModal";
interface ModalProps {
  title: string;
  isUpdate?: boolean;
}
const Modal: React.FC<ModalProps> = ({ title, isUpdate }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const openModal = () => {
    setModelOpen(true);
  };
  const closeModal = () => {
    setModelOpen(false);
  };
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-3 py-1 rounded "
        onClick={openModal}
      >
        {title}
      </button>
      {modelOpen && (
        <InputModal isUpdate={isUpdate} title={title} onClose={closeModal} />
      )}
    </div>
  );
};

export default Modal;
