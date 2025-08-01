(function() {
  const manifest = {
    type: 'video',
    version: '1.0.0',
    name: 'VIDSRC Plugin',
    description: 'Play movies via VIDSRC embed',
    component: 'vidsrc-component',
    onContextMenu: function(object) {
      return {
        name: 'Watch via VIDSRC',
        description: 'Open using VIDSRC player'
      };
    },
    onContextLauch: function(object) {
      Lampa.Activity.push({
        url: '',
        title: 'VIDSRC Player',
        component: 'vidsrc-component',
        search: object.title,
        movie: object,
        page: 1
      });
    }
  };

  function component(object) {
    this.create = () => this.render();
    this.render = () => {
      return $('<div class="empty__content"><div class="empty__title">Loading VIDSRC...</div></div>');
    };

    this.start = () => {
      const imdb = object.movie.imdb_id;
      if (!imdb) {
        Lampa.Noty.show('No IMDb ID found');
        return;
      }

      const url = `https://vidsrc.to/embed/movie/${imdb}`;

      Lampa.Player.play({
        title: object.movie.title || object.movie.name || 'Video',
        url,
        method: 'play',
        isonline: true
      });
    };

    this.destroy = () => {};
    this.pause = () => {};
    this.stop = () => {};
    this.back = () => {
      Lampa.Activity.backward();
    };
  }

  function startPlugin() {
    Lampa.Component.add('vidsrc-component', component);
    Lampa.Manifest.pl.push(manifest);
  }

  startPlugin();
})();
