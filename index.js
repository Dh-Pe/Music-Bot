//Packges

const Discord = require('discord.js');
const client = new Discord.Client();
const token = "SEU TOKEN AQUI";
const fs = require('fs');
client.queue = new Map();
client.vote = new Map();

//Handler para eventos

var Eventos = fs.readdirSync('./events')
Eventos.forEach(f => {
const Empty = f.split('.')[0]
const None = require(`../events/${f}`)
client.on(Empty, None.bind(null, client))
});

//Ligando o Bot

client.login(token)
