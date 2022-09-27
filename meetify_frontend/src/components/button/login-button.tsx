import "./button.scss";

interface ButtonComponent {
  name?: string;
  children?: JSX.Element | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginButton = (props: ButtonComponent) => {
  const currentPath = window.location.pathname;

  return (
    <button className={`'login-button' ${props.className}`} value="submit">
      {currentPath.includes("login") ? "LOG IN" : "SIGN UP"}
    </button>
  );
};

export default LoginButton;
