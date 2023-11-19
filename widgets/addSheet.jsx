const setAddSheet = props.setAddSheet;

const { ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

const [sheetName, setSheetName] = useState("");
const [composerIdx, setComposerIdx] = useState(0);
const [difficulty, setDifficulty] = useState(0);

State.init({
  img: null,
});

const addSheet = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    let dataUri = "";
    if (state.img.cid) dataUri = state.img.cid;

    ppd
      .addSheet(
        sheetName,
        composerIdx,
        Big(userIdx).toFixed(),
        parseInt(difficulty),
        dataUri
      )
      .then(() => {
        setAddSheet(false);
      });
  });
};

const getComposers = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getComposers().then((res) => {
    const comp = res && res.map((r) => r[0]);
    State.update({ composers: comp });
  });
};

useEffect(() => {
  getComposers();
}, [ppdContract]);

return (
  <>
    <div>
      <h5 class="text-center pb-2">Fill the Form to Add a new Sheet</h5>
      <input
        className="form-control m-2 p-2"
        type="text"
        id="sheetName"
        name="sheetName"
        required
        placeholder="Name of the Sheet"
        onChange={(event) => {
          setSheetName(event.target.value);
        }}
      />
      <Typeahead
        className="p-2"
        options={state.composers}
        // multiple
        onChange={(value) => {
          setComposerIdx(0);
        }}
        placeholder="Select Composer"
      />
      <div class="px-2 pb-2">
        Sheet upload: <br />
        <IpfsImageUpload image={state.img} />
      </div>
      <input
        className="form-control m-2 p-2"
        type="number"
        id="difficulty"
        name="difficulty"
        required
        placeholder="Level of Difficulty"
        onChange={(event) => {
          setDifficulty(event.target.value);
        }}
      />
      <div class="px-2 pt-2">
        <button onClick={addSheet}>Add Sheet</button>
        <button
          onClick={() => {
            setAddSheet(false);
          }}
          class="btn btn-outline-secondary"
        >
          Close
        </button>
      </div>
    </div>
  </>
);
