const getNormalDate = (value) =>
  new Date(parseInt(value.toString() + "000")).toLocaleString();

const ppdContract = "0xCccE9768EC26AE4f78020B33aF73061df2bCD867";

const ppdAbi = fetch(
  "https://raw.githubusercontent.com/gonzalobarria/prodigy-piano-diary/master/public/abi.json"
);

const studyType = ["Fingers", "Rhythm", "Memorization", "Dynamics"];
const focusType = ["Study", "Practice"];

const getIdxFromArray = (array, value) => array.findIndex((a) => a === value);

return {
  getNormalDate,
  ppdContract,
  ppdAbi,
  studyType,
  focusType,
  getIdxFromArray,
};
