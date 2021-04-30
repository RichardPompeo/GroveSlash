const { MessageEmbed } = require('discord.js')
const arrayUtils = require("../../../build/extensions/arrayUtils")

async function queue(interaction, client, color) {
  interaction.thinking();
  
  const player = client.manager.players.get(interaction.guild.id);

  if (!player) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Sem queue")
      .setDescription(
        "Não há músicas tocando nesse servidor, use **/play** para ouvir."
      );

    return interaction.reply([embed]);
  }

  let tracks = player.queue.map(track => track.title)
  let tracksForPageContent = [];
  let selectedPage = 1;
  let page = arrayUtils.getPage(tracks.length);
  let auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(tracks);
  let tracksForPage = arrayUtils.choosePage(auxArray, selectedPage);

  tracksForPage.map((res) => {
    tracksForPageContent.push(`${res.index}) ${res.track}`);
  });

  if (player.queue.length <= 0) tracks = null;

  if (tracks === null) {
    tracksForPageContent = `Não há musicas na fila :(\nUse /play para adicionar mais músicas!`;

    return interaction.reply(
      `**Now Playing:** \`${player.queue.current.title}\` \`\`\`css\n${tracksForPageContent}\`\`\` `
    );
  }

  if (page === 1) {
    return interaction.reply(
      `**Now Playing:** \`${
        player.queue.current.title
      }\` \`\`\`css\n${tracksForPageContent.join("\n")}\`\`\` `
    );
  }

  interaction.reply("**Now Playing:** " + `\`${player.queue.current.title}\``);

  const msg = await interaction.channel.send(
    `\`\`\`css\n${tracksForPageContent.join("\n")}\`\`\` `
  );
  await msg.react("⬆️");
  await msg.react("⬇️");

  const forwardFilter = (r, u) =>
    r.emoji.name === "⬇️" && u.id === interaction.author.id;
  const forwardCollector = msg.createReactionCollector(forwardFilter, {
    dispose: true,
  });

  const backwardFilter = (r, u) =>
    r.emoji.name === "⬆️" && u.id === interaction.author.id;
  const backwardCollector = msg.createReactionCollector(backwardFilter, {
    dispose: true,
  });

  forwardCollector.on("collect", () => forward());
  forwardCollector.on("remove", () => forward());

  backwardCollector.on("collect", () => backward());
  backwardCollector.on("remove", () => backward());

  function backward() {
    if (selectedPage === 1) {
      selectedPage = page;
      tracksForPageContent = [];
    } else {
      selectedPage--;
      tracksForPageContent = [];
    }

    auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(tracks);
    tracksForPage = arrayUtils.choosePage(auxArray, selectedPage);

    tracksForPage.map((res) => {
      tracksForPageContent.push(`${res.index}) ${res.track}`);
    });

    msg.edit(`\`\`\`css\n${tracksForPageContent.join("\n")}\`\`\` `);
  }

  function forward() {
    if (selectedPage === page) {
      selectedPage = 1;
      tracksForPageContent = [];
    } else {
      selectedPage++;
      tracksForPageContent = [];
    }

    auxArray = arrayUtils.mapRawArrayAndMakeObjectArray(tracks);
    tracksForPage = arrayUtils.choosePage(auxArray, selectedPage);

    tracksForPage.map((res) => {
      tracksForPageContent.push(`${res.index}) ${res.track}`);
    });

    msg.edit(`\`\`\`css\n${tracksForPageContent.join("\n")}\`\`\` `);
  }
}

module.exports = queue;
