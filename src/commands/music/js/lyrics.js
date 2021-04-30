const { MessageEmbed, splitMessage } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

async function lyrics(interaction, client, color) {
  interaction.thinking();

  let option = interaction.options;
  let current;
  let lyrics;
  let query;

  if (option) {
    query = interaction.options[0].value;
  }

  const player = client.manager.players.get(interaction.guild.id);

  if (!player && !option) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Sem queue")
      .setDescription(
        "Não há músicas tocando nesse servidor, use **/play** para ouvir."
      );

    return interaction.reply([embed]);
  }

  if (player && player.queue.current) {
    current = player.queue.current.title;
  }

  if (query) {
    lyrics = await lyricsFinder(query, "");
  } else if (current) {
    lyrics = await lyricsFinder(current, "");
  }

  let finalQuery = query ? query : current;

  if (!lyrics) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Sem letra")
      .setDescription(
        "Não foi possível encontrar uma letra para **" + finalQuery + "**"
      );

    return interaction.reply([embed]);
  }

  String.prototype.toCapitalize = function () {
    return this.toLowerCase().replace(/^.|\s\S/g, function (a) {
      return a.toUpperCase();
    });
  };

  const embed = new MessageEmbed()
    .setTitle(finalQuery.toCapitalize())
    .setColor(color);

  await interaction.reply([embed]);

  const splitDescription = splitMessage(lyrics, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: "",
  });

  splitDescription.forEach(async (m) => {
    embed.setTitle("");
    embed.setDescription(m);
    interaction.channel.send([embed]);
  });
}

module.exports = lyrics;
