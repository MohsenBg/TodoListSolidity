import "./App.scss";
import Home from "./Page/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoList from "./Page/TodoList/TodoList";
import Navbar from "./Component/NavBar/NavBar/Navbar";
import { useDispatch } from "react-redux";
import { ActionTypeAccountInfo } from "./Redux/AccountInfo/ActionType/ActionType";
import Web3 from "web3";
import { useEffect } from "react";

import MainLoading from "./Component/Loading/MainLoading";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
    connectWallet();
  }, []);

  return (
    <Router>
      <div>
        <MainLoading />
      </div>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/TodoList" component={TodoList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
