import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { ProductDetails } from "./pages/ProductDetails"
import { useDispatch, useSelector } from "react-redux"
import { customerReducer, addCustomerAction, removeCustomerAction } from "./store/customerReducer"
import { fetchUsers } from "./store/asyncActions"

function App() {
  const dispatch = useDispatch()
  const cash: number = useSelector((state) => state.cashReducer.cash)
  const customers = useSelector((state) => state.customerReducer.customers)

  const addCash = (amount: number) => {
    dispatch({ type: "ADD_CASH", payload: amount })
  }

  const getCash = (amount: number) => {
    dispatch({ type: "GET_CASH", payload: amount })
  }

  const addCustomer = (username: string) => {
    const customer = {
      id: Date.now(),
      username,
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (id: number) => {
    dispatch(removeCustomerAction(id))
  }

  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        {cash}
        <button onClick={() => addCash(30)}>Add cash</button>
        <button onClick={() => getCash(10)}>Get cash</button>
        <button onClick={() => addCustomer(prompt())}>Add customer</button>
        <button onClick={() => dispatch(fetchUsers())}>Get users data from server</button>
        {customers.map((customer) => (
          <div key={customer.id} onClick={() => removeCustomer(customer.id)}>
            {customer.username}
          </div>
        ))}
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/stores/:productId" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  )
}

export default App
