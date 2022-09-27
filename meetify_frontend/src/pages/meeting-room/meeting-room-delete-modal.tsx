import { useState } from "react";
import axios from "axios";

import Button from "../../components/button/button";
import Modal from "../../components/modals/modal";
import successNotification from "../../components/notification/toast-notification";

interface MeetingRoomDeleteModalComponent {
  isOpen: boolean;
  data: any;
  handleClose: any;
  refetchData: (type: boolean) => void;
}

const MeetingRoomDeleteModal = (
  props: MeetingRoomDeleteModalComponent
): JSX.Element => {
  const { isOpen, handleClose, refetchData, data } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      //@ts-ignore
      await axios
        .delete(`http://localhost:8000/rooms/${data?._id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
        })
        .then(() => {
          refetchData(!isOpen);
          handleClose(true);
          successNotification("Room deleted successfully!");
        });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-blur" onClick={() => handleClose(false)} />
      )}
      <Modal open={isOpen}>
        <form onSubmit={handleSubmit}>
          <div className="modal-wrapper">
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h1>Delete Room? </h1>
              </div>
              <div>
                <h2>You are about to delete the following meeting room.</h2>
                <h2>Would you like to proceed?</h2>
              </div>
              <div className="details-container">
                <div className="room-name-container">
                  {data?.name}
                  <div className="title-container">
                    Current Status: {data?.status}
                  </div>
                  <div className="member-active-container">
                    <span>{data?.capacity} members</span>
                    <span>{data?.activeMeetings} active appointments</span>
                  </div>
                </div>
              </div>
              <div className="input-container"></div>
            </div>
            <div className="footer-section">
              <Button
                className="modal-button"
                name="Cancel"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose(false);
                }}
                loading={isLoading}
              />
              <Button
                className="modal-button-action action-button"
                name="Yes, delete"
                loading={isLoading}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MeetingRoomDeleteModal;
