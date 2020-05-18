var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.state = {
      error: null,
      isLoaded: false,
      pokemons: [],
      pokemon: {},
      isIndex: true,
      paginationOffset: 0,
      limitePagina: 10,
      alert: {
        class: 'alert alert-danger d-none',
        text: ''
      }
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.getPokemon = _this.getPokemon.bind(_this);
    _this.goAnterior = _this.goAnterior.bind(_this);
    _this.goProximo = _this.goProximo.bind(_this);
    _this.goHome = _this.goHome.bind(_this);
    _this.carregaPagina = _this.carregaPagina.bind(_this);
    _this.buscarPokemon = _this.buscarPokemon.bind(_this);
    return _this;
  }

  _createClass(Container, [{
    key: 'goHome',
    value: function goHome(e) {
      e.preventDefault();
      this.setState({
        pokemons: [],
        pokemon: {},
        isIndex: true
      });
      this.carregaPagina();
    }
  }, {
    key: 'goProximo',
    value: function goProximo(e) {
      e.preventDefault();
      console.log(this.state.paginationOffset, this.state.limitePagina);
      this.setState({
        paginationOffset: this.state.paginationOffset + this.state.limitePagina,
        isIndex: true
      });
      this.carregaPagina();
    }
  }, {
    key: 'goAnterior',
    value: function goAnterior(e) {
      e.preventDefault();
      console.log(this.state.paginationOffset, this.state.limitePagina);

      if (this.state.paginationOffset - this.state.limitePagina > 0) {
        this.setState({
          paginationOffset: this.state.paginationOffset - this.state.limitePagina
        });
      } else {
        this.setState({
          paginationOffset: 0
        });
      }
      this.carregaPagina();
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      this.getPokemon(e.target.href);
    }
  }, {
    key: 'buscarPokemon',
    value: function buscarPokemon(e) {
      var target = e.target;
      var nome = target.value;
      if (nome) {
        var url = 'https://pokeapi.co/api/v2/pokemon/' + nome;
        this.getPokemon(url, nome, target);
      }
    }
  }, {
    key: 'getPokemon',
    value: function getPokemon(url, nome, target) {
      var _this2 = this;

      fetch(url).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this2.setState({
          isLoaded: true,
          pokemon: result,
          isIndex: false
        });
        target.style.backgroundColor = "#afa";
        _this2.setState({
          alert: {
            class: 'alert alert-danger d-none',
            text: ''
          }
        });
      }, function (error) {
        _this2.setState({
          isLoaded: true,
          error: error
        });
        target.style.backgroundColor = "#faa";
        _this2.setState({
          alert: {
            class: 'alert alert-danger d-block',
            text: 'Nenhum pokemon chamado: ' + nome + ' foi encontrado'
          }
        });
      });
    }
  }, {
    key: 'carregaPagina',
    value: function carregaPagina() {
      var _this3 = this;

      setTimeout(function () {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + _this3.state.paginationOffset + "&limit=" + _this3.state.limitePagina).then(function (res) {
          return res.json();
        }).then(function (result) {
          _this3.setState({
            isLoaded: true,
            pokemons: result.results
          });
        }, function (error) {
          _this3.setState({
            isLoaded: true,
            error: error
          });
        });
      }, 200);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.carregaPagina();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          error = _state.error,
          isLoaded = _state.isLoaded,
          pokemons = _state.pokemons,
          pokemon = _state.pokemon,
          isIndex = _state.isIndex;

      if (isIndex) {
        var list = "";
        if (!isLoaded) {
          list = React.createElement(
            'p',
            null,
            'Nenhum Pokemon foi capturado.'
          );
        } else {
          list = React.createElement(
            'ul',
            { className: 'list-group' },
            pokemons.map(function (pokemon) {
              return React.createElement(
                'li',
                { key: pokemon.name, className: 'list-group-item d-flex justify-content-between align-items-center' },
                pokemon.name,
                React.createElement(
                  'a',
                  { href: pokemon.url, className: 'badge badge-primary badge-pill', onClick: function onClick(e) {
                      return _this4.handleClick(e, pokemon.url);
                    } },
                  'Ver detalhes'
                )
              );
            })
          );
        }
        return React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'nav',
            { className: 'navbar navbar-dark bg-dark' },
            React.createElement(
              'a',
              { href: '/', className: 'navbar-brand', onClick: this.goHome },
              'Catch Pokemon'
            ),
            React.createElement(
              'form',
              { className: 'form-inline' },
              React.createElement('input', { className: 'form-control mr-sm-2', type: 'search', placeholder: 'Buscar', 'aria-label': 'Buscar', onChange: this.buscarPokemon })
            )
          ),
          React.createElement(
            'div',
            { 'class': this.state.alert.class, role: 'alert' },
            this.state.alert.text
          ),
          React.createElement(
            'div',
            { className: 'jumbotron jumbotron-fluid' },
            React.createElement(
              'div',
              { className: 'container' },
              React.createElement(
                'h1',
                { className: 'display-4' },
                'Todos os pokemons'
              ),
              React.createElement(
                'p',
                { className: 'lead' },
                'Essa \xE9 uma lista de pokemons consumido via ',
                React.createElement(
                  'a',
                  { href: 'https://pokeapi.co/api/v2/pokemon' },
                  'POKEAPI'
                )
              )
            )
          ),
          list,
          React.createElement(
            'div',
            { className: 'row ' },
            React.createElement(
              'div',
              { className: 'col' },
              React.createElement(
                'nav',
                { 'aria-label': 'Navegue por aqui' },
                React.createElement(
                  'ul',
                  { className: 'pagination' },
                  React.createElement(
                    'li',
                    { className: 'page-item {prev_disabled}' },
                    React.createElement(
                      'a',
                      { className: 'page-link', href: '#', onClick: function onClick(e) {
                          return _this4.goAnterior(e);
                        }, tabIndex: '-1', 'aria-disabled': 'true' },
                      'Anterior'
                    )
                  ),
                  React.createElement(
                    'li',
                    { className: 'page-item' },
                    React.createElement(
                      'a',
                      { className: 'page-link', href: '#', onClick: function onClick(e) {
                          return _this4.goProximo(e);
                        } },
                      'Proximo'
                    )
                  )
                )
              )
            )
          )
        );
      } else {
        var _state2 = this.state,
            _error = _state2.error,
            _isLoaded = _state2.isLoaded,
            _pokemons = _state2.pokemons,
            _pokemon = _state2.pokemon,
            _isIndex = _state2.isIndex;

        var statsRaw = _pokemon.stats.map(function (stat, index) {
          return React.createElement(
            'li',
            { key: index, className: 'list-group-item' },
            stat.stat.name,
            ': ',
            stat.base_stat
          );
        });
        var foto = React.createElement(
          'ul',
          { className: 'd-flex justify-content-center' },
          Object.keys(_pokemon.sprites).map(function (key, index) {
            return React.createElement(
              'div',
              { key: index },
              React.createElement('img', { src: _pokemon.sprites[key] })
            );
          })
        );
        var habilidades = React.createElement(
          'span',
          { className: 'habilidades' },
          _pokemon.abilities.map(function (ability, index) {
            return React.createElement(
              'span',
              { key: index, className: 'badge badge-secondary' },
              ability.ability.name
            );
          })
        );
        return React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'nav',
            { className: 'navbar navbar-dark bg-dark' },
            React.createElement(
              'a',
              { href: '#home', className: 'navbar-brand', onClick: this.goHome },
              'Catch Pokemon'
            ),
            React.createElement(
              'form',
              { className: 'form-inline' },
              React.createElement('input', { className: 'form-control mr-sm-2', type: 'search', placeholder: 'Buscar', 'aria-label': 'Buscar', onChange: this.buscarPokemon })
            )
          ),
          React.createElement(
            'div',
            { 'class': this.state.alert.class, role: 'alert' },
            this.state.alert.text
          ),
          React.createElement(
            'div',
            { className: 'row m-5' },
            React.createElement(
              'div',
              { className: 'col' },
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'col' },
                  React.createElement(
                    'h1',
                    { id: 'pokename' },
                    _pokemon.name
                  )
                )
              ),
              foto
            )
          ),
          React.createElement(
            'h3',
            null,
            'PokeInfos'
          ),
          React.createElement(
            'ul',
            { className: 'list-group list-group' },
            statsRaw,
            React.createElement(
              'li',
              { className: 'list-group-item' },
              'HABILIDADES: ',
              habilidades
            )
          )
        );
      }
    }
  }]);

  return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById('app'));