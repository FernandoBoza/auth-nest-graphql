import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/auth-nest'),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
    }),
    UserModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
