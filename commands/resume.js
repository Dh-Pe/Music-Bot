const { MessageEmbed } = require("discord.js");
module.exports = {
name: "resume",
category: "Música",
desc: 'Despausa a música pausada',
aliases: ['res', 'continuar', 'cont'],
async execute(client, message, args) {
let embed = new MessageEmbed()
.setColor("RANDOM");
const { channel } = message.member.voice;      
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!")
return message.reply(embed);
}
const serverQueue = message.client.queue.get(message.guild.id);
if(serverQueue && !serverQueue.playing) {
serverQueue.playing = true;
serverQueue.connection.dispatcher.resume()
embed.setAuthor("✅ | Retomada da música pausada")
embed.setThumbnail(client.user.displayAvatarURL())
return message.reply(embed)
}
embed.setDescription("Não há nada pausado que eu possa retomar")
message.reply(embed)    
}
}
