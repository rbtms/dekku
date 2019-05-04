
function DeckOption(props) {
  return <div class='config-checkbox-container'>
    <label
      id={'config-checkbox-label_'+props.name}
      class={'config-checkbox-label'}
      for={'config-checkbox_'+props.name}
    >
      {props.name.toUpperCase()}
    </label>

    <input
      id={'config-checkbox_'+props.name}
      class={'config-checkbox'}
      type='checkbox'
      defaultChecked={props.checked}
      onChange={() => props.callback(props.name)}
    ></input>

    <span id={'config-checkbox-right-label_'+props.name}>
      {props.label}
    </span>

    <span class='card_n'>
      {'Cards: ' + props.card_n}
    </span>
  </div>;
}

function DeckSizeField(props) {
  return <div class='config-deck_size-container'>
    <input
      class='config-deck_size-input'
      defaultValue={20}
      onKeyUp={props.callback}
    ></input>
    <label
      class={'config-input-label'}
      for={'config-deck_size-input'}
    >Cards</label>
  </div>;
}

function ShuffleButton(props) {
  return !props.clicked
    ? <button onClick={props.callback}>
        Shuffle!
      </button>
    : <button onClick={props.callback} disabled>
        Shuffling...
      </button>;
}

export default class Config extends React.Component {
  constructor(props) {
    super(props);

    this._parent = props._parent;

    this.decks = {
      hiragana: { name: 'hiragana', card_n: 10, label: 'Easy', checked: false },
      katakana: { name: 'katakana', card_n: 10, label: 'Easy', checked: false },
      n1: { name: 'n1', card_n: 1149, label: 'Hard!',       checked: false },
      n2: { name: 'n2', card_n:  368, label: 'Quite hard!', checked: false },
      n3: { name: 'n3', card_n:  369, label: 'Normal',      checked: true  },
      n4: { name: 'n4', card_n:  170, label: 'Easy peasy!', checked: false },
      n5: { name: 'n5', card_n:   80, label: 'Meh',         checked: false }
    };
    
    this.deck_size = 30;
    this.state = { clicked_shuffle: false };
  }

  set_deck_size(e) {
    this.deck_size = parseInt(e.target.value);
  }

  toggle_checkbox(name) {
    console.log(this);
    console.log('toggle checkbox ' + name);
    this.decks[name].checked = !this.decks[name].checked;
  }

  shuffle_click() {
    const decks = Object.keys(this.decks).filter( key => this.decks[key].checked);

    this._parent.msg({ msg: 'init', decks: decks.length ? decks : ['n3'], deck_size: this.deck_size });
    this.setState({ clicked_shuffle: true });
  }

  render() {
    const deck_elems = Object.values(this.decks).map( deck =>
      <DeckOption
        name={deck.name}
        card_n={deck.card_n}
        label={deck.label}
        checked={deck.checked}
        callback={(name) => this.toggle_checkbox(name)}
      />
    );
    return <div class='config-container'>
      <div class='config-header'>
        <span>Dekku 1.0.0</span>
      </div>
      
      <div class='config-decks-container'>
        <span class='config-option-header'>Select some decks:</span>
        {deck_elems}
      </div>

      <div class='config-decks_size-container'>
        <span class='config-option-header'>Select a deck size:</span>
        <DeckSizeField callback={ (e) => this.set_deck_size(e) }/>
      </div>

      <ShuffleButton callback={(e) => this.shuffle_click(e)} clicked={this.state.clicked_shuffle} />
    </div>
  }
}
