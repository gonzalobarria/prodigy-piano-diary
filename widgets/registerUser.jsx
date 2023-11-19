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
  <div class="px-3 py-5">
    <h5 class="text-center pb-2">Fill the form to register me as a User</h5>
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
    <div class="p-2">
      <button onClick={addUser}>Register Me</button>
    </div>
  </div>
);
