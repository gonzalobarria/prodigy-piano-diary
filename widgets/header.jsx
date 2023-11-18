const Header = styled.div`
    background: #000;
    color: white;
    padding-top: 7px;
    padding-bottom: 7px;
    display: flex;

    .img {
        height: 70px;
    }

    .connect {
        width: 100%;
        text-align: right;
        height: 70px;
    }

    .user {
      padding-right: 10px;
      padding-top: 22px;
      height: 100%;
    }

    .conn-button {
      padding-right: 10px;
      padding-top: 15px;
      height: 100%;
    }
`;

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

return (
  <Header>
    <div class="logo">
      <img
        src="https://raw.githubusercontent.com/gonzalobarria/prodigy-piano-diary/master/public/images/ppd-mini-logo-black.jpg"
        class="img"
      />
    </div>
    <div class="connect">
      {!!state.sender ? (
        <div class="user">{`${state.sender.slice(0, 4)}...${state.sender.slice(
          -4
        )}`}</div>
      ) : (
        <div class="conn-button">
          <Web3Connect connectLabel="Connect with Web3" />
        </div>
      )}
    </div>
  </Header>
);
