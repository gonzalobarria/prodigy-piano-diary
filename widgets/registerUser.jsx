const { ppdContract, ppdAbi } = VM.require(
  "beachsunandrockandroll.near/widget/utils"
);

const [userName, setUserName] = useState("");

const addUser = () => {
  const ppd = new ethers.Contract(
    ppdContract,
    ppdAbi.body,
    Ethers.provider().getSigner()
  );

  ppd.addUser(userName, 0);
};

return (
  <>
    <div>
      <input
        className="form-control m-2 p-2"
        type="text"
        id="userName"
        name="userName"
        required
        placeholder="Full Name"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button onClick={addUser}>Register Me</button>
    </div>
  </>
);
