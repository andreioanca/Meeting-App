import { IsString, MinDate, MaxDate, IsDate, IsArray, ArrayNotEmpty } from 'class-validator';

export class MeetingsUpdateDto {
  @IsString()
  name: string;

  @IsString()
  roomId: string;

  @IsDate()
  @MinDate(new Date('8/01/2022'))
  startDate: Date;

  @IsDate()
  @MaxDate(new Date('7/01/2024'))
  endDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  members: string[];
}
