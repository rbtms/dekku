import Config from './app/components/Config/Config.js';
import Deck from './app/components/Deck/Deck.js';
import Examples from './app/components/Examples/Examples.js';

class App extends React.Component {
  constructor(props) {
    super(props);
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
          break;
        }

      case 'update_examples':
        {
          if (!json.card.is_kana) {
            this.setState({
              card: json.card
            });
          }

          break;
        }
    }
  }

  init(config) {
    console.log('init', config);
    this.config = config;
    this.load_json(config);
  }

  load_json(config) {
    const path = './app/data/';
    const files = config.decks.concat('trans');
    const promises = Object.values(files).map(file => fetch(`${path}${file}.json`).then(res => res.json()));
    Promise.all(promises).then(loaded => this.format_deck(files.reduce((acc, file, i) => Object.assign(acc, {
      [file]: loaded[i]
    }), {})));
  }

  parse_entries(files, decks) {
    const deck = {};
    decks.forEach(name => Object.assign(deck, files[name]));
    return deck;
  }

  parse_deck(entries, trans, deck_size) {
    const deck = Object.keys(entries).map(key => new Card(entries[key], entries)).sort(() => Math.random() - Math.random());
    return deck_size === Infinity ? deck : deck.slice(0, deck_size);
  }

  format_deck(files) {
    console.log('format deck', files);
    const trans = this.config.notrans ? {} : files.trans;
    const entries = this.parse_entries(files, this.config.decks);
    const deck = this.parse_deck(entries, trans, this.config.deck_size);
    deck.forEach(card => card.add_examples(trans));
    this.deck = deck;
    this.all = deck.slice();
    this.setState({
      is_init: true
    });
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
    this.is_kana = !card.level;
    this.level = card.level;
    this.kanji = this.is_kana ? card.kana : card.kanji;
    this.meaning = this.is_kana ? '' : card.meaning;
    this.reading = card.reading;
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

function init_app() {
  const elem = $('#app')[0];
  alert(1)
  ReactDOM.render(React.createElement(App, null), document.body);
}

function main() {
  init_app();
}

document.addEventListener('DOMContentLoaded', main);
