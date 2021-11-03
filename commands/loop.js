const { MessageEmbed } = require("discord.js");
module.exports = {
name: "loop",
category: "Música",
desc: 'Ativa o Ciclo Infinito de Música',
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
embed.setAuthor("Não há nada tocando que eu pudesse repetir!")
return message.reply(embed);
}
serverQueue.loop = !serverQueue.loop    
embed.setDescription(`Loop é agora: **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
embed.setThumbnail(client.user.displayAvatarURL())
message.reply(embed)    
}
}
