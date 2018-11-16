
function Level(props) {
  return <span class='level'>{`N${props.level}`}</span>;
}

function Kanji(props) {
  return <span class='kanji'>{props.kanji}</span>;
}

function Readings(props) {
  return <span class='reading'>{props.readings}</span>;
}

function Option(props) {
  console.log(props);
  return props.option === props.correct
    ? <span class='reading-option' onClick={() => props._parent.toggleFlip()}>{props.option}</span>
    : <span class='reading-option'>{props.option}</span>;
}

function Options(props) {
  return <div class='reading-options'>
    <Option option={props.options[0]} correct={props.correct} _parent={props._parent}/>
    <Option option={props.options[1]} correct={props.correct} _parent={props._parent}/>
    <Option option={props.options[2]} correct={props.correct} _parent={props._parent}/>
  </div>;
}

function Example(props) {
  return <span class='example'>{props.example}</span>;
}

function Examples(props) {
  console.log('examples', props);
  return <div class='examples'>
    <Example example={props.examples[0]}/>
    <Example example={props.examples[1]}/>
    <Example example={props.examples[2]}/>
  </div>;
}

function FrontFace(props) {
  return <div class='front face'>
    <Level level={props.level}/>
    <Kanji kanji={props.kanji}/>
    <Options
      options={props.options}
      correct={props.correct}
      _parent={props._parent}
    />
  </div>;
}

function BackFace(props) {
  console.log(props);
  return <div class='back face'>
    <Level level={props.level}/>
    <Kanji kanji={props.kanji}/>
    <Readings readings={props.readings}/>
    <Examples examples={props.examples}/>
  </div>;
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.card;
    this.state.isFlipped = false;
  }

  toggleFlip() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    return <div class={this.state.isFlipped ? 'card flip-card' : 'card'}>
      <FrontFace
        level={this.state.level}
        kanji={this.state.kanji}
        options={this.state.options}
        correct={this.state.correct}
        _parent={this}
      />
      <BackFace
        level={this.state.level}
        kanji={this.state.kanji}
        readings={this.state.readings}
        examples={this.state.examples}
      />
    </div>;
  }
}


export default Card;

