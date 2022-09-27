import ScheduleCard from '../../components/card/schedule-card';
import ScheduleData from '../../mocks/schedule-data';
import './your-schedule.scss';

const YourSchedule = () => {
  return (
    <>
      <div className="schedule-container">
        <div className="first-container">
          <h1>Your Future Meetings</h1>

          {ScheduleData.map(item => (
            <ScheduleCard
              className={'schedule-card'}
              title={item.title}
              name={item.name}
              duration={item.duration}
              dateBooked={item.dateBooked}
              members={item.members}
            ></ScheduleCard>
          ))}
        </div>
        <div className="second-container">
          <h1>Your Past Meetings</h1>

          {ScheduleData.map(item => (
            <ScheduleCard className={'light-card'} title={item.title} name={item.name} duration={item.duration} dateBooked={item.dateBooked} members={item.members}></ScheduleCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default YourSchedule;
