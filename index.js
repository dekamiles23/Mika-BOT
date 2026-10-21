require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Carrega comandos
client.commands = new Collection();
const pastaComandos = path.join(__dirname, 'commands');
for (const arquivo of fs.readdirSync(pastaComandos).filter(f => f.endsWith('.js'))) {
  const comando = require(path.join(pastaComandos, arquivo));
  client.commands.set(comando.data.name, comando);
}

// Carrega eventos
const pastaEventos = path.join(__dirname, 'events');
for (const arquivo of fs.readdirSync(pastaEventos).filter(f => f.endsWith('.js'))) {
  const evento = require(path.join(pastaEventos, arquivo));
  if (evento.once) {
    client.once(evento.name, (...args) => evento.execute(...args, client));
  } else {
    client.on(evento.name, (...args) => evento.execute(...args, client));
  }
}

client.login(process.env.TOKEN);










