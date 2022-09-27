import { useState } from "react";
import axios from "axios";

import Button from "../../components/button/button";
import Modal from "../../components/modals/modal";
import successNotification from "../../components/notification/toast-notification";

interface MeetingRoomModalComponent {
  isOpen: boolean;
  data: any;
  handleClose: (type: boolean) => void;
  refetchData: (type: boolean) => void;
  roomId?: string;
  routeType: "put" | "post";
}

const MeetingRoomModal = (props: MeetingRoomModalComponent): JSX.Element => {
  const { isOpen, data, handleClose, refetchData, routeType = "post" } = props;
  const [isLoading, setIsLoading] = useState(false);

  const isPostRoute = routeType === "post";

  const handleSubmit = async (e: any) => {
    setIsLoading(true);

    e.preventDefault();
    const getName = e.target.name.value;
    const getCapacity = e.target.capacity.value;
    try {
      await axios[routeType](
        `http://localhost:8000/rooms${!isPostRoute ? `/${data?._id}` : ""}`,
        {
          name: getName,
          capacity: getCapacity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
        }
      ).then(() => {
        refetchData(true);
        setIsLoading(false);
        handleClose(false);
        successNotification(
          `Room ${isPostRoute ? "created" : "updated"} successfully!`
        );
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
                <h1>Add New Meeting </h1>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  defaultValue={data?.name}
                  required
                />

                <input
                  type="number"
                  name="capacity"
                  placeholder="Enter Capacity (number)"
                  defaultValue={data?.capacity}
                  required
                />
              </div>
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
                name="Save"
                loading={isLoading}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MeetingRoomModal;
