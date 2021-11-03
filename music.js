//Packages

const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const queuel = 0;
const ms = require('parse-ms'); //parse-ms versão 2.1.0

//Exportar música

module.exports = {
  async play(song, message) {
  
  const queue = message.client.queue.get(message.guild.id);
  
  let embed = new MessageEmbed()
  .setColor(COLOR);
  
  if (!song) {
    queue.channel.leave();
    message.client.queue.delete(message.guild.id);
    embed.setAuthor("Lista de músicas finalizada!")
    return queue.textChannel.send(embed).catch(console.error);
  }

  try {
    var stream = await ytdlDiscord(song.url, {
      highWaterMark: 1 << 25
    });
  } catch (error) {
    if (queue) {
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
    }

    if (error.message.includes === "copyright") {
      return message.channel.send("Este vídeo contém direitos autorais!");
    } else {
      console.error(error);
    }
  }
    const dispatcher = queue.connection.play(stream, { type: "opus" }).on("finish", () => {

      if (queue.loop) {
        let lastsong = queue.songs.shift();
        queue.songs.push(lastsong);
        module.exports.play(queue.songs[0], message);
      } else {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }
    })
    .on("error", console.error)
    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    let tempo = ms(Number(song.duration) * 1000);
    embed.setAuthor(message.guild.name, message.guild.iconURL())
      .setTitle('🎧 | Comecei a tocar!')
      .addField('Música:', `[${song.title}](${song.url})`)
      .addField('Duração:', `${tempo.minutes}:${tempo.seconds}`, true)
      .addField('Adicionada por:', song.author, true)
      .setColor(embedcolor).setFooter(`Dislikes: ` + song.dislikes + ` | Likes: ` + song.likes, message.guild.iconURL())
      .setThumbnail(song.thumbnail)
    
    queue.textChannel.send(embed).catch(err => message.channel.send("Incapaz de tocar a música!"));
  }
};
