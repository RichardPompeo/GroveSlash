module.exports = {
  mapRawArrayAndMakeObjectArray(array) {
    let aux = 1;
    let page = 1;
    let tracksObject = {};
    var newTracks = [];
    let test = array.length;

    array.map((track) => {
      tracksObject = {
        index: aux,
        track: track,
        page: page,
      };

      if (aux % 10 === 0) {
        page++;
        if (aux === test) {
          page--;
        }
      }
      newTracks.push(tracksObject);
      aux++;
    });
    return newTracks;
  },

  choosePage(array, page) {
    let tracksForPage = [];
    array.map((ns) => {
      if (ns.page === page) {
        tracksForPage.push(ns);
      }
    });
    return tracksForPage;
  },

  getPage(length) {
    let total = length;
    let pagesRaw = total / 10;
    if (total % 10 !== 0) {
      pagesRaw++;
    }
    return parseInt(pagesRaw);
  },
};
