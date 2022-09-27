import { useState } from "react";

import {
  FormattedRoomDTO,
  MeetingDTO,
  RoomDTO,
  UserDTO,
} from "../../assets/sass/shared-interface";
import Table from "../../components/table/table";
import Button from "../../components/button/button";
import { formatRoomsData } from "../../utils/function-helpers";
import AppointMeetingModal from "../dashboard/apoint-meeting-modal";
import EditIcon from "../../assets/images/edit.png";
import DeleteIcon from "../../assets/images/delete.png";

interface MeetingRoomTableComponent {
  data: RoomDTO[] | FormattedRoomDTO[];
  dataKeys?: string[];
  meetingsData: MeetingDTO[];
  setShouldRefetch: (type: boolean) => void;
  userData: UserDTO[];
  authUser: any;
  handleRoomModal: any;
  handleDeleteRoomModal: any;
  isAdmin?: boolean;
}

const dataKeys = ["name", "status", "capacity", "activeMeetings", "action"];

const headerColumns = [
  {
    key: "name",
    value: "Name",
  },
  {
    key: "status",
    value: "Current Status",
  },
  {
    key: "capacity",
    value: "Capacity",
  },
  {
    key: "activeMeetings",
    value: "Active Appointments",
  },
  {
    key: "buttons",
    value: "",
  },
];

const EditRoomIcon = <img src={EditIcon} alt="edit" />;
const DeleteRoomIcon = <img src={DeleteIcon} alt="delete" />;

const MeetingRoomTable = (props: MeetingRoomTableComponent): JSX.Element => {
  const {
    data,
    meetingsData,
    setShouldRefetch,
    userData,
    authUser,
    handleRoomModal,
    handleDeleteRoomModal,
    isAdmin,
  } = props;
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [openedRoomData, setOpenedRoomData] = useState(null);

  const tableData = formatRoomsData(data, meetingsData);

  return (
    <>
      <Table
        data={tableData}
        keyRenderer={{
          capacity: (value: RoomDTO): JSX.Element => (
            <div>
              {value.capacity} {` Members`}
            </div>
          ),
          activeMeetings: (value: FormattedRoomDTO): JSX.Element => (
            <div>
              {value?.activeMeetings === 0
                ? "No future meetings"
                : `${value?.activeMeetings} future meetings`}
            </div>
          ),
          action: (room: any) => (
            <>
              {isAdmin && (
                <>
                  <button
                    onClick={() => {
                      handleDeleteRoomModal(room);
                    }}
                  >
                    {DeleteRoomIcon}
                  </button>

                  <button
                    onClick={() => {
                      handleRoomModal(room);
                    }}
                  >
                    {EditRoomIcon}
                  </button>
                </>
              )}

              <Button
                className="action-button"
                name={"Schedule meeting"}
                onClick={() => {
                  setIsScheduleModalOpen(true);
                  setOpenedRoomData(room);
                }}
              />
            </>
          ),
        }}
        dataKeys={dataKeys}
        headerColumns={headerColumns}
      />

      <AppointMeetingModal
        isOpen={isScheduleModalOpen}
        handleClose={setIsScheduleModalOpen}
        data={data}
        userData={userData}
        refetchData={setShouldRefetch}
        authUser={authUser}
        //@ts-ignore
        roomId={openedRoomData?._id}
      />
    </>
  );
};

export default MeetingRoomTable;
