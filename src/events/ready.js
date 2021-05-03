const client = require('../../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);
    client.user.setActivity(".help | BOOST US", { type: "PLAYING", url: "https://youtu.be/1HYaEDD48dk" })
})