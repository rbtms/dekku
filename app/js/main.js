import Card from './components/Card.js';

class RandCard {
  constructor(deck) {
    const card = this.rand_card(deck);
    this.level = card.level;
    this.kanji = card.kanji;
    this.correct = this.rand_reading(card);
    this.options = [this.correct, this.rand_card_reading(deck), this.rand_card_reading(deck)].sort(() => Math.random() - Math.random());
    this.readings = this.correct; ////

    this.examples = ['a', 'b', 'c'];
  }

  rand(max) {
    return Math.floor(Math.random() * max);
  }

  rand_card_reading(deck) {
    return this.rand_reading(this.rand_card(deck));
  }

  rand_reading(card) {
    console.log(card);
    return card.reading[this.rand(card.reading.length)];
  }

  rand_card(deck) {
    const values = Object.values(deck);
    return values[this.rand(values.length)];
  }

}

function append_card(deck) {
  const card = new RandCard(deck);
  const elem = $('.card-container')[0];
  ReactDOM.render(React.createElement(Card, {
    card: card
  }), elem);
}

function format_deck(files) {
  console.log(files);
  append_card(files.n2);
}

async function load_json() {
  const path = './data/n';
  const files = [2, 3, 4, 5].map(n => `${path}${n}.json`);
  const n2 = await fetch(files[0]).then(res => res.json());
  const n3 = await fetch(files[1]).then(res => res.json());
  const n4 = await fetch(files[2]).then(res => res.json());
  const n5 = await fetch(files[3]).then(res => res.json()); //  const n2 = await fetch(files[0]).then( res => res.json() );

  format_deck({
    n2,
    n3,
    n4,
    n5
  });
}

function main() {
  load_json();
}

document.addEventListener('DOMContentLoaded', main);