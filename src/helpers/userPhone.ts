import { Context, Markup } from 'telegraf';

export async function userPhone(ctx: Context) {
  try {
    await ctx.reply("'Telefon raqam yuborish 📞' tugmasini bosing", {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        [Markup.button.contactRequest('Telefon raqam yuborish 📞')],
      ]).resize(),
    });
  } catch (error) {
    console.log(error);
  }
}
