module.exports = {
    name: 'stop',
    description: 'stop the bot and leave the channel',
    async execute(client, message, args, Discord) {
        const voiceChannel = message.member.voice.channel;
 
        await voiceChannel.leave();
        await message.channel.send('Dừng Nghe Và Thoát')
 
    }
}