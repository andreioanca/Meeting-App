import { useState } from 'react';
import hidePassword from '../../assets/images/hide-password.png';

const ShowHidePassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const hidePasswordIcon = <img src={hidePassword} alt="password" />;

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <input type={passwordShown ? 'text' : 'password'} placeholder="Min 8 characters, one capital letter, one number"></input>

      <button className="show-hide-password" onClick={togglePassword}>
        {hidePasswordIcon}
      </button>
    </>
  );
};

export default ShowHidePassword;
