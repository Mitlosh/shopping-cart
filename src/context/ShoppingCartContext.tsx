import { createContext, useContext, useState } from "react"

type ShoppingCartProviderProps = {
  children: React.ReactNode
}

type ShoppingCartContext = {
  toggleCartDisplay: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [toggleCart, setToggleCart] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)

  const toggleCartDisplay = () => setToggleCart((current) => !current)

  function getItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id)
    return item ? item.quantity : 0
  }
  function increaseCartQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      item.quantity++
      setCartItems([...cartItems])
    } else {
      setCartItems([...cartItems, { id, quantity: 1 }])
    }
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity-- }
          }
          return item
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        toggleCartDisplay,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
