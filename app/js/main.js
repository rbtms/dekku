import Config from './components/Config/Config.js';
import Deck from './components/Deck/Deck.js';
import Examples from './components/Examples/Examples.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.files = props.files;
    this.state = {
      is_init: false,
      card: {}
    };
  }

  msg(json) {
    console.log('msg!', json);

    switch (json.msg) {
      case 'init':
        {
          this.init(json);
          this.setState({
            is_init: true
          });
          break;
        }

      case 'update_examples':
        {
          this.setState({
            card: json.card
          });
          break;
        }
    }
  }

  init(config) {
    console.log('init', config);
    this.config = config;
    this.deck = this.format_deck(this.files, config);
  }

  parse_entries(files, decks) {
    if (!decks.length) {
      return files.n3;
    } else {
      const deck = {};
      decks.forEach(name => Object.assign(deck, files[name]));
      return deck;
    }
  }

  parse_deck(entries, trans, deck_size) {
    const deck = Object.keys(entries).map(key => new Card(entries[key], entries)).sort(() => Math.random() - Math.random());
    return deck_size === Infinity ? deck : deck.slice(0, deck_size);
  }

  format_deck(files, config) {
    const trans = config.notrans ? {} : files.trans;
    const entries = this.parse_entries(files, config.decks);
    const deck = this.parse_deck(entries, trans, config.deck_size);
    deck.forEach(card => card.add_examples(trans));
    return deck;
  }

  render() {
    if (!this.state.is_init) {
      return React.createElement(Config, {
        _parent: this
      });
    } else {
      return React.createElement("div", {
        class: "app"
      }, React.createElement(Deck, {
        deck: this.deck,
        all: this.all,
        _parent: this
      }), React.createElement(Examples, {
        card: this.state.card,
        _parent: this,
        key: Math.random()
      }));
    }
  }

}

class Card {
  constructor(entry, entries) {
    const option_type = Math.random() <= 0.5 ? 'on' : 'kun';
    const card = this.rand_card(entries, option_type);
    const hiragana = ('んわらやまはなたさかあっゐりみひにちしきいるゆむふ' + 'ぬつすくうゑれめへねてせけえヶをろよもほのとそこお').split('');
    this.level = card.level;
    this.kanji = card.kanji;
    this.reading = card.reading;
    this.meaning = card.meaning;
    this.correct = this.rand_reading(card, option_type);
    this.options = [this.correct, this.rand_card_reading(entries, option_type), this.rand_card_reading(entries, option_type)].sort(() => Math.random() - Math.random());
  }

  rand(max) {
    return Math.floor(Math.random() * max);
  }

  rand_card_reading(entries, kana_type) {
    return this.rand_reading(this.rand_card(entries, kana_type), kana_type);
  }

  rand_reading(entry, kana_type) {
    if (!entry.reading[kana_type].length) throw 'This entry doesn\'t have kana type: ' + kana_type;else return entry.reading[kana_type][this.rand(entry.reading[kana_type].length)];
  }

  rand_card(entries, kana_type) {
    const values = Object.values(entries);

    while (true) {
      const entry = values[this.rand(values.length)];
      if (entry.reading[kana_type].length) return entry;
    }
  }

  add_examples(trans) {
    this.trans = trans;
    this.examples = Object.keys(trans).filter(jpn => jpn.includes(this.kanji));
  }

}

function init_app(files) {
  const elem = $('#app')[0];
  ReactDOM.render(React.createElement(App, {
    files: files
  }), document.body);
}

function load_json() {
  const path = './data/';
  const files = ['n1', 'n2', 'n3', 'n4', 'n5', 'trans'];
  const promises = Object.values(files).map(file => fetch(`${path}${file}.json`).then(res => res.json()));
  Promise.all(promises).then(loaded => init_app(files.reduce((acc, file, i) => Object.assign(acc, {
    [file]: loaded[i]
  }), {})));
}

function main() {
  load_json();
}

document.addEventListener('DOMContentLoaded', main);