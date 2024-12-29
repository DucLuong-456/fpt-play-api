import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseWithPrimaryKey } from '@entities/BaseWithPrimaryKey';
import { UserRole } from '@constants/userRole.enum';

@Entity()
export class User extends BaseWithPrimaryKey {
  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Enum(() => UserRole)
  role: UserRole;
}
