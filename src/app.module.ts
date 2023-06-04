import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { User } from './models/user.model';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'BotName',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [],
      }),
    }),
    SequelizeModule.forFeature([User]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_DB,
      models: [],
      autoLoadModels: true,
      logging: false,
    }),
  ],
  controllers: [],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
