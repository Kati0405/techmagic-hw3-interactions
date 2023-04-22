import { HttpClient } from './httpClient.js';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const container = document.querySelector('.cards-container');
const box = document.querySelector('.details-container');
const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');

class PokemonCard {
  constructor(pokemon) {
    this.name = pokemon.name;
    this.id = pokemon.id;
    this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }

  createElement = (element, className, value, label) => {
    let el = document.createElement(element);
    el.classList.add(className);
    el.textContent = label ? `${label}: ${value}` : value ? `${value}` : null;
    return el;
  };

  drawPokemonCard = () => {
    const card = this.createElement('div', 'card');
    const cardImage = this.createElement('div', 'card-image');
    card.appendChild(cardImage);
    const image = this.createElement('img');
    image.src = this.img;
    cardImage.appendChild(image);
    card.appendChild(this.createElement('p', 'name', this.name));
    container.appendChild(card);
  };
}

class PokemonDetailsCard extends PokemonCard {
  constructor(pokemon) {
    super(pokemon);
    this.weight = pokemon.weight;
    this.height = pokemon.height;
  }

  drawPokemonDetailsCard = () => {
    box.innerHTML = '';

    const detailsImage = this.createElement('div', 'details-image');
    const img = this.createElement('img', 'details-image__img');
    img.src = this.img;

    box.appendChild(this.createElement('h2', 'name', this.name));
    box.appendChild(this.createElement('p', 'id', this.id, 'ID'));
    box.appendChild(detailsImage);
    detailsImage.appendChild(img);
    box.appendChild(this.createElement('p', 'weight', this.weight, 'Weight'));
    box.appendChild(this.createElement('p', 'height', this.height, 'Height'));
  };
}

class PokemonClient extends HttpClient {
  constructor(baseURL) {
    super({
      baseURL,
    });
    this.baseURL = URL;
  }
  async getPokemonCards() {
    return await this.get('?limit=20').then((res) =>
      res.results.map((el, i) => new PokemonCard({ id: i + 1, ...el }))
    );
  }

  async getPokemonDetails(name) {
    return await this.get(`${name}`).then((res) => {
      if (!res) {
        return;
      }
      return new PokemonDetailsCard(res);
    });
  }
}

const pokemonClient = new PokemonClient();

let onSearchClick = () => {
  pokemonClient
    .getPokemonDetails(input.value.toLowerCase())
    .then((card) => (card ? card.drawPokemonDetailsCard() : null));
  input.value = '';
};

searchBtn.addEventListener('click', onSearchClick);

pokemonClient
  .getPokemonCards()
  .then((cards) => cards.forEach((card) => card.drawPokemonCard()));
