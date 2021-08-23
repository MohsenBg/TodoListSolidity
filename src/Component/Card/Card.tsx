import React, { useEffect } from "react";
import "./Card.scss";
import WalletImg from "../../assets/other/wallet02.png";
import Ethereum from "../../assets/other/ethereum-logo.png";
import { FaCopy } from "react-icons/fa";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { initialState } from "../../Redux/store";

const Card = () => {
  const Account = useSelector(
    (state: typeof initialState) => state.AccountData.addressAccount
  );
  const Balance = useSelector(
    (state: typeof initialState) => state.AccountData.balance
  );

  const Eth = (x: any) => {
    x = parseFloat(x);
    x = x * 10 ** -18;
    if (parseFloat(x) >= 0.01) {
      x = (Math.round(x * 100) / 100).toFixed(2);
      x = x.toString();
      x = x.replace(/(\.0*|(?<=(\..*))0*)$/, "");
    }
    if (x < 0.01) {
      x = x.toString();
      x = x.replace(/(\.0*|(?<=(\..*))0*)$/, "");
    }
    return x;
  };

  return (
    <div className="containerCard">
      <div className="backgroundCard">
        <div className="imgAccountDiv">
          <img className="imgAccount" src={WalletImg} alt="ImgAccount" />
        </div>
        <div className="mainContent">
          <div className="addressAccount">
            <span className="address">
              {Account.substring(0, 5)}...
              {Account.substring(Account.length - 4)}
            </span>
            <div className="copyIcon">
              <FaCopy />
            </div>
          </div>
          <img className="imgEthereum" src={Ethereum} alt="ImgAccount" />
          <span className="balanceAccount">{Eth(Balance)} ETH</span>
          <div className="convertValue">
            <div className="btnConvert">ETH</div>
            <div className="btnConvert">Gwei</div>
            <div className="btnConvert">wei</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
