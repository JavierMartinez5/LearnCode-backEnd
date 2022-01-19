import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "src/features/users/dto/create-user.dto";
import { ValidationPipe } from "../../../common/pipes/validation.pipe";
import { LoginDto } from "../dtos/login.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../providers/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginDto, @Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  public async createUser(
    @Body() body: CreateUserDto,
  ) {
    return this.authService.createUser(body);
  }
}
