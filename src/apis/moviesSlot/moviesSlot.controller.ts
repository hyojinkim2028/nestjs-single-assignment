import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { MoviesSlotService } from './moviesSlot.service';
import { MovieSlot } from './entities/moviesSlot.entity';
import { CreateSlotDto } from './dto/movieSlot-create.dto';
import { UpdateSlotDto } from './dto/movieSlot-update.dto';

@Controller('slot')
export class MoviesSlotController {
    constructor(
        private readonly moviesSlotService: MoviesSlotService, //
    ) {}

    // 영화 상영시간대 전체 조회
    @Get()
    getAllSlot(): Promise<MovieSlot[]> {
        return this.moviesSlotService.findAllSlot();
    }

    // 영화 상영시간 상세 조회
    @Get('/:slotId')
    findOneById(
        @Param('slotId') slotId: number, //
    ): Promise<MovieSlot | string> {
        return this.moviesSlotService.findOneSlot({ slotId });
    }

    // 영화 상영시간 생성
    @Post()
    createSlot(@Body() slotData: CreateSlotDto): Promise<MovieSlot> {
        return this.moviesSlotService.create(slotData);
    }

    // 영화 상영시간 수정
    @Patch('/:slotId')
    updateSlot(
        @Param('slotId') slotId: number, //
        @Body() updateData: UpdateSlotDto,
    ): Promise<MovieSlot> {
        return this.moviesSlotService.update({ slotId }, updateData);
    }

    // 영화 상영시간 삭제
    @Delete('/:slotId')
    deleteSlot(
        @Param('slotId') slotId: number, //
    ): Promise<boolean> {
        return this.moviesSlotService.delete({ slotId });
    }
}
