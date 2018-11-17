
import Deck from './components/Deck.js';

class Card {
  constructor(entry, entries) {
    const option_type = Math.random() <= 0.5 ? 'on' : 'kun';
    const card = this.rand_card(entries, option_type);
    const hiragana = (
      'んわらやまはなたさかあっゐりみひにちしきいるゆむふ'
    + 'ぬつすくうゑれめへねてせけえヶをろよもほのとそこお'
    ).split('');
    
    this.level   = card.level;
    this.kanji   = card.kanji;
    this.reading = card.reading;
    this.meaning = card.meaning;

    this.correct = this.rand_reading(card, option_type);
    this.options = [
        this.correct,
        this.rand_card_reading(entries, option_type),
        this.rand_card_reading(entries, option_type)
    ]
    .sort( () => Math.random() - Math.random() );
    
    this.examples = ['a', 'b', 'c'];
  }

  rand(max) {
    return Math.floor( Math.random() * max );
  }

  rand_card_reading(entries, kana_type) {
    return this.rand_reading( this.rand_card(entries, kana_type), kana_type );
  }
  
  rand_reading(entry, kana_type) {
    if( !entry.reading[kana_type].length )
      throw 'This entry doesn\'t have kana type: ' + kana_type;
    else
      return entry.reading[kana_type][ this.rand( entry.reading[kana_type].length ) ];
  }

  rand_card(entries, kana_type) {
    const values = Object.values(entries);

    while(true) {
      const entry = values[ this.rand(values.length) ];

      if(entry.reading[kana_type].length)
        return entry;
    }
  }
}

function append_deck(deck, all) {
  const elem = $('.deck-container')[0];

  ReactDOM.render(<Deck deck={deck} all={all}/>, elem);
}

function format_deck(files) {
  const entries = files.n2;

  const deck = Object.keys(entries).map( key => new Card(entries[key], entries) )
    .sort( () => Math.random() - Math.random() ).slice(0, 10);

  console.log(deck);

  append_deck(deck, entries);
}

async function load_json() {
  const path = './data/n';
  const files = [2, 3, 4, 5].map( n => `${path}${n}.json` );

  const n2 = await fetch(files[0]).then( res => res.json() );
  const n3 = await fetch(files[1]).then( res => res.json() );
  const n4 = await fetch(files[2]).then( res => res.json() );
  const n5 = await fetch(files[3]).then( res => res.json() );
//  const n2 = await fetch(files[0]).then( res => res.json() );

  format_deck({n2, n3, n4, n5});
}

function main() {
  load_json();
}

document.addEventListener('DOMContentLoaded', main);

