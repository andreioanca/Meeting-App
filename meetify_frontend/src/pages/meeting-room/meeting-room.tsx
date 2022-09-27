import { useContext, useState } from "react";

import { MeetingContext } from "../contexts/meeting-context";
import { RoomsContext } from "../contexts/rooms-context";
import Button from "../../components/button/button";

import MeetingRoomTable from "./meeting-room-table";
import { UserContext } from "../contexts/user-context";
import AuthContext from "../auth/components/auth-provides";
import MeetingRoomModal from "./meeting-room-modal";
import MeetingRoomDeleteModal from "./meeting-room-delete-modal";

import "./meeting-room.scss";
import "../../assets/sass/global.scss";
import "../../components/modals/modal-small.scss";

const MeetingRoom = (): JSX.Element => {
  const { meetingsData } = useContext(MeetingContext);
  const { roomsData, setShouldRefetch, shouldRefetch } =
    useContext(RoomsContext);
  const { userData } = useContext(UserContext);
  const { auth }: any = useContext(AuthContext);

  const [isAddMeetingRoomOpen, setIsAddMeetingRoomOpen] = useState(false);
  const [meetingRoomModalData, setMeetingRoomModalData] = useState(undefined);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState("");

  const handleRoomModal = (data: any) => {
    setIsAddMeetingRoomOpen(!isAddMeetingRoomOpen);
    setMeetingRoomModalData(data);
  };

  const handleDeleteModal = (roomId: string) => {
    setIsDeleteModalOpen(!isAddMeetingRoomOpen);
    setDeleteModalData(roomId);
  };

  const isAdmin = auth?.roles === "admin";

  return (
    <>
      <h1 className="h1-meeting">Meeting Rooms</h1>
      <p className="p-meeting">
        Enter on a meeting room to see its calendar view of the events.
        {isAdmin && (
          <Button
            className="button third"
            name="Add a Meeting Room"
            onClick={() => {
              setIsAddMeetingRoomOpen(!isAddMeetingRoomOpen);
              setMeetingRoomModalData(undefined);
            }}
          />
        )}
      </p>

      <MeetingRoomDeleteModal
        isOpen={isDeleteModalOpen}
        handleClose={setIsDeleteModalOpen}
        refetchData={() => setShouldRefetch(!shouldRefetch)}
        data={deleteModalData}
      />

      <MeetingRoomModal
        isOpen={isAddMeetingRoomOpen}
        handleClose={setIsAddMeetingRoomOpen}
        refetchData={() => setShouldRefetch(!shouldRefetch)}
        data={meetingRoomModalData}
        routeType={meetingRoomModalData ? "put" : "post"}
      />

      <MeetingRoomTable
        data={roomsData}
        meetingsData={meetingsData}
        setShouldRefetch={() => setShouldRefetch(!shouldRefetch)}
        userData={userData}
        authUser={auth}
        handleRoomModal={handleRoomModal}
        handleDeleteRoomModal={handleDeleteModal}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default MeetingRoom;
