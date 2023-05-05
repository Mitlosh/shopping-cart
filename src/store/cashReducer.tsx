const defaultState: {
  cash: number
} = {
  cash: 10,
}

export const cashReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "ADD_CASH":
      return { ...state, cash: state.cash + action.payload }

    case "GET_CASH":
      return { ...state, cash: state.cash - action.payload }

    default:
      return state
  }
}
