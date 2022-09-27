import { useState, createContext, useEffect } from "react";
import axios from "axios";

interface RoomsContextInterface {
  roomsData: any[];
  setRoomsData: any;
  setShouldRefetch: any;
  shouldRefetch: boolean;
}

export const RoomsContext = createContext<RoomsContextInterface>({
  roomsData: [],
  setRoomsData: undefined,
  setShouldRefetch: undefined,
  shouldRefetch: false,
});

export const RoomsProvider = ({ children }: any) => {
  const [roomsData, setRoomsData] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const getRoomsData = () =>
    axios.get("http://localhost:8000/rooms").then((response: any) => {
      setRoomsData(response.data);
    });

  useEffect(() => {
    getRoomsData();
  }, [shouldRefetch]);

  return (
    <RoomsContext.Provider
      value={{ roomsData, setRoomsData, setShouldRefetch, shouldRefetch }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
