import user from "../../assets/images/user.svg";
import clock from "../../assets/images/clock.svg";
import Edit from "../../assets/images/edit.png";

import "./card.scss";

interface CardComponent {
  className?: string;
  title?: string;
  appointedFor?: string;
  appointedBy?: string;
  members?: string | number;
  duration?: string | number;
  clock?: string;
  currently?: string;
  capacity?: string;
  activeMeetings?: string;
}

const Card = (props: CardComponent): JSX.Element => {
  const m = 2;
  const userImage = <img src={user} alt="user" />;
  const durationImage = <img src={clock} alt="clock" />;

  return (
    <div className="container">
      <div
        style={{ gridTemplateColumns: `repeat(${m}, 1fr)` }}
        className={`card ${props.className}`}
      >
        <div>
          <h3 style={{ fontSize: "17px", textTransform: "uppercase" }}>
            {props.title}
          </h3>
          <p>
            <span style={{ color: "#8A8A8A", paddingRight: "5px" }}>
              Appointed For
            </span>{" "}
            {props.appointedFor}
          </p>
          <p>
            <span style={{ color: "#8A8A8A", paddingRight: "10px" }}>
              Appointed By{" "}
            </span>{" "}
            {props.appointedBy}
          </p>
        </div>
        <div className="right-icons">
          <div className="row-icon-info">
            {userImage}
            {props.members}
          </div>
          <div className="row-icon-info">
            {durationImage}
            {props.duration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
