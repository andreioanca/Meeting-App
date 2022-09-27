import axios from "axios";
import { useState, createContext, useEffect } from "react";

interface MeetingContextInterface {
  meetingsData: any[];
  setMeetingsData: any;
  setShouldRefetch: any;
  shouldRefetch: boolean;
}
export const MeetingContext = createContext<MeetingContextInterface>({
  meetingsData: [],
  setMeetingsData: undefined,
  setShouldRefetch: undefined,
  shouldRefetch: false,
});

export const MeetingsProvider = ({ children }: any) => {
  const [meetingsData, setMeetingsData] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const getMeetingsData = () =>
    axios.get("http://localhost:8000/meetings").then((response: any) => {
      setMeetingsData(response.data);
    });

  useEffect(() => {
    getMeetingsData();
  }, [shouldRefetch]);

  return (
    <MeetingContext.Provider
      value={{ meetingsData, setMeetingsData, setShouldRefetch, shouldRefetch }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
