const generateCard = () => {
  const cardObjects = {
    1: "Cat card",
    2: "Defuse card",
    3: "Shuffle card",
    4: "Explode card",
  };
  let cardArray = [];
  const randomNumber = () => Math.floor(Math.random() * (5 - 1) + 1);
  for (let index = 0; index < 5; index++) {
    cardArray.push(cardObjects[randomNumber()]);
  }
  return cardArray;
};

export default generateCard;
