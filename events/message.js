const prefix = "PREFIXO DO SEU BOT AQUI";

module.exports = async (client, message) => {

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
const commandFiles = fs.readdirSync(`./commands/${folder}`)
.filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
const command = require(`../commands/${folder}/${file}`);
client.commands.set(command.name, command);
}
}

if(message.author.bot || !message.content.startsWith(prefix)) return;
const args = message.content.slice(prefix.length).split(/ +/);
const cmdName = args.shift().toLowerCase();
const cmd = client.commands.get(cmdName) || client.commands.find(cmd =>     cmd.aliases && cmd.aliases.includes(cmdName));

if(!cmd) return message.reply(`O comando digitado: \`${cmdName}\` não existe!`);
try {
cmd.execute(client, message, args, database);
} catch(err) {
message.reply(`Comando com erro, por favor, vizualize o console`);
console.log(err);
}

}
