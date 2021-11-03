const { MessageEmbed } = require("discord.js");
module.exports = {
name: "queue",
category: "Música",
desc: 'Mostra a lista de Música',
aliases: ['lista', 'fila'],
async execute(client, message, args, database) {
let embed = new MessageEmbed().setColor("RANDOM");
const { channel } = message.member.voice;
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!");
return message.reply(embed);
}
const serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
embed.setAuthor("Não há nada na fila!");
return message.reply(embed);
}
embed.setDescription(
`${serverQueue.songs
.map((song, index) => index + 1 + ". " + song.title)
.join("\n\n")}`,
{ split: true }
);
embed.setThumbnail(client.user.displayAvatarURL())    
message.reply(embed);
}
};
