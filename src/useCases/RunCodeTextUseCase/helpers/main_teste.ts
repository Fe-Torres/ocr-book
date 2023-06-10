const text_base =
  ' x = 8 ; if (x> 9) { console. log ("Aloha ") end else { Console. log ("Sou menor que 9") end';

let word_array = text_base.split(' ');
const array_consoles = ['console.', 'console', 'console.log'];

// removendo espaços em branco
word_array = word_array.filter((item) => item.toString() != '');
console.log(word_array.toString().replace(/,/gm, ''));
console.log();
const word_array_parsed = [];

for (let index = 0; index < word_array.length; index++) {
  const word = word_array[index];

  const response_console = buildConsoles(word, index);
  if (response_console) {
    console.log(response_console);
    // criar lógica para substituir no array?
    index = response_console.newIndex;
  }
  console.log(`word: ${word}, index ${index}`);
}

function buildConsoles(word, index) {
  if (array_consoles.includes(word.toLocaleLowerCase())) {
    // for a partir do indice da palavra console
    let isInitialString = false;
    let stringOfConsole = '';
    let newIndex = 0;
    for (
      let index_console = index;
      index_console < word_array.length;
      index_console++
    ) {
      console.log(`Dentro do build consoles index: ${index_console} 
      Word :${word_array[index_console]}
      `);

      if (
        // Inicio do console.log
        word_array[index_console].includes('("') ||
        word_array[index_console].includes('(')
      ) {
        isInitialString = true;
      }
      if (isInitialString) {
        //Se passou do inicio da strring ele só vai concatenar o restante dos dados do array até
        // chegar no final da strring (que será um item terminado com ") ou )
        stringOfConsole = `${stringOfConsole} ${word_array[index_console]}`;
      }
      if (
        // Final do console.log
        // Chegnado se cheguei no final
        word_array[index_console].includes('")') ||
        word_array[index_console].includes(')')
      ) {
        newIndex = index_console;
        console.log(stringOfConsole);
        break;
      }
    }
    return { newIndex, stringOfConsole };
  }
}
