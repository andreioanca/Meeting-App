import { useContext, useEffect, useState } from "react";

import Card from "../../components/card/card";
import RightCard from "../../components/card/right-card";
import Button from "../../components/button/button";

import { MeetingContext } from "../contexts/meeting-context";
import { RoomsContext } from "../contexts/rooms-context";
import { UserContext } from "../contexts/user-context";
import { AuthContext } from "../auth/components/auth-provides";
import AppointMeetingModal from "./apoint-meeting-modal";

import { formatRoomsData } from "../../utils/function-helpers";

import "./dashboard.scss";
import MeetingRoomModal from "../meeting-room/meeting-room-modal";

const DashBoard = (): JSX.Element => {
  const { meetingsData, setShouldRefetch, shouldRefetch } =
    useContext(MeetingContext);
  const { roomsData } = useContext(RoomsContext);

  const shouldRefetchRooms = useContext(RoomsContext).shouldRefetch;
  const setShouldRefetchRooms = useContext(RoomsContext).setShouldRefetch;

  const { userData } = useContext(UserContext);
  const { auth }: any = useContext(AuthContext);

  const [formattedRoomsData, setFormattedRoomsData] = useState(roomsData);
  const [isEditModalOpen, setIsModalEditOpen] = useState(false);
  const [editRoomData, setEditRoomData] = useState(undefined);

  const [isOpen, setIsOpen] = useState(false);
  const [appointRoomId, setAppointRoomId] = useState("");

  const isAdmin = auth?.roles === "admin";

  useEffect(() => {
    setFormattedRoomsData(formatRoomsData(roomsData, meetingsData));
  }, [roomsData]);

  const formatDate = (activeDate: string): string => {
    const date = new Date(activeDate);

    return (
      "" +
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear() +
      " " +
      date.toLocaleTimeString("default", {
        hour: "numeric",
        minute: "2-digit",
      })
    );
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return new Date(start.valueOf() - end.valueOf()).getHours();
  };

  const handleEditModalOpen = (data: any) => {
    setIsModalEditOpen(!isEditModalOpen);
    setEditRoomData(data);
  };

  const handleAppointModal = (id: string) => {
    setIsOpen(true);
    setAppointRoomId(id);
  };

  return (
    <>
      <AppointMeetingModal
        isOpen={isOpen}
        handleClose={setIsOpen}
        data={roomsData}
        userData={userData}
        refetchData={() => setShouldRefetch(!shouldRefetch)}
        authUser={auth}
        roomId={appointRoomId}
      />

      <div className="dashboard-container">
        <div className="left-container">
          <div className="header-actions">
            <div>
              <h1>Welcome back!</h1>
              <p>
                Control your schedule, be flexible and appoint new meeting rooms
                with your co-workers whenever you need.
              </p>
            </div>
          </div>
          <div className="secondary-header">
            <div className="left-section">
              <h2>LAST UPDATES</h2>
            </div>
            <div className="right-section">
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="button third"
                name="Schedule a meeting"
              />
            </div>
          </div>

          <div className="card-container">
            {meetingsData.map((item: any) => (
              <Card
                className="first"
                title={item?.name}
                appointedFor={formatDate(item?.startTime)}
                appointedBy={item?.owner?.username}
                members={item?.members?.length}
                duration={`${calculateDuration(
                  item?.endTime,
                  item?.startTime
                )} h`}
              ></Card>
            ))}
          </div>
        </div>

        <div className="right-container">
          <h1>SCHEDULE A MEETING ROOM</h1>

          {formattedRoomsData.map((item: any) => (
            <RightCard
              className="second"
              id={item?._id}
              name={item?.name}
              currently={item?.status}
              capacity={item?.capacity}
              activeMeetings={item?.activeMeetings}
              handleEdit={handleEditModalOpen}
              handleAppoint={handleAppointModal}
              isAdmin={isAdmin}
            />
          ))}

          <MeetingRoomModal
            isOpen={isEditModalOpen}
            handleClose={setIsModalEditOpen}
            refetchData={() => setShouldRefetchRooms(!shouldRefetchRooms)}
            data={editRoomData}
            routeType={"put"}
          />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
