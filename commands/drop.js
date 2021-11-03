const { MessageEmbed } = require("discord.js");
module.exports = {
name: "drop",
category: 'Música',
desc: 'Deleta uma música da lista',
aliases: ['remover', 'retirar'],
async execute (client, message, args) {
let embed = new MessageEmbed().setColor("RANDOM");
const { channel } = message.member.voice;
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!");
return message.reply(embed);
}
const serverQueue = client.queue.get(message.guild.id);
if (!serverQueue) {
embed.setAuthor("A lista está vazia!");
return message.reply(embed);
}    
if(isNaN(args[0])) {
embed.setAuthor("Use valores numéricos!")
return message.reply(embed)
}   
if(args[0] > serverQueue.songs.length) {
embed.setAuthor("Incapaz de encontrar esta música!")
return message.reply(embed)
}   
serverQueue.songs.splice(args[0] - 1, 1)
embed.setDescription("Música retirada da lista!")
embed.setThumbnail(client.user.displayAvatarURL())
return message.reply(embed)
}
};
