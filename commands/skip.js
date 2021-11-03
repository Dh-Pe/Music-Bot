const { MessageEmbed } = require("discord.js");
module.exports = {
name: "skip",
category: "Música",
desc: 'Pula para a próxima Música',
aliases: ['pular'],
async execute(client, message, args) {
let embed = new MessageEmbed()
.setColor("RANDOM");
const { channel } = message.member.voice;      
if (!channel) {
embed.setAuthor("Você precisa estar em um canal de voz!")
return message.reply(embed);
}
const serverQueue = message.client.queue.get(message.guild.id);
const vote = message.client.vote.get(message.guild.id)
if (!serverQueue) {
embed.setAuthor("Não há nada tocando que eu pudesse pular!")
return message.reply(embed);
}   
const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
console.log(message.guild.me.voice.channel.members.size)
if(!message.member.hasPermission("ADMINISTRATOR")) {
if(vote.vote > okie) {
serverQueue.connection.dispatcher.end();
embed.setDescription("VOTE - SKIP")
embed.setThumbnail(client.user.displayAvatarURL())
return message.reply(embed);
}
if(vote.voters.includes(message.author.id)) {
return message.reply("Você já votou nesta música")
}
if(vcvote === 2) {
serverQueue.connection.dispatcher.end();
embed.setDescription("✔ | Votação terminada!")
embed.setThumbnail(client.user.displayAvatarURL())
return message.reply(embed);
}            
vote.vote++
vote.voters.push(message.author.id)
return message.reply(`Você votou na música para pular, a propósito, atualmente precisamos de ${Math.floor(vcvote - vote.vote)} votes`)    
}
serverQueue.connection.dispatcher.end();
embed.setTitle("⏯️ | Música pulada!")
embed.setAuthor(message.guild.name, message.guild.iconURL())
embed.setDescription('Música pulada para a próxima >>')
embed.setThumbnail('https://images.macrumors.com/t/LGuWSa3kB8rIGbhA7CJm-zusWmg=/1200x1200/smart/article-new/2018/05/apple-music-note.jpg')
embed.setFooter(message.guild.name, message.guild.iconURL())
message.reply(embed);
}
};
