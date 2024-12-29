import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@entities/User';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
