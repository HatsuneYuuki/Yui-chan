module.exports = () =>{
    client.once('ready', () => {
        client.user.setActivity('This Made By Yuki ♥')
        console.log('ONLINE!');
    });
} 