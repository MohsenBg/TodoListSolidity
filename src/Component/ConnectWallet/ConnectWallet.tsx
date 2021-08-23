import React, { useState } from "react";
import "./ConnectWallet.scss";
import MetaMaskLogo from "../../assets/logo/MetaMask.svg";
import Wallet from "../../assets/other/wallet.png";
import { useDispatch } from "react-redux";
import { ActionTypeAccountInfo } from "../../Redux/AccountInfo/ActionType/ActionType";
const ConnectWallet = ({ click }: any) => {
  return (
    <div className="containerConnectWallet">
      <div className="backgroundConnectWallet">
        <h1 className="titleConnectWallet">Connect your wallet</h1>
        <img className="walletImg" src={Wallet} alt="wallet" />
        <div className="btnContainerConnectWallet">
          <div className="connectWalletBtn" onClick={click} role="button">
            <img
              className="MetaMaskLogo"
              src={MetaMaskLogo}
              alt="metaMaskLogo"
            />
            Connect with MetaMask
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
