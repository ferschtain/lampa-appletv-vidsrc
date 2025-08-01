(function() {
  'use strict';

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

  function addSourceSearch(name, uri) {
    const source = {
      title: name,
      search: function(params, oncomplete) {
        if (!params.movie || !params.movie.imdb_id) {
          oncomplete([]);
          return;
        }

        const cards = [{
          title: 'Play with VIDSRC',
          img: './img/lampa.svg',
          year: '',
          movie: params.movie,
          url: `https://vidsrc.to/embed/movie/${params.movie.imdb_id}`
        }];

        oncomplete([
          {
            title: name,
            results: cards
          }
        ]);
      },
      onCancel: function() {},
      params: {
        lazy: true
      },
      onSelect: function(params, close) {
        close();

        const url = params.element.url;

        Lampa.Player.play({
          title: params.element.title,
          url: url,
          method: 'play',
          isonline: true
        });
      }
    };

    Lampa.Search.addSource(source);
  }

  function startPlugin() {
    window.vidsrc_component_plugin = true;

    const manifest = {
      type: 'video',
      version: '1.0.0',
      name: 'VIDSRC',
      description: 'Play movies via VIDSRC',
      component: 'vidsrc-component',
      onContextMenu: function(object) {
        return {
          name: 'Watch via VIDSRC',
          description: ''
        };
      },
      onContextLauch: function(object) {
        Lampa.Activity.push({
          url: '',
          title: 'VIDSRC',
          component: 'vidsrc-component',
          search: object.title,
          movie: object,
          page: 1
        });
      }
    };

    Lampa.Manifest.pl.push(manifest);
    Lampa.Component.add('vidsrc-component', component);
    addSourceSearch('VIDSRC', 'vidsrc');
  }

  startPlugin();
})();
