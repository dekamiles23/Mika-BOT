require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const comandos = [];
const pastaComandos = path.join(__dirname, 'commands');
for (const arquivo of fs.readdirSync(pastaComandos).filter(f => f.endsWith('.js'))) {
  const { data } = require(path.join(pastaComandos, arquivo));
  comandos.push(data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando comandos slash...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: comandos },
    );
    console.log(`✅ ${comandos.length} comando(s) registrado(s) com sucesso.`);
  } catch (err) {
    console.error('Erro ao registrar comandos:', err);
  }
})();
