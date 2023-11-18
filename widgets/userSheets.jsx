const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);
const [addSheet, setAddSheet] = useState(false);

const action = props.action;

State.init({
  userSheets: [],
  visibleObj: "userSheets",
});

const getUserSheets = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd.getUserSheets(parseInt(userIdx.toString())).then((res) => {
      let sheets = res.map((userSheet, i) => ({
        name: userSheet[0],
        createdAt: getNormalDate(userSheet[1]),
        difficulty: userSheet[2],
        dataUri: userSheet[3],
      }));
      State.update({ userSheets: sheets });
    });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getUserSheets();
  }
}

const GridWrap = styled.div`
max-width: 900px;

.gap-4 {
    gap: 1rem;
}

.grid-cols-2 {
    grid-template-columns: repeat(3,minmax(0,1fr));
}
.grid {
    display: grid;
}
  `;

return (
  <>
    {state.userSheets.length === 0 && (
      <h3 class="text-center">No Sheets Founded</h3>
    )}
    <button onClick={() => setAddSheet(true)}>New Sheet</button>
    {addSheet ? (
      <Widget
        src={`beachsunandrockandroll.near/widget/addSheet`}
        props={{ setAddSheet }}
      />
    ) : (
      <GridWrap>
        <div class="grid gap-4 grid-cols-2">
          {state.userSheets.map((userSheet, i) => (
            <Widget
              src={`beachsunandrockandroll.near/widget/card`}
              props={{
                title: userSheet.name,
                desc: userSheet.createdAt,
                buttonTitle: "View Sheet",
                action: () => {
                  action(i);
                },
              }}
            />
          ))}
        </div>
      </GridWrap>
    )}
  </>
);
