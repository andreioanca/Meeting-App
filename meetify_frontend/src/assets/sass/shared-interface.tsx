import { FC } from "react";

export interface RoomDTO {
  _id: string;
  name: string;
  capacity: string;
}

export interface FormattedRoomDTO extends RoomDTO {
  status?: string;
  activeMeetings?: number;
}

export interface MeetingDTO {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  owner: UserDTO;
  members: UserDTO[];
  room: RoomDTO;
}

export interface UserDTO {
  _id: string;
  email: string;
  roles: string;
  username: string;
}

export type EntityDTO = RoomDTO | MeetingDTO | UserDTO;

export interface KeyRendererType {
  [key: string]:
    | ((obj: RoomDTO) => JSX.Element)
    | ((obj: MeetingDTO) => JSX.Element)
    | ((obj: UserDTO) => JSX.Element)
    | string;
}
export interface KeyRendererCallableType {
  [key: string]: FC<RoomDTO | { [key: string]: string } | UserDTO | MeetingDTO>;
}
