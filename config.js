require('dotenv').config();

module.exports = {
  SERVER_INVITE_URL: process.env.SERVER_INVITE_URL || 'https://discord.gg/SEU_CONVITE',
  SERVER_VOICE_LINK: process.env.SERVER_VOICE_LINK || 'https://discord.com/channels/SEU_GUILD_ID/SEU_CANAL_DE_VOZ',
  BOT_ACTIVITY_NAME: process.env.BOT_ACTIVITY_NAME || 'Miles on the Road',
};
