import { Context, Markup } from 'telegraf';

export async function mainUser(ctx: Context) {
  try {
    await ctx.reply('Bosh sahifa', {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['XIZMATLAR 📂'],
        ['TANLANGAN XIZMATLAR 📥'],
        ['MA’LUMOTLARNI O’ZGARTIRISH 📝'],
      ]).resize(),
    });
  } catch (error) {
    console.log(error);
  }
}
