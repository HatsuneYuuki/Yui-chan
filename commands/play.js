const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(client, message, cmd, args, Discord){
        
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return message.channel.send('Vào Phòng Đi Rồi Dùng Mình Nhé :smile:');
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has('CONNECT')) return message.channel.send('Chưa Đủ Permissions');
                if (!permissions.has('SPEAK')) return message.channel.send('Chưa Đủ Permissions');
                
                const server_queue = queue.get(message.guild.id);

                if (command === 'play'){
                    if (!args.length) return message.channel.send('Hãy Viết Tên Bài Ra :sweat_smile:');
                    let song = {};

                    if(ytdl.validateURL(args[0])) {
                        const songinfo = await ytdl.getInfo(args[0]);
                        song = { title: songinfo.videoDetails.title, url: songinfo.videoDetails.video_url }
                    } else {

                        const videoFinder = async (query) => {
                            const videoResult = await ytSearch(query);
                            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                        }

                        const video = await videoFinder(args.join(' '));
                        if(video) {
                            song = { title: video.title, url: video.url }
                        } else {
                            message.channel.send('Không Tìm Thấy Bài Nào Cả :cry:');
                        }
                    }
                if (!server_queue){

                    const queueconstructor = {
                        voiceChannel: voiceChannel,
                        textchannel: message.channel,
                        connection: null,
                        song: []
                    }
                queue.set(message.guild.id, queueconstructor);
                queueconstructor.songs.push(song);

                try{
                    const connection = await voiceChannel.join();
                    queueconstructor.connection = connection;
                    video_player(message.guild, queueconstructor.song[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('Xảy ra lỗi kết nối!');
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`đã thêm **${song.title}** vào danh sách ♪`)
            }
        }
    }
}
    const video_player = async (guild, song) => {
        const songqueue = queue.get(guild.id);
        if(!song) {
            songqueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const stream = ytdl(song.url, { filter: 'audioonly' });
        songqueue.connection.play(stream, { seek: 0, volume: 1 })
        .on('finish', () => {
            songqueue.song.shift();
            video_player(guild, songqueue.songs[0]);
        });
        await songqueue.textchannel.send(`♫ Đang Nghe **${song.title}**`)
    }