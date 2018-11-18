import Deck from './components/Deck.js';
import Examples from './components/Examples.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.deck = props.deck;
    this.all = props.all;
    this.state = {
      card: {}
    };
  }

  msg(json) {
    switch (json.msg) {
      case 'update_examples':
        {
          this.setState({
            card: json.card
          });
        }
    }
  }

  render() {
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
    const jpn = Object.keys(trans).sort(() => Math.random() - Math.random()).slice(0, 100);
    this.examples = jpn.filter(_jpn => _jpn.includes(this.kanji));
  }

}

function append_deck(deck, all) {
  const elem = $('#app')[0];
  ReactDOM.render(React.createElement(App, {
    deck: deck,
    all: all
  }), document.body);
}

function parse_entries(files, flags) {
  switch (flags.file === undefined) {
    case true:
      return files.n3;

    default:
      {
        switch (flags.file) {
          case 'all':
            return Object.assign({}, files.n1, files.n2, files.n3, files.n4, files.n5);

          default:
            {
              switch (files[flags.file] === undefined) {
                case true:
                  return files.n3;

                default:
                  return files[flags.file];
              }
            }
        }
      }
  }
}

function parse_deck(entries, trans, flags) {
  const deck_size = flags.deck_size || 10;
  const deck = Object.keys(entries).map(key => new Card(entries[key], entries)).sort(() => Math.random() - Math.random());
  return deck_size === 'all' ? deck : deck.slice(0, deck_size);
}

function format_deck(files) {
  const flags = parse_url_flags();
  const trans = flags.notrans ? {} : files.trans;
  const entries = parse_entries(files, flags);
  const deck = parse_deck(entries, files.trans, flags);
  deck.forEach(card => card.add_examples(trans));
  append_deck(deck, entries, flags.notrans ? {} : files.trans);
}

function load_json() {
  const path = './data/';
  const files = ['n1', 'n2', 'n3', 'n4', 'n5', 'trans'];
  const promises = Object.values(files).map(file => fetch(`${path}${file}.json`).then(res => res.json()));
  Promise.all(promises).then(loaded => format_deck(files.reduce((acc, file, i) => Object.assign(acc, {
    [file]: loaded[i]
  }), {})));
}

function parse_url_flags() {
  const url = window.location.toString();
  const q = url.split('?')[1] || false;
  if (!q) return {};else return q.split('&').map(line => line.split('=')).reduce((acc, parts) => parts.length === 2 ? Object.assign(acc, {
    [parts[0]]: parts[1]
  }) : {}, {});
}

function main() {
  load_json();
}

document.addEventListener('DOMContentLoaded', main);