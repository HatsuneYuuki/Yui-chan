const Discord = require ('discord.js');

module.exports = {
    name:'help',
    description:"Help!",
    execute(client, message, args){
        const Embed = new Discord.MessageEmbed()
        .setColor('#FC1C53')
        .setTitle('COMMANDS')
        .setURL('https://www.facebook.com/hatsuneyuuki.12/')
        .setAuthor('Yuki')
        .setDescription('This Are Commands You Can Know')
        .addFields(
            { name: 'Play', value: 'Play A Song'},
            { name: 'Stop', value: 'Stop The Song Are Playing'},
            { name: 'Help', value: 'Send The Commands!'}
        )
        .setImage('https://canhrau.com/wp-content/uploads/2021/02/trap-la-gi-hinh-9.jpg')
        .setFooter('Thanks You For Using Me!');
        
        message.channel.send(Embed);
    }
}