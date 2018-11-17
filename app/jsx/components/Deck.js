
function Level(props) {
  return <span class='level'>{`N${props.level}`}</span>;
}

function Kanji(props) {
  return <div class='kanji-div'>
    <span class='kanji'>{props.kanji}</span>
  </div>;
}

function Meaning(props) {
  console.log('meaning', props);

  return <div class='meaning-div'>
    <span class='meaning'>{props.meaning}</span>
  </div>
}

function TableRow(props) {
  console.log('row', props);

  return <tr class='reading-row'>
    <td>{props.on[props.i]||''}</td>
    <td>{props.kun[props.i]||''}</td>
  </tr>;
}

function Reading(props) {
  console.log('reading', props.reading);
  const on  = props.reading.on;
  const kun = props.reading.kun;

  return <table class='reading-table'>
    <tr class='reading-header'>
      <td>音</td>
      <td>訓</td>
    </tr>
    <TableRow i={0} on={on} kun={kun} />
    <TableRow i={1} on={on} kun={kun} />
    <TableRow i={2} on={on} kun={kun} />
  </table>;
}

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = { can_click: true };
    this.is_correct = props.option === props.correct;
    this.option     = props.option;
    this._parent    = props._parent;
  }

  clickHandler() {
    if( this.state.can_click ) {
      this.setState({ can_click: false });

      if(this.is_correct) {
        this._parent.add_point();
      }

      setTimeout( () => {
        this._parent.toggle_flip();

        setTimeout(
          () => this.setState({ can_click: true }),
          1000
        );
      }, 500 );
    }
  }

  render() {
    return <div class='reading-option-div'>
      <div class={ this.state.can_click
        ? 'option-clicked-nodisplay'
        : this.is_correct
          ? 'option-clicked-correct'
          : 'option-clicked-incorrect'
      }></div>
      <span class='reading-option' onClick={() => this.clickHandler()}>
        {this.option}
      </span>
    </div>
  };
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
  console.log('frontface', props);
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
  console.log('backface', props);
  return <div class='back face' onClick={() => props._parent.toggle_flip()} >
    <Level level={props.level}/>
    <Kanji kanji={props.kanji}/>
    <Meaning meaning={props.meaning}/>
    <Reading reading={props.reading}/>
  </div>;
}

export default class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.FRONT = 0;
    this.BACK  = 1;

    this.all  = props.all;
    this.deck = props.deck.slice();
    this.card = this.draw_card();
    
    this.points = 0;

    this.state = {
      card  : this.card,
      front : Object.assign({}, this.card),
      back  : Object.assign({}, this.card),
      flip_degrees: 0,
      flip_state: 0
    };
  }

  draw_card(deck) {
    console.log('draw', this.deck[0]);

    if( this.deck.length )
      return this.deck.shift();
    else {
      alert(`Score: ${this.points}/10`);
      return this.card;
    }
  }

  add_point() {
    this.points++;
  }

  toggle_flip() {
    const timeout = this.flip_state === this.FRONT ? 1000 : 500;
    const flip_state   = !this.state.flip_state;
    const flip_degrees = this.state.flip_degrees - 180;
    
    this.setState({flip_state, flip_degrees});

    setTimeout( () => {
      if(flip_state) {
        const card = this.draw_card();

        this.setState({
          card: card,
          front: Object.assign({}, card)
        });
      }
      else {
        this.setState({
          back: Object.assign({}, this.state.card)
        })
      }
    }, timeout);
  }

  render() {
    return <div class='card' style={{ transform: `rotateY(${this.state.flip_degrees}deg)` }}>
      <FrontFace
        level={this.state.front.level}
        kanji={this.state.front.kanji}
        options={this.state.front.options}
        correct={this.state.front.correct}
        _parent={this}
        key={Math.random()}
      />
      <BackFace
        level={this.state.back.level}
        kanji={this.state.back.kanji}
        meaning={this.state.back.meaning}
        reading={this.state.back.reading}
        _parent={this}
      />
    </div>;
  }
}

