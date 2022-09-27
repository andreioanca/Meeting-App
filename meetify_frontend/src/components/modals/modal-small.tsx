import { useState } from "react";
import "./modal-small.scss";

export function AuxiliaryModal({ open, children, onClose }: any) {
  const [isOpen, setIsOpen] = useState(false);

  if (!open) return null;

  return (
    <>
      <div>{children}</div>;
      <AuxiliaryModal open={isOpen} onClose={setIsOpen}></AuxiliaryModal>
    </>
  );
}
