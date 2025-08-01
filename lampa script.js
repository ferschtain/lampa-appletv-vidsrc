(function(){
  const domains = [
    'vidsrc.xyz',
    'vidsrc.net',
    'vidsrc.pm'
  ];

  function embedWith(domain, movie) {
    const imdb = movie.imdb_id;
    const url = `https://${domain}/embed/movie?imdb=${encodeURIComponent(imdb)}`;
    Lampa.Player.play({
      title: movie.title || movie.name || 'Video',
      url,
      method: 'play',
      isonline: true
    });
  }

  const plugin = {
    title: 'VIDSRC',
    search(params, onComplete) {
      const movie = params.movie;
      if (!movie || !movie.imdb_id) {
        onComplete([]);
        return;
      }

      const options = domains.map(dom => ({
        title: `Server: ${dom}`,
        img: './img/lampa.svg',
        movie,
        domain: dom
      }));

      onComplete([
        {
          title: 'Select embed server',
          results: options
        }
      ]);
    },
    onSelect(params, close) {
      close();
      embedWith(params.element.domain, params.element.movie);
    }
  };

  Lampa.Search.addSource(plugin);
})();
