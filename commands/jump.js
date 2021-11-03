const { MessageEmbed } = require("discord.js");
module.exports = {
name: "jump",
category: "Música",
desc: 'Pula para uma música específica da lista',
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
embed.setAuthor("Não há nada tocando que eu pudesse repetir")
return message.reply(embed);
}
if(!args[0]) {
embed.setAuthor(`Informe o número da música!`)
return message.reply(embed)
}    
if(isNaN(args[0])) {
embed.setAuthor("Informe um valor numérico!")
return message.reply(embed)
}
if(serverQueue.songs.length < args[0]) {
embed.setAuthor("Incapaz de encontrar esta música na fila!")
return message.reply(embed)
}
serverQueue.songs.splice(0, Math.floor(parseInt(args[0]) - 1))
serverQueue.connection.dispatcher.end()    
embed.setDescription(`Música pulada para a: - ${args[0]}`)
message.reply(embed)    
}
}
