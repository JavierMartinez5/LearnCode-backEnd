import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, Request } from '@nestjs/common';
import { TutorialNamesService } from './tutorial-names.service';
import { CreateTutorialNameDto } from './dto/create-tutorial-name.dto';
import { UpdateTutorialNameDto } from './dto/update-tutorial-name.dto';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { RequestFromJWT } from 'src/common/interfaces';

@Controller('tutorial-names')
export class TutorialNamesController {
  constructor(private readonly tutorialNamesService: TutorialNamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createTutorialNameDto: CreateTutorialNameDto, @Request() req: RequestFromJWT) {
    return this.tutorialNamesService.create(createTutorialNameDto, req.user.role);
  }

  @Get('getAll')
  findAll() {
    return this.tutorialNamesService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.tutorialNamesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorialNameDto: UpdateTutorialNameDto) {
    return this.tutorialNamesService.update(+id, updateTutorialNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorialNamesService.remove(+id);
  }
}
