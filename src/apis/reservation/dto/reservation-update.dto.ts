import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './reservation-create.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
