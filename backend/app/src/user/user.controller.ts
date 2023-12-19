import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClassValidationPipe } from 'src/utils/pipes/class-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiBearerAuth()
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ClassValidationPipe()) dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }
}
