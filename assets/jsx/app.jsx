class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleClick = this.handleClick.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.goAnterior = this.goAnterior.bind(this);
    this.goProximo = this.goProximo.bind(this);
    this.goHome = this.goHome.bind(this);
    this.carregaPagina = this.carregaPagina.bind(this);
    this.buscarPokemon = this.buscarPokemon.bind(this);
  }

  goHome(e) {
    e.preventDefault();
    this.setState({
      pokemons: [],
      pokemon: {},
      isIndex: true,
    });
    this.carregaPagina();
  }

  goProximo(e) {
    e.preventDefault();
    console.log(this.state.paginationOffset, this.state.limitePagina)
    this.setState({
      paginationOffset: this.state.paginationOffset + this.state.limitePagina,
      isIndex: true,
    });
    this.carregaPagina();
  }

  goAnterior(e) {
    e.preventDefault();
    console.log(this.state.paginationOffset, this.state.limitePagina)

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

  handleClick(e) {
    e.preventDefault();
    this.getPokemon(e.target.href);
  }

  buscarPokemon(e) {
    let target = e.target;
    let nome = target.value;
    if(nome){
      let url = 'https://pokeapi.co/api/v2/pokemon/' + nome;
      this.getPokemon(url, nome, target)
    }
  }

  getPokemon(url, nome, target) {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokemon: result,
            isIndex: false
          });
          target.style.backgroundColor = "#afa";
          this.setState({
            alert: {
              class: 'alert alert-danger d-none',
              text: ''
            }
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          target.style.backgroundColor = "#faa";
          this.setState({
            alert: {
              class: 'alert alert-danger d-block',
              text: 'Nenhum pokemon chamado: '+nome+' foi encontrado'
            }
          });
        }
      )
  }
  carregaPagina() {
    setTimeout(() => {
      fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + this.state.paginationOffset + "&limit=" + this.state.limitePagina)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              pokemons: result.results
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }, 200);
  }

  componentDidMount() {
    this.carregaPagina()
  }

  render() {
    const { error, isLoaded, pokemons, pokemon, isIndex } = this.state;
    if (isIndex) {
      let list = "";
      if (!isLoaded) {
        list = <p>Nenhum Pokemon foi capturado.</p>;
      } else {
        list = <ul className="list-group">
          {pokemons.map((pokemon) => (
            <li key={pokemon.name} className="list-group-item d-flex justify-content-between align-items-center">
              {pokemon.name}
              <a href={pokemon.url} className="badge badge-primary badge-pill" onClick={e => this.handleClick(e, pokemon.url)}>Ver detalhes</a>
            </li>
          ))}
        </ul>;
      }
      return (
        <div className="container">
          <nav className="navbar navbar-dark bg-dark">
            <a href="/" className="navbar-brand" onClick={this.goHome}>Catch Pokemon</a>
            <form className="form-inline">
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar" onChange={this.buscarPokemon} />
            </form>
          </nav>
          <div class={this.state.alert.class} role="alert">{this.state.alert.text}</div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Todos os pokemons</h1>
              <p className="lead">Essa é uma lista de pokemons consumido via <a href="https://pokeapi.co/api/v2/pokemon">POKEAPI</a></p>
            </div>
          </div>
          {list}
          <div className="row ">
            <div className="col">
              <nav aria-label="Navegue por aqui">
                <ul className="pagination">
                  <li className="page-item {prev_disabled}">
                    <a className="page-link" href="#" onClick={e => this.goAnterior(e)} tabIndex="-1" aria-disabled="true">Anterior</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" onClick={e => this.goProximo(e)}>Proximo</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      );
    } else {
      const { error, isLoaded, pokemons, pokemon, isIndex } = this.state;
      let statsRaw = pokemon.stats.map((stat, index) => (
        <li key={index} className="list-group-item">{stat.stat.name}: {stat.base_stat}</li>
      ))
      let foto = <ul className="d-flex justify-content-center">
        {Object.keys(pokemon.sprites).map((key, index) => (
          <div key={index}>
            <img src={pokemon.sprites[key]} />
          </div>
        ))}
      </ul>;
      let habilidades = <span className="habilidades">
        {
          pokemon.abilities.map((ability, index) => (
            <span key={index} className="badge badge-secondary">{ability.ability.name}</span>
          ))
        }
      </span>;
      return (
        <div className="container">
          <nav className="navbar navbar-dark bg-dark">
            <a href="#home" className="navbar-brand" onClick={this.goHome} >Catch Pokemon</a>
            <form className="form-inline">
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar" onChange={this.buscarPokemon} />
            </form>
          </nav>
          <div class={this.state.alert.class} role="alert">{this.state.alert.text}</div>
          <div className="row m-5">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h1 id="pokename">{pokemon.name}</h1>
                </div>
              </div>
              {foto}
            </div>
          </div>
          <h3>PokeInfos</h3>
          <ul className="list-group list-group">
            {statsRaw}
            <li className="list-group-item">HABILIDADES: {habilidades}</li>
          </ul>
        </div>
      )
    }
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById('app')
);