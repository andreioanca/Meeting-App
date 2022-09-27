import "./button.scss";

interface ButtonComponent {
  name?: string;
  children?: JSX.Element | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

const Button: React.FC<ButtonComponent> = (props) => {
  const { onClick, className, name, loading = false } = props;

  return (
    <button
      className={`'action-button' ${className} ${
        loading ? "loading-button" : ""
      } `}
      onClick={onClick}
    >
      {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : name}
    </button>
  );
};

export default Button;
