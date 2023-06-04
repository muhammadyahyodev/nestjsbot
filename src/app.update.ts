import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { AppService } from './app.service';

@Update()
export class AppUpdate {
  constructor(private readonly appService: AppService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log('CONTEXT: ', Context);
    return this.appService.onStart(ctx);
  }
}
