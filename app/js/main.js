function get_json(path) {
  return $.getJSON(path);
}

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
    span('reading', card.correct),
    examples_elem(card.examples)
  );
}

function append_card(card, json) {
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

  $.getJSON('./test2.json', (json) => append_card(card, json))

  append_card(card);
//  const json = get_json('./test2.js');
//console.log(json
}

document.addEventListener('DOMContentLoaded', main);
