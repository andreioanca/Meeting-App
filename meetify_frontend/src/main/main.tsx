import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import DashBoard from "../pages/dashboard/dashboard";
import MeetingRoom from "../pages/meeting-room/meeting-room";
import YourSchedule from "../pages/your-schedule/your-schedule";
import LogIn from "../pages/auth/login";
import Register from "../pages/auth/register";
import { PrivateRoute } from "../pages/auth/components/private-routes";

const Main = () => {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Navigate to="/login" />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/meeting-rooms"
            element={
              <PrivateRoute>
                <MeetingRoom />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/your-schedule"
            element={
              <PrivateRoute>
                <YourSchedule />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default Main;
