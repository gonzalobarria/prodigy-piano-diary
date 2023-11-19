const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);
const [addComposer, setAddComposer] = useState(false);

const back = props.back;

State.init({
  composers: [],
});

const getComposerList = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getComposers().then((res) => {
    const composers = res.map((composer, i) => ({
      name: composer[0],
      birtdate: composer[1],
    }));

    State.update({ composers });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getComposerList();
  }
}

const GridWrap = styled.div`

.gap-4 {
    gap: 1rem;
}

.grid-cols-2 {
    grid-template-columns: repeat(4,minmax(0,1fr));
}
.grid {
    display: grid;
}
  `;

return (
  <div class="px-3 py-5">
    <h3 class="text-center">
      {state.composers.length === 0 ? "No Composers Found" : "Composer List"}
    </h3>
    {!addComposer && (
      <button onClick={() => setAddComposer(true)} class="mb-4 btn btn-primary">
        New Composer
      </button>
    )}

    {addComposer ? (
      <div class="pt-2 pb-2">
        <h5 class="text-center pb-2">Fill the Form to Add a Composer</h5>
        <Widget
          src={`beachsunandrockandroll.near/widget/addComposer`}
          props={{ setAddComposer }}
        />
      </div>
    ) : (
      <GridWrap>
        <div class="grid gap-4 grid-cols-2">
          {state.composers.map((composer, i) => (
            <Widget
              src={`beachsunandrockandroll.near/widget/card`}
              props={{
                title: composer.name,
                desc: composer.birtdate,
              }}
            />
          ))}
        </div>
      </GridWrap>
    )}
  </div>
);
