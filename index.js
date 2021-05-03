const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const path = require('path')
const fs = require('fs')

const db = require("quick.db")

const schema = require("./src/schema")
const mongo = require("mongoose");
mongo.connect("mongodb+srv://jarno:GKG4hdfal@discordbot.tuqn8.mongodb.net/DiscordBotDB?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
useNewUrlParser: true,
    

})

const config = require('./config.json');
module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 



client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id })
    if(!data) return ful(0)
    ful(data.coins)
})

client.add = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins += coins
        } else {
            data = new schema({ id, coins })
        }
        data.save()
    }) 
}

client.rmv = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins
        } else {
            data = new schema({ id, coins: -coins })
        }
        data.save()
    }) 
}


client.on("message", message => {
    const coins = Math.floor(Math.random() * 5) + 1
    if (message.author.bot) return; 

    if (message.author.id) {
        client.add(message.author.id, coins)
    }

})



    

client.login(config.token);