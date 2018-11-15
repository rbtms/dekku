function div(_class)        { return $( document.createElement('DIV') ).addClass(_class); }
function span(_class, text) { return $( document.createElement('SPAN') ).addClass(_class).text(text); }
function card_face(name)    { return div(name).addClass('face'); }

function option_elem(option, correct) {
  return span('reading-option', option).on('click', e => {
    if(option === correct) {
      $('.card').addClass('flip-card')
    }
  });
}

function options_elem(options, correct) {
  return div('reading-options').append( ...options.map( option =>
    option_elem(option, correct)
  ));
}

function example_elem(example) {
console.log(example)
  return span('example', example)
}

function examples_elem(examples) {
  return div('examples').append( ...examples.map( example =>
    example_elem(example)
  ));
}

function card_front(card) {
  return card_face('front').append(
    span('kanji', card.kanji),
    span('level', card.level),
    options_elem(card.options, card.correct)
  );
}

function card_back(card) {
  return card_face('back').append(
    span('kanji', card.kanji),
    span('level', card.level),
    span('reading', card.readings),
    examples_elem(card.examples)
  );
}

function append_card(_card, json) {
  const values = Object.values(json);
  const card = values[ Math.floor( Math.random() * values.length ) ];

  card.examples = _card.examples;
  card.level    = 'N'+card.level;
  card.options  = Array(3).fill(card.reading[0]);
  card.correct  = card.options[0];
  card.readings = card.reading.slice(0, 2).join(', ');

  const elem = div('card-container').append(
    div('card').append(
      card_front(card),
      card_back(card)
    )
  );

  $('body').append(elem);
  console.log(json);
}

function main() {
  const card = {
    kanji   : '大',
    level   : 'N5',
    correct : 'だい',
    options : ['だい', 'だい', 'だい'],
    examples: ['大学生です。', '大変疲れた。', '大きくなる。'],
  };

  $.getJSON('./data/n3.json', (json) => append_card(card, json))

//  append_card(card);
}

document.addEventListener('DOMContentLoaded', main);
