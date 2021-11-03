const { MessageEmbed, Util } = require("discord.js");
const ms = import('parse-ms');
const { youtubeapikey, color, embedcolor, queuel } = require('../../systems/config.js');
module.exports = {
name: "play",
category: "Música",
desc: 'Toca uma música ou adiciona uma música a fila',
aliases: ['p'],
async execute(client, message, args, database) {
let db = await database.ref(`Guildas/${message.guild.id}/Servidor`).once('value');
if(db.val().premium == false) return message.reply('Você precisa ter **Premium** no servidor para ter esse sistema!')
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(youtubeapikey);
const { play } = require("../../systems/music.js");
let embed = new MessageEmbed()
.setColor(color);
if (!args.length) {
embed.setAuthor("Use +play <url> ou <texto>!")
return message.reply(embed);
}
const { channel } = message.member.voice;
if (!channel) {
embed.setAuthor("você deve estar em um canal de voz!")
return message.reply(embed);
}
const targetsong = args.join(" ");
const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
const urlcheck = videoPattern.test(args[0]);
if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
embed.setAuthor("Não consigo reproduzir a playlist por enquanto")
return message.reply(embed);
}
const serverQueue = message.client.queue.get(message.guild.id);
const queueConstruct = {
textChannel: message.channel,
channel,
connection: null,
songs: [],
loop: false,
volume: 100,
playing: true
};    
const voteConstruct = {
vote: 0,
voters: []
}
let songData = null;
let song = null;
if (urlcheck) {
try {
songData = await ytdl.getInfo(args[0]);
song = {
title: songData.videoDetails.title,
url: songData.videoDetails.video_url,
duration: songData.videoDetails.lengthSeconds,
author: message.author,
thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
likes: songData.videoDetails.likes,
dislikes: songData.videoDetails.dislikes
};
} catch (error) {
if (message.include === "copyright") {
return message
.reply("Há conteúdos de direitos autorais nesse vídeo!")
.catch(console.error);
} else {
console.error(error);
}
}
} else {          
try {
const result = await youtube.searchVideos(targetsong, 1);
songData = await ytdl.getInfo(result[0].url);      
song = {
title: songData.videoDetails.title,
url: songData.videoDetails.video_url,
duration: songData.videoDetails.lengthSeconds,
thumbnail: songData.videoDetails.thumbnails[3].url,
author: message.author,
dislikes: songData.videoDetails.dislikes,
likes: songData.videoDetails.likes
};
} catch (error) {
console.log(error)
if(error.errors[0].domain === "usageLimits") {
return message.reply("Seu limite de API do YT acabou e será restaurado em 24 horas!")
}
}
}
if (serverQueue) {
if(serverQueue.songs.length > Math.floor(queuel - 1) && queuel !== 0) {
return message.reply(`You can not add songs more than ${queuel} in queue`)
}      
serverQueue.songs.push(song);
embed.setAuthor("Adicionado nova música a lista", client.user.displayAvatarURL())
embed.setDescription(`**[${song.title}](${song.url})**`)
embed.setThumbnail(song.thumbnail)
.setFooter("Likes - " + songData.videoDetails.likes + ", Dislikes - " +  songData.videoDetails.dislikes)    
return serverQueue.textChannel
.reply(embed)
.catch(console.error);
} else {
queueConstruct.songs.push(song);
}
if (!serverQueue)
message.client.queue.set(message.guild.id, queueConstruct);
message.client.vote.set(message.guild.id, voteConstruct);
if (!serverQueue) {
try {
queueConstruct.connection = await channel.join();
play(queueConstruct.songs[0], message, ms);
} catch (error) {
console.error(`Não foi possível entrar no canal de voz: ${error}`);
message.client.queue.delete(message.guild.id);
await channel.leave();
return message.reply({
embed: {
description: `😭 | Não foi possível entrar no canal: ${error}`,
color: "#ff2050"
}
})
.catch(console.error);
}
}
}
};
