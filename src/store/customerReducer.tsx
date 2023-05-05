const defaultState = {
  customers: [],
}

const ADD_CUSTOMER = "ADD_CUSTOMER"
const REMOVE_CUSTOMER = "REMOVE_CUSTOMER"
const FETCH_CUSTOMERS = "FETCH_CUSTOMERS"

export const customerReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        ...state,
        customers: [...state.customers, ...action.payload],
      }
    case ADD_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload] }

    case REMOVE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
      }

    default:
      return state
  }
}

export const addCustomerAction = (payload: object) => ({ type: ADD_CUSTOMER, payload })
export const removeCustomerAction = (payload: number) => ({ type: REMOVE_CUSTOMER, payload })
export const fetchCustomersAction = (payload: object) => ({ type: FETCH_CUSTOMERS, payload })
