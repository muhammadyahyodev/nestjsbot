import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Context, Markup } from 'telegraf';
import { mainMenu } from './helpers/mainMenu.helper';

@Injectable()
export class AppService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async onStart(ctx: Context) {
    const user = await this.userRepository.findOne({
      where: { user_id: `${ctx.from.id}` },
    });

    if (user) {
      return await mainMenu(ctx);
    } else {
      await ctx.reply("Hurmatli foydalanuvchi, iltimos ro'yhatdan o'ting", {
        parse_mode: 'HTML',
        ...Markup.keyboard([["👤 Ro'yhatdan o'tish"]])
          .oneTime()
          .resize(),
      });
    }
  }
}
