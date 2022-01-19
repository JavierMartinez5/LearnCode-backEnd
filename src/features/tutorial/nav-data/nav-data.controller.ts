import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common';
import { RequestFromJWT } from 'src/common/interfaces';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { CreateNavDataDto } from './dto/create-nav-data.dto';
import { UpdateBlockDto } from './dto/update-block-dto';
import { NavDataService } from './providers/nav-data.service';

@Controller('nav-data')
export class NavDataController {
  constructor(private readonly navDataService: NavDataService) {}
  @Get(':tutorialId')
  public async getAllNavData(
    @Param('tutorialId') tutorialId: string
  ) {
    return this.navDataService.getAllNavData(tutorialId) 
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  public async createNavData(
    @Body() body: CreateNavDataDto,
    @Request() req: RequestFromJWT
  ) {
    return this.navDataService.createNavData(body.tutorialId, body.data, req.user.role) 
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  updateNavData(@Body() body: UpdateBlockDto, @Request() req: RequestFromJWT) {
    return this.navDataService.updateNavData(body, req.user.role);
  }
}
