const setAddRecord = props.setAddRecord;
const sheetIdx = props.sheetIdx;

const { ppdContract, ppdAbi, studyType, focusType } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

const [sheetName, setSheetName] = useState("");
const [phraseNumber, setPhraseNumber] = useState(0);
const [subPhraseNumber, setSubPhraseNumber] = useState(0);
const [minutes, setMinutes] = useState(0);
const [studyT, setStudyT] = useState(-1);
const [focusT, setFocusT] = useState(-1);

State.init({ studyType, focusType });

const getIdxFromArray = (array, value) => array.findIndex((a) => a === value);

const addRecord = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd
      .addRecord(
        Big(userIdx).toFixed(),
        sheetIdx,
        phraseNumber,
        subPhraseNumber,
        minutes,
        studyT,
        focusT,
        false
      )
      .then(() => {
        setAddRecord(false);
      });
  });
};

return (
  <>
    <div>
      <input
        className="form-control mt-2 mb-3 mx-2 p-2"
        type="number"
        id="phraseNumber"
        name="phraseNumber"
        required
        placeholder="Number of Phrase"
        onChange={(event) => {
          setPhraseNumber(event.target.value);
        }}
      />
      <input
        className="form-control m-2 p-2"
        type="number"
        id="subPhraseNumber"
        name="subPhraseNumber"
        required
        placeholder="Number of Sub-Phrase"
        onChange={(event) => {
          setSubPhraseNumber(event.target.value);
        }}
      />
      <Typeahead
        className="p-2 "
        options={state.studyType}
        onChange={(value) => {
          setStudyT(getIdxFromArray(state.studyType, value[0]));
        }}
        placeholder="Select Type of Study"
      />
      <Typeahead
        className="p-2"
        options={state.focusType}
        onChange={(value) => {
          setFocusT(getIdxFromArray(state.focusType, value[0]));
        }}
        placeholder="Select Type of Focus"
      />

      <input
        className="form-control m-2 p-2"
        type="number"
        id="minutes"
        name="minutes"
        required
        placeholder="How many minutes do you study?"
        onChange={(event) => {
          setMinutes(event.target.value);
        }}
      />
      <div class="  p-2">
        <button onClick={addRecord}>Add Record</button>
        <button
          onClick={() => setAddRecord(false)}
          class="btn btn-outline-secondary"
        >
          Close
        </button>
      </div>
    </div>
  </>
);
