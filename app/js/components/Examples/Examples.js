function Example(props) {
  return React.createElement("div", {
    class: "example-container"
  }, React.createElement("span", {
    class: "example-jpn"
  }, props.jpn), React.createElement("span", {
    class: "example-eng"
  }, props.eng));
}

export default class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.is_init = false;
    this.state = {
      card: props.card
    };
  }

  update_card(card) {
    this.setState({
      card
    });
  }

  render() {
    if (Object.keys(this.state.card).length) {
      const examples = this.state.card.examples.map(jpn => React.createElement(Example, {
        jpn: jpn,
        eng: this.state.card.trans[jpn]
      }));
      return React.createElement("div", {
        class: "examples-container"
      }, examples);
    } else {
      return React.createElement("div", {
        class: "examples-container"
      }, React.createElement("div", {
        class: "instructions"
      }, React.createElement("span", {
        class: "instruction-header"
      }, "Welcome to Dekku v.1.0.0!"), React.createElement("div", {
        class: "instructions-text"
      }, React.createElement("span", null, "How to use:"), React.createElement("ul", null, React.createElement("li", null, "Choose the settings through URL flags (further explained below)"), React.createElement("li", null, "Flip the card clicking on it"), React.createElement("li", null, "Currently not supported on chrome!"), React.createElement("li", null, "Thats it!")))));
    }
  }

}
