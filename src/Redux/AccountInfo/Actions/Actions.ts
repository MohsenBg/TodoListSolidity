import { ActionTypeAccountInfo } from "../ActionType/ActionType";

interface AccountAddress {
  type: ActionTypeAccountInfo.ACCOUNT_ADDRESS;
  payload: any;
}

interface AccountBalance {
  type: ActionTypeAccountInfo.ACCOUNT_BALANCE;
  payload: any;
}

interface Web3 {
  type: ActionTypeAccountInfo.WEB3;
  payload: any;
}
export type ActionsAccountInfo = AccountAddress | AccountBalance | Web3;
