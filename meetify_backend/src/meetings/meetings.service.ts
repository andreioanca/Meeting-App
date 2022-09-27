import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Meetings, MeetingsDocument } from './meetings.model';

@Injectable()
export class MeetingsService {
  constructor(@InjectModel('meetings') private readonly meetingsModel: Model<MeetingsDocument>) {}

  async createMeetings(meetings: Meetings): Promise<Meetings> {
    const allMeetings = await this.meetingsModel.find({ room: meetings.room }).then(meetings => {
      return meetings;
    });
    const bookedMeetingsTimes = allMeetings.map(item => ({
      startTime: item.startTime,
      endTime: item.endTime,
    }));
    const meetingStartTime = new Date(meetings.startTime);
    const meetingEndTime = new Date(meetings.endTime);

    const checkTimeAvailability = () => {
      return bookedMeetingsTimes.filter(item => {
        return (
          (item.startTime.getTime() >= meetingStartTime.getTime() && meetingStartTime.getTime() <= item.endTime.getTime()) ||
          (item.endTime.getTime() >= meetingEndTime.getTime() && meetingEndTime.getTime() <= item.endTime.getTime())
        );
      });
    };

    if (!checkTimeAvailability().length) {
      const newMeeting = new this.meetingsModel(meetings);
      return newMeeting.save();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This room is already booked in this time interval',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async readMeetings() {
    return this.meetingsModel
      .find({})
      .populate(['owner', 'room', 'members'])
      .then(meetings => {
        console.log(meetings);
        return meetings;
      })
      .catch(err => console.log(err));
  }

  async readMeeting(id: ObjectId): Promise<Meetings> {
    return this.meetingsModel.findById(id);
  }

  async updateMeetings(id, data): Promise<Meetings> {
    return this.meetingsModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMeetings(id) {
    return this.meetingsModel.findByIdAndRemove(id);
  }
}
