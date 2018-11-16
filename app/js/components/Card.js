function Level(props) {
  return React.createElement("span", {
    class: "level"
  }, `N${props.level}`);
}

function Kanji(props) {
  return React.createElement("span", {
    class: "kanji"
  }, props.kanji);
}

function Readings(props) {
  return React.createElement("span", {
    class: "reading"
  }, props.readings);
}

function Option(props) {
  console.log(props);
  return props.option === props.correct ? React.createElement("span", {
    class: "reading-option",
    onClick: () => props._parent.toggleFlip()
  }, props.option) : React.createElement("span", {
    class: "reading-option"
  }, props.option);
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
  console.log(props);
  return React.createElement("div", {
    class: "back face"
  }, React.createElement(Level, {
    level: props.level
  }), React.createElement(Kanji, {
    kanji: props.kanji
  }), React.createElement(Readings, {
    readings: props.readings
  }), React.createElement(Examples, {
    examples: props.examples
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
      readings: this.state.readings,
      examples: this.state.examples
    }));
  }

}

export default Card;