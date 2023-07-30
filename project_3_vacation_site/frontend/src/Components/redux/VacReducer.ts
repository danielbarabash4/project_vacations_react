import Vacation from "../Modal/Vacation";

export class VacState {
  public allVacs: Vacation[] = [];
}

export enum VacActionType {
  addVac = "addVac",
  deleteVac = "deleteVac",
  searchVac = "searchVac",
  downloadVac = "downloadVac",
}

export interface VacAction {
  type: VacActionType;
  payload?: any;
}

export function addVacAction(newVac: Vacation): VacAction {
  return { type: VacActionType.addVac, payload: newVac };
}

export function deleteVacAction(id: number): VacAction {
  return { type: VacActionType.deleteVac, payload: id };
}

export function downloadVacAction(allVacs: VacAction[]): VacAction {
  return { type: VacActionType.downloadVac, payload: allVacs };
}

export function VacReducer(
  currentState: VacState = new VacState(),
  action: VacAction
): VacState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacActionType.addVac:
      newState.allVacs = [...newState.allVacs, action.payload];
      break;

    case VacActionType.deleteVac:
      newState.allVacs = [...newState.allVacs].filter(
        (item) => item.id !== action.payload
      );
      break;

    // case VacActionType.searchVac:
    //     newState.allVacs = [...newState.allVacs].filter((item)=>
    //     item.begin.includes(action.payload)
    //     );

    case VacActionType.downloadVac:
      newState.allVacs = action.payload;
      break;
  };

  return newState;
};
