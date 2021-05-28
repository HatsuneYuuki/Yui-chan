const fs = require(`fs`);

module.exports = (client, Discord) => {
    const loaddir = (dirs) =>{
        const eventfile = fs.readdirSync(`./events/${dirs}`).filter(file = file.endsWith('.js'));

        for (const file of eventfile){
            const event = require(`../events/${dirs}/${file}`);
            const eventname = file.split('.')[0];
            client.on(eventname, event.bind(null, Discord, client));
        }
    }
    ['client', 'guild'].forEach(e => loaddir(e));
}