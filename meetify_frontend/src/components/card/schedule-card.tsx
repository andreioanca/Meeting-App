import ScheduleButton from "../button/schedule-button";

import clockIcon from "../../assets/images/clock.png";
import calendarIcon from "../../assets/images/calendar.png";
import userIcon from "../../assets/images/user.svg";

import "./schedule-card.scss";

interface ScheduleCardComponent {
  className?: string;
  id?: string;
  title?: string;
  name?: string;
  duration?: string;
  dateBooked?: string;
  members?: number;
}
const userImage = <img src={userIcon} alt="user"></img>;

const clockImage = <img src={clockIcon} alt="user"></img>;
const calendarImage = <img src={calendarIcon} alt="calendar"></img>;

const ScheduleCard = (props: ScheduleCardComponent) => {
  return (
    <>
      <div className={`main-container ${props.className}`}>
        <h3 className="left-section">{props.title}</h3>
        <div className="right-section">
          <p> {props.name}</p>
          <p className="clock-element">
            {clockImage}
            {props.duration}
          </p>
          <p>
            {calendarImage}
            {props.dateBooked}
          </p>
          <p>
            {userImage}
            {props.members}
          </p>
          <ScheduleButton className="schedule" />
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;
