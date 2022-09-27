import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./toast-notification.scss";

const successNotification = (title: string) => {
  return toast.success(title, {
    className: "success-notification",
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default successNotification;
