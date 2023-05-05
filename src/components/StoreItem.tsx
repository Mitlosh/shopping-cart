import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { Link } from "react-router-dom"

type StoreItemProps = {
  id: number
  image: string
  brand: string
  model: string
  price: number
}

export function StoreItem({ id, image, model, brand, price }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart()
  const quantity = getItemQuantity(id)

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} height="300px" style={{ objectFit: "contain" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Text>
          <span className="text-muted">{brand}</span>
        </Card.Text>
        <Link to={`/stores/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-4">{model}</span>
          </Card.Title>
        </Link>
        <Card.Text>
          <span className="text-muted">{formatCurrency(price)}</span>
        </Card.Text>
        <div className="d-flex">
          <div className="d-flex align-items-center me-auto" style={{ gap: ".5em" }}>
            <Button
              style={{ border: "none" }}
              variant="outline-secondary"
              onClick={() => decreaseCartQuantity(id)}
            >
              -
            </Button>
            <div>
              <span className="fs-3">{quantity}</span>
            </div>
            <Button
              style={{ border: "none" }}
              variant="outline-secondary"
              onClick={() => increaseCartQuantity(id)}
            >
              +
            </Button>
          </div>
          <Button onClick={() => increaseCartQuantity(id)}>Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
