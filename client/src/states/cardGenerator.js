import Catcard from "../Cards/Catcard";
import Defusecard from "../Cards/Defusecard";
import Explodecard from "../Cards/Explodecard";
import Shufflecard from "../Cards/Shufflecard";

const generateCard = () => {
  const cardObjects = {
    1: <Catcard />,
    2: <Defusecard />,
    3: <Shufflecard />,
    4: <Explodecard />,
  };
  let cardArray = [];
  const randomNumber = () => Math.floor(Math.random() * (5 - 1) + 1);
  for (let index = 0; index < 5; index++) {
    cardArray.push(cardObjects[randomNumber]);
  }
  return cardArray;
};

export default generateCard;
