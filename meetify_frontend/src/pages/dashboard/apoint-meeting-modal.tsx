import { useState } from "react";
import Select, { MultiValue } from "react-select";
import axios from "axios";

import Button from "../../components/button/button";
import Modal from "../../components/modals/modal";
import successNotification from "../../components/notification/toast-notification";
import infoIcon from "../../assets/images//info-icon.png";
import { RoomDTO, UserDTO } from "../../assets/sass/shared-interface";

interface AppointMeetingModalComponent {
  isOpen: boolean;
  data: RoomDTO[];
  userData: UserDTO[];
  handleClose: (type: boolean) => void;
  refetchData: (type: boolean) => void;
  authUser: any;
  roomId?: string;
}

interface OptionInterface {
  value: string;
  label: string;
}

const infoPicture = <img src={infoIcon} alt="info" />;

const AppointMeetingModal = (
  props: AppointMeetingModalComponent
): JSX.Element => {
  const { isOpen, data, userData, handleClose, refetchData, authUser, roomId } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const [participants, setParticipants] =
    useState<MultiValue<OptionInterface>>();

  const getEmails = (): OptionInterface[] => {
    const userEmails: OptionInterface[] = [];

    userData.map((user) => {
      userEmails.push({ value: user._id, label: user.email });
    });

    return userEmails;
  };

  const selectOption = getEmails();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const getSubject = e.target.subject.value;
    const getMeeting = e.target.meeting.value;
    const getDate = e.target.date.value;
    const getStartTime = e.target.startTime.value;
    const getEndTime = e.target.endTime.value;
    const getMembers = participants;

    try {
      setIsLoading(true);
      await axios
        .post(
          "http://localhost:8000/meetings",
          {
            owner: authUser?.id,
            room: getMeeting,
            name: getSubject,
            members: getMembers,
            endTime: new Date(getDate + " " + getEndTime),
            startTime: new Date(getDate + " " + getStartTime),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then(() => {
          setIsLoading(false);
          handleClose(false);
          refetchData(!isOpen);
          successNotification("Appoint created successfully!");
        });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div className="parent-modal-container">
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
              <div className="left-section">
                <h1>Appoint Meeting</h1>
                <label htmlFor="meeting">Room</label>

                <select id="meeting-option" name="meeting">
                  {data.map((item: RoomDTO) => (
                    <option value={item?._id} selected={item?._id === roomId}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="subject">Name / Subject</label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter Subject"
                />

                <label htmlFor="calendar" id="calendar">
                  Pick Time{" "}
                  <span
                    className="info-icon"
                    title="Please choose the date in UTC format if you want to
              create a meeting "
                  >
                    {infoPicture}
                  </span>
                </label>

                <input type="date" name="date"></input>

                <input type="time" name="startTime" />

                <input type="time" name="endTime" />

                <label htmlFor="members">Add Members</label>
                <div>
                  <Select
                    className="custom-select"
                    isMulti
                    isSearchable
                    placeholder="Enter email"
                    options={selectOption}
                    onChange={(values: any) => {
                      setParticipants(values.map((value: any) => value.value));
                    }}
                  />
                </div>
              </div>
              <div className="right-section">
                <button
                  className="close-modal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose(false);
                  }}
                >
                  X
                </button>
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
    </div>
  );
};

export default AppointMeetingModal;
