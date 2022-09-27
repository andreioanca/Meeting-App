import { MeetingDTO, RoomDTO } from "../assets/sass/shared-interface";

export const formatRoomsData = (
  roomsData: RoomDTO[],
  meetingsData: MeetingDTO[]
) => {
  return roomsData.map((item: RoomDTO) => {
    const meetings = meetingsData.filter(
      (meetingItem) => meetingItem?.room?._id === item?._id
    );

    return {
      ...item,
      status:
        new Date(meetings[0]?.startTime).valueOf() <= new Date().valueOf() &&
        new Date(meetings[0]?.endTime).valueOf() >= new Date().valueOf()
          ? "Occupied"
          : "Free",

      activeMeetings: meetingsData.filter(
        //@ts-ignore
        (meeting) => meeting?.room?._id === item?._id
      ).length,
    };
  });
};
