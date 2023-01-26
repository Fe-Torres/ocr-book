const text_base =
  ' x = 8 ; if (x> 9) { console. log ("Aloha ") end if else { Console. log ("Sou menor que 9") end';
console.log(text_base);

const word_array = text_base.split(' ');

for (let index = 0; index < word_array.length; index++) {
  const word = word_array[index];

  if (word.toLocaleLowerCase() == 'console') {
    console.log();
  }
}
