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
      setTimeout(() => this._parent.toggleFlip(), 1000);
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
    class: "back face"
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

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.card;
    this.state.isFlipped = false;
  }

  toggleFlip() {
    this.setState({
      isFlipped: !this.state.isFlipped
    });
  }

  render() {
    return React.createElement("div", {
      class: this.state.isFlipped ? 'card flip-card' : 'card'
    }, React.createElement(FrontFace, {
      level: this.state.level,
      kanji: this.state.kanji,
      options: this.state.options,
      correct: this.state.correct,
      _parent: this
    }), React.createElement(BackFace, {
      level: this.state.level,
      kanji: this.state.kanji,
      meaning: this.state.meaning,
      reading: this.state.reading
    }));
  }

}

export default Card;