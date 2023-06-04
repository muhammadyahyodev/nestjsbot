import { Context, Markup } from 'telegraf';

export async function mainMenu(ctx: Context) {
  try {
    await ctx.reply('Bosh sahifa', {
      parse_mode: 'HTML',
      ...Markup.keyboard([['Ok']])
        .resize()
        .oneTime(),
    });
  } catch (error) {
    console.log(error);
  }
}
