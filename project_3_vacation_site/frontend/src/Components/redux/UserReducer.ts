import LoggedModal from "../Modal/LoggedModal";

export class UserState {
  public Logged: LoggedModal[] = [];
}

export enum UserActionType {
  logUser = "logUser",
  deleteUser = "deleteUser",
  downloadUser = "downloadUser",
}

export interface UserAction {
  type: UserActionType;
  payload?: any;
}

export function getUserAction(newUser: LoggedModal): UserAction {
  return { type: UserActionType.logUser, payload: newUser };
}

export function deleteUserAction(): UserAction {
  return { type: UserActionType.deleteUser };
}

export function downloadUserAction(user: LoggedModal): UserAction {
  return { type: UserActionType.downloadUser, payload: user };
}

export function userReducer(
  currentState: UserState = new UserState(),
  action: UserAction
): UserState {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionType.logUser:
      newState.Logged = [...newState.Logged, action.payload];
      break;

    case UserActionType.deleteUser:
      newState.Logged = [];
      break;

    case UserActionType.downloadUser:
      newState.Logged = action.payload;
      break;
  }
  return newState;
}
