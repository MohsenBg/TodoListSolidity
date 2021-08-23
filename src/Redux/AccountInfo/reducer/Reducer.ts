import { ActionsAccountInfo as Actions } from "./../Actions/Actions";
import { ActionTypeAccountInfo as ActionType } from "../ActionType/ActionType";

const initialState = {
  addressAccount: "",
  balance: "",
  Web3: "",
};

export const reducerAccountInfo = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.ACCOUNT_ADDRESS:
      return { ...state, addressAccount: action.payload };
    case ActionType.ACCOUNT_BALANCE:
      return { ...state, balance: action.payload };
    case ActionType.WEB3:
      return { ...state, Web3: action.payload };
    default:
      return state;
  }
};
