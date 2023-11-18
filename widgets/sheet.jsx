const sheetIdx = props.sheetIdx || 0;
const back = props.back;

const { getNormalDate, ppdContract, ppdAbi, studyType, focusType } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);
const [addRecord, setAddRecord] = useState(false);
const [showImg, setShowImg] = useState(false);

State.init({
  userSheets: [],
});

const getUserSheets = () => {
  if (ppdContract == undefined) return;

  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd.getUserSheets(parseInt(userIdx.toString())).then((userSheets) => {
      userSheets.map((userSheet, i) => {
        if (i === sheetIdx) {
          const sheet = {
            name: userSheet[0],
            createdAt: getNormalDate(userSheet[1]),
            difficulty: userSheet[2],
            dataUri: userSheet[3],
          };
          State.update({ sheet });
        }
      });
    });
  });
};

const getRecordsBySheet = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.getUserIdx().then((userIdx) => {
    ppd.getRecordsBySheet(Big(userIdx).toFixed(), sheetIdx).then((res) => {
      const records = res.map((r) => ({
        phraseNum: Big(r[0]).toFixed(),
        subPhraseNum: Big(r[1]).toFixed(),
        qtyMinutes: r[2],
        studyType: r[3],
        focusType: r[4],
        isAllSheet: r[5],
        createdAt: r[6],
      }));

      State.update({ records });
    });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getUserSheets();
    getRecordsBySheet();
  }
}

return (
  <>
    <h2>{state.sheet.name}</h2>
    <p>Created At: {state.sheet.createdAt}</p>
    {state.sheet.dataUri && (
      <a href="#" onClick={() => setShowImg(!showImg)}>
        Show/Hide Sheet
      </a>
    )}
    <div className="mt-2">
      {showImg && state.sheet.dataUri && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.sheet.dataUri}`}
          alt="uploaded"
        />
      )}
    </div>
    <button onClick={back}>Back</button>
    <button
      onClick={() => {
        setAddRecord(true);
        setSheetIdx(i);
      }}
    >
      New Record
    </button>

    {addRecord ? (
      <>
        <Widget
          src={`beachsunandrockandroll.near/widget/addRecord`}
          props={{
            setAddRecord,
            sheetIdx,
          }}
        />
      </>
    ) : (
      state.records && (
        <>
          <h4 class="text-center">Record List</h4>
          <div class="mt-4">
            <table className="table table-bordered table-hover table-responsive bg-light p-3 shadow-lg rounded">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Phrase Number</th>
                  <th scope="col">SubPhrase Number</th>
                  <th scope="col">Qty Minutes</th>
                  <th scope="col">Mensaje</th>
                  <th scope="col">Study Type</th>
                  <th scope="col">Focus Type</th>
                  <th scope="col">Created at</th>
                </tr>
              </thead>
              <tbody>
                {state.records
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((record) => {
                    return (
                      <tr>
                        <td>{record.phraseNum}</td>
                        <td>{record.subPhraseNum}</td>
                        <td>{record.qtyMinutes}</td>
                        <td>{studyType[record.studyType]}</td>
                        <td>{focusType[record.focusType]}</td>
                        <td>{record.isAllSheet ? "Yes" : "No"}</td>
                        <td>{getNormalDate(record.createdAt)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )
    )}
  </>
);
