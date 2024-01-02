import { PartialType } from '@nestjs/mapped-types';
import { CreateSlotDto } from './movieSlot-create.dto';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {}
