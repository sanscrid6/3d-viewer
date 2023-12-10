import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClassValidationPipe } from 'src/utils/pipes/class-validation.pipe';
import { CredentialsDto } from './dto/credentials.dto';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  public readonly authService: AuthService;

  @Post('/login')
  @Public()
  login(@Body(new ClassValidationPipe()) dto: CredentialsDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  @Public()
  register(@Body(new ClassValidationPipe()) dto: CredentialsDto) {
    return this.authService.register(dto);
  }
}
