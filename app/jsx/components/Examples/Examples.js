
function Example(props) {
  return <div class='example-container'>
    <span class='example-jpn'>{props.jpn}</span>
    <span class='example-eng'>{props.eng}</span>
  </div>;
}

export default class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.is_init = false;
    this.state = { card: props.card };
  }

  update_card(card) {
    this.setState({card});
  }

  render() {
    if( Object.keys(this.state.card).length ) {
      const examples = this.state.card.examples.map( jpn =>
        <Example jpn={jpn} eng={this.state.card.trans[jpn]} />
      );
      
      return <div class='examples-container'>
        {examples}
      </div>;
    }
    else {
      return <div class='examples-container'>
        <div class='instructions'>
          <span class='instruction-header'>
            Welcome to Dekku v.1.0.0!
          </span>
          <div class='instructions-text'>
            <span>How to use:</span>
            <ul>
              <li>Choose the settings through URL flags (further explained below)</li>
              <li>Flip the card clicking on it</li>
              <li>Currently not supported on chrome!</li>
              <li>Thats it!</li>
            </ul>
          </div>
        </div>
      </div>;
    }
  }
}

