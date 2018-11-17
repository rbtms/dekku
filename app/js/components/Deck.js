function Level(props) {
  return React.createElement("span", {
    class: "level"
  }, `N${props.level}`);
}

function Kanji(props) {
  return React.createElement("div", {
    class: "kanji-div"
  }, React.createElement("span", {
    class: "kanji"
  }, props.kanji));
}

function Meaning(props) {
  console.log('meaning', props);
  return React.createElement("div", {
    class: "meaning-div"
  }, React.createElement("span", {
    class: "meaning"
  }, props.meaning));
}

function TableRow(props) {
  console.log('row', props);
  return React.createElement("tr", {
    class: "reading-row"
  }, React.createElement("td", null, props.on[props.i] || ''), React.createElement("td", null, props.kun[props.i] || ''));
}

function Reading(props) {
  console.log('reading', props.reading);
  const on = props.reading.on;
  const kun = props.reading.kun;
  return React.createElement("table", {
    class: "reading-table"
  }, React.createElement("tr", {
    class: "reading-header"
  }, React.createElement("td", null, "\u97F3"), React.createElement("td", null, "\u8A13")), React.createElement(TableRow, {
    i: 0,
    on: on,
    kun: kun
  }), React.createElement(TableRow, {
    i: 1,
    on: on,
    kun: kun
  }), React.createElement(TableRow, {
    i: 2,
    on: on,
    kun: kun
  }));
}

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      can_click: true
    };
    this.is_correct = props.option === props.correct;
    this.option = props.option;
    this._parent = props._parent;
  }

  clickHandler() {
    if (this.state.can_click) {
      this.setState({
        can_click: false
      });

      if (this.is_correct) {
        this._parent.add_point();
      }

      setTimeout(() => {
        this._parent.toggle_flip();

        setTimeout(() => this.setState({
          can_click: true
        }), 1000);
      }, 500);
    }
  }

  render() {
    return React.createElement("div", {
      class: "reading-option-div"
    }, React.createElement("div", {
      class: this.state.can_click ? 'option-clicked-nodisplay' : this.is_correct ? 'option-clicked-correct' : 'option-clicked-incorrect'
    }), React.createElement("span", {
      class: "reading-option",
      onClick: () => this.clickHandler()
    }, this.option));
  }

}

function Options(props) {
  return React.createElement("div", {
    class: "reading-options"
  }, React.createElement(Option, {
    option: props.options[0],
    correct: props.correct,
    _parent: props._parent
  }), React.createElement(Option, {
    option: props.options[1],
    correct: props.correct,
    _parent: props._parent
  }), React.createElement(Option, {
    option: props.options[2],
    correct: props.correct,
    _parent: props._parent
  }));
}

function Example(props) {
  return React.createElement("span", {
    class: "example"
  }, props.example);
}

function Examples(props) {
  console.log('examples', props);
  return React.createElement("div", {
    class: "examples"
  }, React.createElement(Example, {
    example: props.examples[0]
  }), React.createElement(Example, {
    example: props.examples[1]
  }), React.createElement(Example, {
    example: props.examples[2]
  }));
}

function FrontFace(props) {
  console.log('frontface', props);
  return React.createElement("div", {
    class: "front face"
  }, React.createElement(Level, {
    level: props.level
  }), React.createElement(Kanji, {
    kanji: props.kanji
  }), React.createElement(Options, {
    options: props.options,
    correct: props.correct,
    _parent: props._parent
  }));
}

function BackFace(props) {
  console.log('backface', props);
  return React.createElement("div", {
    class: "back face",
    onClick: () => props._parent.toggle_flip()
  }, React.createElement(Level, {
    level: props.level
  }), React.createElement(Kanji, {
    kanji: props.kanji
  }), React.createElement(Meaning, {
    meaning: props.meaning
  }), React.createElement(Reading, {
    reading: props.reading
  }));
}

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.FRONT = 0;
    this.BACK = 1;
    this.all = props.all;
    this.deck = props.deck.slice();
    this.card = this.draw_card();
    this.points = 0;
    this.state = {
      card: this.card,
      front: Object.assign({}, this.card),
      back: Object.assign({}, this.card),
      flip_degrees: 0,
      flip_state: 0
    };
  }

  draw_card(deck) {
    console.log('draw', this.deck[0]);
    if (this.deck.length) return this.deck.shift();else alert(`Score: ${this.points}/10`);
  }

  add_point() {
    this.points++;
  }

  toggle_flip() {
    const timeout = this.flip_state === this.FRONT ? 1000 : 500;
    const flip_state = !this.state.flip_state;
    const flip_degrees = this.state.flip_degrees - 180;
    this.setState({
      flip_state,
      flip_degrees
    });
    setTimeout(() => {
      if (flip_state) {
        const card = this.draw_card();
        this.setState({
          card: card,
          front: Object.assign({}, card)
        });
      } else {
        this.setState({
          back: Object.assign({}, this.state.card)
        });
      }
    }, timeout);
  }

  render() {
    return React.createElement("div", {
      class: "card",
      style: {
        transform: `rotateY(${this.state.flip_degrees}deg)`
      }
    }, React.createElement(FrontFace, {
      level: this.state.front.level,
      kanji: this.state.front.kanji,
      options: this.state.front.options,
      correct: this.state.front.correct,
      _parent: this,
      key: Math.random()
    }), React.createElement(BackFace, {
      level: this.state.back.level,
      kanji: this.state.back.kanji,
      meaning: this.state.back.meaning,
      reading: this.state.back.reading,
      _parent: this
    }));
  }

}