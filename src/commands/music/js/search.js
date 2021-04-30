const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function search(interaction, client, color) {
  check(interaction).then(async (response) => {
    if (!response) return;

    const { channel } = interaction.member.voice;

    let play = client.manager.players.get(interaction.guild.id);

    if (!play) {
      const player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
      });

      player.connect();
    }

    const player = client.manager.players.get(interaction.guild.id);

    const search = interaction.options[0].value;
    let res;

    try {
      res = await player.search(search, interaction.author);

      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw new Error(res.exception.message);
      }
    } catch (err) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Erro inesperado")
        .setDescription(`**${err}**`);

      return interaction.reply([embed]);
    }

    switch (res.loadType) {
      case "SEARCH_RESULT":
        let max = 5;
        if (res.tracks.length < max) max = res.tracks.length;

        const results = res.tracks
          .slice(0, max)
          .map((track, index) => `${++index}) [${track.title}](${track.uri})`)
          .join("\n");

        let embed = new MessageEmbed()
          .setColor(color)
          .setTitle("Resultados")
          .setDescription(results);

        const msg = await interaction.channel.send([embed]);
        await msg.react("1️⃣");
        await msg.react("2️⃣");
        await msg.react("3️⃣");
        await msg.react("4️⃣");
        await msg.react("5️⃣");

        const filter = (reaction, user) =>
          ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"].includes(reaction.emoji.name) &&
          user.id === interaction.author.id;

        const reactions = await msg.awaitReactions(filter, { max: 1 });

        const choice =
          reactions.get("1️⃣") ||
          reactions.get("2️⃣") ||
          reactions.get("3️⃣") ||
          reactions.get("4️⃣") ||
          reactions.get("5️⃣");

        let first;

        if (choice.emoji.name === "1️⃣") first = 1;
        if (choice.emoji.name === "2️⃣") first = 2;
        if (choice.emoji.name === "3️⃣") first = 3;
        if (choice.emoji.name === "4️⃣") first = 4;
        if (choice.emoji.name === "5️⃣") first = 5;

        const index = Number(first) - 1;
        const track = res.tracks[index];

        await player.queue.add(track);

        await msg.delete();

        if (!player.playing && !player.paused && !player.queue.length)
          player.play();

        let embed2 = new MessageEmbed()
          .setColor(color)
          .setTitle("Queued")
          .setDescription(`[${track.title}](${track.uri})`);

        return interaction.reply([embed2]);
    }
  });
}

module.exports = search;
