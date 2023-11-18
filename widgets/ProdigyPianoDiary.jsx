const [user, setUser] = useState("");
const [sheetIdx, setSheetIdx] = useState("");

const { getNormalDate, ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

const Wrapper = styled.div`
  background-color: #e7e1db;
  height: 100%;
`;

State.init({
  visibleObj: "userSheets",
});

const getUsers = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUsers().then((res) => {
    State.update({ users: res });
  });
};

const isUserRegistered = () => {
  if (!state.users) return false;

  const userTmp = state.users.find(
    (user) => user[0].toLowerCase() === state.sender
  );

  if (userTmp != undefined) setUser(userTmp);

  return userTmp != undefined;
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getUsers();
  }
}

return (
  <Wrapper>
    <Widget src={`beachsunandrockandroll.near/widget/header`} />
    {!!state.sender ? (
      <>
        {!isUserRegistered() && (
          <Widget src={`beachsunandrockandroll.near/widget/registerUser`} />
        )}
      </>
    ) : (
      <div class="text-center">
        <h1 class="fw-bold pt-5">Welcome to Prodigy Piano Diary</h1>
        <h3>Transformative Practice for Pianists</h3>
        <img
          src="https://raw.githubusercontent.com/gonzalobarria/prodigy-piano-diary/master/public/images/piano-hand.png"
          alt="PPD"
          class="pt-3 pb-5"
        />
      </div>
    )}
    {user !== "" && (
      <div class="mt-4 p-3">
        <button
          onClick={() => {
            State.update({ visibleObj: "composerList" });
          }}
        >
          Get composer List
        </button>
        <button
          onClick={() => {
            State.update({ visibleObj: "userSheets" });
          }}
        >
          Get my Sheets
        </button>
      </div>
    )}

    {/*{user && <>{user[1]}</>}

    */}
    {!!state.sender &&
      isUserRegistered() &&
      state.visibleObj === "userSheets" && (
        <Widget
          src={`beachsunandrockandroll.near/widget/userSheets`}
          props={{
            action: (sheetId) => {
              State.update({ visibleObj: "sheet", sheetIdx: sheetId });
            },
          }}
        />
      )}
    {!!state.sender && isUserRegistered() && state.visibleObj === "sheet" && (
      <Widget
        src={`beachsunandrockandroll.near/widget/sheet`}
        props={{
          action: viewSheet,
          sheetIdx: state.sheetIdx,
          back: () => State.update({ visibleObj: "userSheets" }),
        }}
      />
    )}
    {!!state.sender &&
      isUserRegistered() &&
      state.visibleObj === "composerList" && (
        <Widget
          src={`beachsunandrockandroll.near/widget/composerList`}
          props={{
            back: () => State.update({ visibleObj: "userSheets" }),
          }}
        />
      )}
  </Wrapper>
);
