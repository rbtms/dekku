function DeckOption(props) {
  return React.createElement("div", {
    class: "config-checkbox-container"
  }, React.createElement("label", {
    id: 'config-checkbox-label_' + props.name,
    class: 'config-checkbox-label',
    for: 'config-checkbox_' + props.name
  }, props.name.toUpperCase()), React.createElement("input", {
    id: 'config-checkbox_' + props.name,
    class: 'config-checkbox',
    type: "checkbox",
    defaultChecked: props.checked,
    onChange: () => props.callback(props.name)
  }), React.createElement("span", {
    id: 'config-checkbox-right-label_' + props.name
  }, props.label), React.createElement("span", {
    class: "card_n"
  }, 'Cards: ' + props.card_n));
}

function DeckSizeField(props) {
  return React.createElement("div", {
    class: "config-deck_size-container"
  }, React.createElement("input", {
    class: "config-deck_size-input",
    defaultValue: 20,
    onKeyUp: props.callback
  }), React.createElement("label", {
    class: 'config-input-label',
    for: 'config-deck_size-input'
  }, "Cards"));
}

export default class Config extends React.Component {
  constructor(props) {
    super(props);
    this._parent = props._parent;
    this.decks = {
      hiragana: {
        name: 'hiragana',
        card_n: 10,
        label: 'Easy',
        checked: false
      },
      katakana: {
        name: 'katakana',
        card_n: 10,
        label: 'Easy',
        checked: false
      },
      n1: {
        name: 'n1',
        card_n: 1149,
        label: 'Hard!',
        checked: false
      },
      n2: {
        name: 'n2',
        card_n: 368,
        label: 'Quite hard!',
        checked: false
      },
      n3: {
        name: 'n3',
        card_n: 369,
        label: 'Normal',
        checked: true
      },
      n4: {
        name: 'n4',
        card_n: 170,
        label: 'Easy peasy!',
        checked: false
      },
      n5: {
        name: 'n5',
        card_n: 80,
        label: 'Meh',
        checked: false
      }
    };
    this.deck_size = 30;
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
    const decks = Object.keys(this.decks).filter(key => this.decks[key].checked);

    this._parent.msg({
      msg: 'init',
      decks: decks.length ? decks : ['n3'],
      deck_size: this.deck_size
    });
  }

  render() {
    const deck_elems = Object.values(this.decks).map(deck => React.createElement(DeckOption, {
      name: deck.name,
      card_n: deck.card_n,
      label: deck.label,
      checked: deck.checked,
      callback: name => this.toggle_checkbox(name)
    }));
    return React.createElement("div", {
      class: "config-container"
    }, React.createElement("div", {
      class: "config-header"
    }, React.createElement("span", null, "Dekku 0.1.0")), React.createElement("div", {
      class: "config-decks-container"
    }, React.createElement("span", {
      class: "config-option-header"
    }, "Select some decks:"), deck_elems), React.createElement("div", {
      class: "config-decks_size-container"
    }, React.createElement("span", {
      class: "config-option-header"
    }, "Select a deck size:"), React.createElement(DeckSizeField, {
      callback: e => this.set_deck_size(e)
    })), React.createElement("button", {
      onClick: () => this.shuffle_click()
    }, "Shuffle!"));
  }

}