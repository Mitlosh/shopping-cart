import { fetchCustomersAction } from "./customerReducer"

export const fetchUsers = () => {
  return async (dispatch: any) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const json = await response.json()
    dispatch(fetchCustomersAction(json))
  }
}
