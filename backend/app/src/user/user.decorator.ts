import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DateTime } from 'luxon';

export interface RequestUserInfo {
  id: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const { user } = req;

    return {
      ...user,
      expiredAt: user.expiredAt ? DateTime.fromISO(user.expiredAt) : null,
    } as RequestUserInfo;
  },
);
