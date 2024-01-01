import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './movieRoom-create.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
