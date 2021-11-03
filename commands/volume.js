const { MessageEmbed } = require("discord.js");
const config = require('../../systems/config.js');
module.exports = {
name: "volume",
category: "Música",
desc: 'Altera o volume atual da Música',
aliases: ['vol'],
async execute(client, message, args) {
let embed = new MessageEmbed().setColor("RANDOM");
const { channel } = message.member.voice;
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!")
return message.reply(embed);
}    
const serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
embed.setAuthor("O bot não está tocando nada!")
return message.reply(embed);
}    
if(!args[0]) {
embed.setAuthor(`Volume: ${serverQueue.volume}`)
return message.reply(embed)
}
if(isNaN(args[0])) {
embed.setAuthor("Para alterar o volume, ele deve ser numérico!")
return message.reply(embed)
}    
if(args[0] > 200) {
embed.setAuthor("Você deve colocar um volume abaixo de 200!")
return message.reply(embed)
}    
serverQueue.volume = args[0]
serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
embed.setDescription(`Volume alterado para: **${args[0]}**`)
embed.setThumbnail(client.user.displayAvatarURL())
message.reply(embed)    
}
};
