import { Ctx, Start } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { AppService } from './app.service';

export class AppUpdate {
  constructor(private readonly appService: AppService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.appService.onStart(ctx);
  }
}
