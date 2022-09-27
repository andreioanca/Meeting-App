import "./button.scss";

interface ButtonComponent {
  name?: string;
  children?: JSX.Element | string;
  className?: string;
}

const ScheduleButton = (props: ButtonComponent) => {
  return (
    <button className={`'schedule' ${props.className}`}>Leave Meeting</button>
  );
};

export default ScheduleButton;
