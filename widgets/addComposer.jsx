const setAddComposer = props.setAddComposer;

const { ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

const [composerName, setComposerName] = useState("");
const [birthdate, setBirthDate] = useState("");

const addComposer = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.addComposer(composerName, birthdate).then(() => setAddComposer(false));
};

return (
  <>
    <div>
      <input
        className="form-control m-2 p-2"
        type="text"
        id="composerName"
        name="composerName"
        required
        placeholder="Composer's Name"
        onChange={(event) => {
          setComposerName(event.target.value);
        }}
      />
      <input
        className="form-control m-2 p-2"
        type="text"
        id="birthDate"
        name="composerName"
        required
        placeholder="Composer's Birthdate"
        onChange={(event) => {
          setBirthDate(event.target.value);
        }}
      />
      <button onClick={addComposer}>Add Composer</button>
    </div>
  </>
);
