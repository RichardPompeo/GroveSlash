const Discord = require("discord.js");
const interactions = require("discord-slash-commands-client");
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const { Manager } = require("erela.js");
const fs = require("fs");
const glob = require("glob");
require("dotenv").config();

// const cmd = require("./src/commands/music/json/volume.json");

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
// const guildId = process.env.GUILD_ID;

const clientID = process.env.SPOTIFY_ID;
const clientSecret = process.env.SPOTIFY_SECRET;

const client = new Discord.Client();
client.interactions = new interactions.Client(token, clientId);

fs.readdir("./src/events/", (err, files) => {
  if (err) console.log(err);

  const eventsFiles = files.filter((file) => file.split(".").pop() == "js");

  if (eventsFiles.length <= 0) return;

  eventsFiles.forEach((file) => {
    require("./src/events/" + file);
  });
});

fs.readdir("./src/api", (err, files) => {
  if (err) console.log(err);

  const eventsFiles = files.filter((file) => file.split(".").pop() == "js");

  if (eventsFiles.length <= 0) return;

  eventsFiles.forEach((file) => {
    require("./src/api/" + file);
  });
});

client.on("ready", () => {
  console.log("Client is ready!");

  client.user.setActivity("New Slash Commands Available! 🎉🎉", {
    type: "LISTENING",
  });

  // client.interactions.createCommand(cmd).then(console.log).catch(console.log);

  glob("./src/commands/*/json", function (err, files) {
    files.forEach((filePath) => {
      fs.readdirSync(filePath).forEach((file) => {
        fs.readFile(filePath + "/" + file, "utf-8", function (err, content) {
          /* client.interactions
            .createCommand(JSON.parse(content))
            .then(console.log)
            .catch(console.log("rate limited")); */
        });
      });
    });
  });
});

client.on("raw", (d) => {
  client.manager.updateVoiceState(d);
});

require("./src/build/extensions/player");
client.manager = new Manager({
  nodes: [
    {
      host: process.env.HOST,
      password: process.env.PASSWORD,
      retryDelay: 5000,
      identifier: process.env.IDENTIFIER,
    },
  ],
  plugins: [new Spotify({ clientID, clientSecret }), new Deezer()],
  autoPlay: true,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})

  .on("nodeConnect", (node) => {
    console.log(`[NODE] - ${node.options.identifier} conectado.`);
  })

  .on("nodeError", (node, error) => {
    console.log(`[NODE] - Error: ${error.message}.`);
  })

  .on("trackStart", (player, track) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Tocando agora")
      .setDescription(`[${track.title}](${track.uri})`)
      .setColor(client.guilds.cache.get(player.guild).me.roles.highest.color);

    client.channels.cache
      .get(player.textChannel)
      .send(embed)
      .then((msg) => {
        player.set("message", msg);
      });
  })

  .on("socketClosed", (player, payload) => {
    if (payload.byRemote == true) {
      player.destroy();
    }
  })

  .on("trackEnd", (player) => {
    if (player.get("message") && !player.get("message").deleted) {
      player.get("message").delete();
    }
  })

  .on("trackStuck", (player, track, payload) => {
    if (player.get("message") && !player.get("message").deleted) {
      player.get("message").delete();
    }

    let embed = new Discord.MessageEmbed()
      .setTitle("Erro inesperado")
      .setColor(client.guilds.cache.get(player.guild).me.roles.highest.color);

    client.channels.cache.get(player.textChannel).send(embed);
  })

  .on("trackError", (player, track, payload) => {
    if (!player.get("message")) {
      return;
    }

    if (player.get("message") && !player.get("message").deleted) {
      player.get("message").delete();
    }

    let embed = new Discord.MessageEmbed()
      .setTitle("Erro inesperado")
      .setColor(client.guilds.cache.get(player.guild).me.roles.highest.color);

    client.channels.cache.get(player.textChannel).send(embed);
  })

  .on("playerMove", (player, currentChannel, newChannel) => {
    player.voiceChannel = client.channels.cache.get(newChannel);
  })

  .on("queueEnd", (player) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Queue finalizada")
      .setColor(client.guilds.cache.get(player.guild).me.roles.highest.color);

    client.channels.cache.get(player.textChannel).send(embed);
    player.destroy();
  });

client.once("ready", () => {
  client.manager.init(client.user.id);
});

client.login(token);

module.exports = {
  client,
  Manager,
};
