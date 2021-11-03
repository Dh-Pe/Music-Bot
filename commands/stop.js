const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
module.exports = {
name: "stop",
category: "Música",
desc: 'Para a Música atual',
aliases: ['parar'],
async execute(client, message, args) {
let embed = new MessageEmbed()
.setColor("RANDOM");
const { channel } = message.member.voice;      
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!")
return message.reply(embed);
}
const serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
embed.setAuthor("Não há nada tocando que eu pudesse parar!")
return message.reply(embed);
}
serverQueue.songs = [];
serverQueue.connection.dispatcher.end();
}
};
