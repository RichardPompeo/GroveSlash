const { client } = require("../../index");

// Loading music commands
const play = require("../commands/music/js/play");
const join = require("../commands/music/js/join");
const queue = require("../commands/music/js/queue");
const pause = require("../commands/music/js/pause");
const stop = require("../commands/music/js/stop");
const skip = require("../commands/music/js/skip");
const np = require("../commands/music/js/np");
const lyrics = require("../commands/music/js/lyrics");
const remove = require("../commands/music/js/remove");
const shuffle = require("../commands/music/js/shuffle");
const loop = require("../commands/music/js/loop");
const volume = require("../commands/music/js/volume");
const move = require("../commands/music/js/move");
const search = require("../commands/music/js/search");
const clearQueue = require("../commands/music/js/clearQueue");

// Loading misc commands
const about = require("../commands/misc/js/about");
const help = require("../commands/misc/js/help");
const shardInfo = require("../commands/misc/js/shardInfo");

// Loading effects commands
const config = require("../commands/effects/js/config");

client.on("interactionCreate", async (interaction) => {
  const color = interaction.guild.me.roles.highest.color;

  switch (interaction.name) {
    // Returning music commands
    case "play":
      return play(interaction, client, color);
    case "join":
      return join(interaction, client, color);
    case "queue":
      return queue(interaction, client, color);
    case "pause":
      return pause(interaction, client, color);
    case "stop":
      return stop(interaction, client, color);
    case "skip":
      return skip(interaction, client, color);
    case "now-playing":
      return np(interaction, client, color);
    case "lyrics":
      return lyrics(interaction, client, color);
    case "remove":
      return remove(interaction, client, color);
    case "shuffle":
      return shuffle(interaction, client, color);
    case "loop":
      return loop(interaction, client, color);
    case "volume":
      return volume(interaction, client, color);
    case "move":
      return move(interaction, client, color);
    case "search":
      return search(interaction, client, color);
    case "clear-queue":
      return clearQueue(interaction, client, color);

    // Returning misc commands
    case "about":
      return about(interaction, client, color);
    case "help":
      return help(interaction, color);
    case "shard-info":
      return shardInfo(interaction, client);

    // Returning effects commands
    case "config":
      return config(interaction, client, color);
  }
});
