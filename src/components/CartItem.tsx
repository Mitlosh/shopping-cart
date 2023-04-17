import { useShoppingCart } from "../context/ShoppingCartContext"
import { Button, Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import data from "../data/item.json"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()

  const item = data.find((item) => item.id === id)
  if (!item) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        alt=""
        style={{ width: "125px", height: "75px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".75rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted">{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" onClick={() => removeFromCart(id)}>
        &times;
      </Button>
    </Stack>
  )
}
