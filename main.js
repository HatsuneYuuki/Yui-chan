const Discord = require('discord.js');
require('dotenv').config();

const { execute } = require('./commands/play');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command', 'events'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.bottoken);