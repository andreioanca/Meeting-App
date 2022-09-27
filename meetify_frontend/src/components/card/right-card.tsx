import "./card.scss";

interface RightCardComponent {
  className: string;
  name: string;
  currently: string;
  capacity: string;
  activeMeetings: string;
  handleEdit: any;
  id: string;
  handleAppoint: any;
  isAdmin: boolean;
}

const renderCardRow = (
  title: string,
  value: string,
  isTitle: boolean = false
) => {
  return (
    <div className="card-row">
      <span className={isTitle ? "card-title" : "property"}>{title}</span>
      <span className="value">{value}</span>
    </div>
  );
};

const RightCard = (props: RightCardComponent): JSX.Element => {
  const {
    name,
    currently,
    capacity,
    activeMeetings,
    handleEdit,
    id,
    handleAppoint,
    isAdmin,
  } = props;

  return (
    <div className="card-right">
      <div className="card-container">
        {renderCardRow(name, "", true)}
        {renderCardRow("Currently", currently)}
        {renderCardRow("Capacity", `${capacity} Members`)}
        {renderCardRow("Active Meetings", `${activeMeetings} future meetings`)}
      </div>

      <div className="bottom-container">
        <span onClick={() => handleAppoint(id)}>APPOINT →</span>
        {isAdmin && (
          <span onClick={() => handleEdit({ ...props, _id: id })}>EDIT</span>
        )}
      </div>
    </div>
  );
};

export default RightCard;
