import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Context, Markup } from 'telegraf';
import { mainMenu } from './helpers/mainMenu.helper';
import { userName } from './helpers/userName';
import { userPhone } from './helpers/userPhone';
import { mainUser } from './helpers/mainUser';
import { change_user_data } from './helpers/changeUserData';

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

  // USER REGISTRATION
  async registration(ctx: Context) {
    try {
      const user_id = String(ctx.from.id);

      let user = await this.userRepository.findOne({
        where: { user_id },
      });

      if (!user) {
        user = await this.userRepository.create({
          user_id,
          last_name: ctx.from.last_name,
          first_name: ctx.from.first_name,
          status: true,
          last_state: 'register_mijoz',
          username: ctx.from.username,
        });

        await userName(ctx);
      } else if (!user?.phone_number) {
        user.last_state = 'contact_mijoz';

        await user.save();
        await userPhone(ctx);
      } else {
        user.last_state = 'main_mijoz';
        await user.save();
        await mainUser(ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeMijozData(ctx: Context) {
    try {
      let user = await this.userRepository.findOne({
        where: { user_id: String(ctx.from.id) },
      });

      if (!user) {
        return mainMenu(ctx);
      }
      if (user.last_state == 'main_mijoz') {
        user.last_state = 'change_mijoz';
        await user.save();
        await change_user_data(ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
