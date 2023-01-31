const text_base =
  ' x = 8 ; if (x> 9) { console. log ("Aloha ") end if else { Console. log ("Sou menor que 9") end';

let word_array = text_base.split(' ');
const array_consoles = ['console.', 'console', 'console.log'];

// removendo espaços em branco
word_array = word_array.filter((item) => item.toString() != '');
const word_array_parsed = [];

for (let index = 0; index < word_array.length; index++) {
  const first_word = word_array[index];

  console.log(`Primeira ${first_word}, index ${index}`);
  const response_console = buildConsoles(first_word, index);
  if (response_console) {
    console.log(response_console);
    // criar lógica para substituir no array?
    index = response_console.newIndex;
  }
}

function buildConsoles(first_word, index) {
  if (array_consoles.includes(first_word.toLocaleLowerCase())) {
    // for a partir do indice da palavra console
    let isInitialString = false;
    let stringOfConsole = '';
    let newIndex = 0;
    for (
      let index_console = index;
      index_console < word_array.length;
      index_console++
    ) {
      if (word_array[index_console].includes('("')) {
        isInitialString = true;
      }
      if (isInitialString) {
        stringOfConsole = `${stringOfConsole} ${word_array[index_console]}`;
      }
      if (word_array[index_console].includes('")')) {
        newIndex = index_console;
        console.log(stringOfConsole);

        break;
      }
    }
    return { newIndex, stringOfConsole };
  }
}
