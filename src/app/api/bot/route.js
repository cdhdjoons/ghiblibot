require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Create a Scene Now 🎨", web_app: { url: "https://ghibligame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "🔘 Follow on X 🐦", url: "https://x.com/ghibliai_bnb" }],
      [{ text: "🔘 Join Telegram Chat 💬", url: "https://t.me/ghibliai_bnb" }],
      [{ text: "🔘 Visit Website 🌐 ", url: "https://www.aighibli.io/"}],
    ],
  };

  const message = `
🧙 Welcome to AIGhibli! 🌿✨
You’ve entered a realm where imagination meets AI — where magical visuals unfold from your words.

🌟 What you can do here:
🎨 Generate whimsical AI artworks and dreamlike scenes
📖 Describe your own story and bring it to life
🌈 Explore peaceful, surreal, and fantastical landscapes
🖼 Save, collect, and share your unique creations
🧠 Let AI turn your imagination into stunning visuals

🚀 Ready to create your first masterpiece? Tap a button below and start your journey!
  `;

  const pngUrl = 'https://ghiblibot-sepia.vercel.app/ghiblipic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

