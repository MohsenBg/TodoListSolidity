import "./Home.scss";
import Card from "../.././Component/Card/Card";
import ConnectWallet from "../.././Component/ConnectWallet/ConnectWallet";
import { initialState } from "../.././Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypeAccountInfo } from "../../Redux/AccountInfo/ActionType/ActionType";
import Web3 from "web3";
const Home = () => {
  const AccountData = useSelector(
    (state: typeof initialState) => state.AccountData.addressAccount
  );
  const dispatch = useDispatch();
  const connectWallet = async () => {
    let web3;
    //@ts-ignore
    if (typeof window.ethereum !== "undefined") {
      //@ts-ignore
      web3 = new Web3(window.ethereum);
      try {
        //@ts-ignore
        await window.ethereum.enable();
        dispatch({
          type: ActionTypeAccountInfo.WEB3,
          payload: web3,
        });
        let Account: any;
        await web3.eth.getAccounts().then((account: any) => {
          Account = account;
          dispatch({
            type: ActionTypeAccountInfo.ACCOUNT_ADDRESS,
            payload: account[0],
          });
        });
        await web3.eth.getBalance(Account[0]);
        const Balance = await web3.eth.getBalance(Account[0]);
        dispatch({
          type: ActionTypeAccountInfo.ACCOUNT_BALANCE,
          payload: Balance,
        });
      } catch (error) {
        alert("Can not connect to your wallet try again");
        return false;
      }
    } else {
      alert("please install meta mask");
    }
  };
  return (
    <div className="Home">
      {AccountData.length === 0 ? (
        <div className="ConnectWallet">
          <ConnectWallet click={connectWallet} />
        </div>
      ) : (
        <div className="Card">
          <Card />
        </div>
      )}
    </div>
  );
};

export default Home;
