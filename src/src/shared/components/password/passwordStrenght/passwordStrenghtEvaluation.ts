export const passwordStrenghtEvaluation = (password: string): number => {
  //Regular Expressions.
  let regex = [];
  regex.push("[A-Z]"); //Uppercase Alphabet.
  regex.push("[a-z]"); //Lowercase Alphabet.
  regex.push("[0-9]"); //Digit.
  regex.push("[$@!%*#?&(){}/+\\_\\-.;,~><:|]"); //Special Character.

  let passwordStrenghtLevel = 0;

  for (let i = 0; i < regex.length; i++) {
    if (new RegExp(regex[i]).test(password)) {
      passwordStrenghtLevel++;
    }
  }

  return passwordStrenghtLevel;
};
