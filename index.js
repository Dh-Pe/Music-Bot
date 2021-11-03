const Discord = require('discord.js');
const client = new Discord.Client();
const token = "SEU TOKEN AQUI";

client.on('ready', async () => {
  console.log(`${client.user} está online!`)
})

client.on(token)
