const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function play(interaction, client, color) {
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
    let index;

    if (interaction.options[1]) {
      index = interaction.options[1].value;
    } else {
      index = 0;
    }

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
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();

        let embed = new MessageEmbed()
          .setColor(color)
          .setTitle("Sem resultado")
          .setDescription(`**${search}**`);

        return interaction.reply([embed]);

      case "TRACK_LOADED":
        await player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.length)
          player.play();

        let embed2 = new MessageEmbed()
          .setColor(color)
          .setTitle("Queued")
          .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri})`);

        return interaction.reply([embed2]);

      case "PLAYLIST_LOADED":
        await player.queue.add(res.tracks);

        if (
          !player.playing &&
          !player.paused &&
          player.queue.size + 1 === res.tracks.length
        )
          player.play();

        let embed3 = new MessageEmbed()
          .setColor(color)
          .setTitle("Queued")
          .setDescription(
            `**[${res.playlist.name}](${res.tracks[0].uri})** \`[${res.tracks.length} músicas]\``
          );

        return interaction.reply([embed3]);

      case "SEARCH_RESULT":
        if (index >= res.tracks.length) {
          let embedError = new MessageEmbed()
            .setColor(color)
            .setTitle("Sem resultado")
            .setDescription(`**${search}**`)
            .setFooter(`Índice ${index}`);

          return interaction.reply([embedError]);
        }

        await player.queue.add(res.tracks[index]);

        if (!player.playing && !player.paused && !player.queue.length)
          player.play();

        let embed4 = new MessageEmbed()
          .setColor(color)
          .setTitle("Queued")
          .setDescription(
            `[${res.tracks[index].title}](${res.tracks[index].uri})`
          );
        if (index > 0) embed4.setFooter("Índice " + index);

        return interaction.reply([embed4]);
    }
  });
}

module.exports = play;
