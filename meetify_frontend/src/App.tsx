import { Route, Routes } from "react-router-dom";

import Main from "./main/main";
import { AuthProvider } from "./pages/auth/components/auth-provides";
import { MeetingsProvider } from "./pages/contexts/meeting-context";
import { RoomsProvider } from "./pages/contexts/rooms-context";
import { UserProvider } from "./pages/contexts/user-context";
import "./utils/index";

import "./components/navbar/navbar.scss";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <RoomsProvider>
        <MeetingsProvider>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<Main />}></Route>
            </Routes>
          </AuthProvider>
        </MeetingsProvider>
      </RoomsProvider>
    </UserProvider>
  );
}

export default App;
