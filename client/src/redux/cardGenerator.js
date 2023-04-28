const generateCard = () => {
  const cardObjects = {
    1: "CAT",
    2: "DEFUSE",
    3: "SHUFFLE",
    4: "EXPLODE",
  };
  let cardArray = [];
  const randomNumber = () => Math.floor(Math.random() * (5 - 1) + 1);
  for (let index = 0; index < 5; index++) {
    cardArray.push(cardObjects[randomNumber()]);
  }
  return cardArray;
};

export default generateCard;
