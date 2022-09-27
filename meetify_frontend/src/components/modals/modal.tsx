import "./modal.scss";
import "../../utils/index";

export default function Modal({ open, children, onClose }: any) {
  if (!open) return null;
  return <div>{children}</div>;
}
