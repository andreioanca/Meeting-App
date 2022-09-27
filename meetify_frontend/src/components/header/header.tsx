import Button from '../button/button';
import './header.scss';

interface HeaderComponent {
  heading: string;
  paragraph: string;
  className?: string;
}

const HeaderPage = (props: HeaderComponent) => {
  return (
    <div className="header-actions">
      <h1>{props.heading}</h1>
      <p>{props.paragraph}</p>

      <div className="right-section">
        <Button />
      </div>
    </div>
  );
};

export default HeaderPage;
