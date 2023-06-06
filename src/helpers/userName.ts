import { Context, Markup } from 'telegraf';

export async function userName(ctx: Context) {
  try {
    await ctx.reply('Ismingizni kiriting', {
      parse_mode: 'HTML',
      ...Markup.removeKeyboard(),
    });
  } catch (error) {
    console.log(error);
  }
}
