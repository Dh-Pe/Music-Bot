const { MessageEmbed } = require("discord.js")
module.exports = {
name: "pause",
category: "Música",
desc: 'Pausa a Música atual',
aliases: ['ps'],
async execute(client, message, args) {
const { channel } = message.member.voice;
let embed = new MessageEmbed()
.setColor(config.COLOR);
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!")
return message.reply(embed);
}       
const serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
embed.setAuthor("Não tem nenhuma música tocando para pausar!")
return message.reply(embed);
}
if(serverQueue && serverQueue.playing) {
serverQueue.playing = false;
serverQueue.connection.dispatcher.pause(true)     
embed.setDescription("✅ | Música pausada!")
embed.setThumbnail(client.user.displayAvatarURL())
return message.reply(embed)
}  
}
}
