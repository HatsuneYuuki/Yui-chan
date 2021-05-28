module.exports = (Discord, client, message) =>{
    const prefix = ('L');
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command)
    if(cmd) command.excute(client, message, args, Discord);
}