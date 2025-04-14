"use client"
import { useModal } from "@/stores/modal.store";
import { X } from "lucide-react";
const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
      <div className="bg-white p-10 rounded shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="absolute top-2 right-2">
            <X />
        </button>
        {content}
      </div>
    </div>
  );
};

export { Modal };
