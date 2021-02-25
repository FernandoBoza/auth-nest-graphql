import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService, JwtStrategy],
})
export class UserModule {}
