import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
}
