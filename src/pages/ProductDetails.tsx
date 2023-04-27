import { useParams } from "react-router-dom"
import storeItems from "../data/item.json"
import { formatCurrency } from "../utilities/formatCurrency"
import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function ProductDetails() {
  const { productId } = useParams()
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart()

  const quantity: any = getItemQuantity(Number(productId))
  const product: any = storeItems.find((item) => item.id === Number(productId))
  return (
    <>
      <h1>Product Details {productId}</h1>

      <div
        className="d-flex align-items-center gap-5"
        style={{
          border: "1px solid lightgray",
          borderRadius: "8px",
          background: "white",
          width: "600px",
        }}
      >
        <img src={product?.image} alt="" style={{ width: "300px" }} />
        <div>
          <h1>{product?.model}</h1>
          <p>{formatCurrency(product?.price)}</p>
          <div className="ms-auto">
            {quantity === 0 ? (
              <Button className="w-100" onClick={() => increaseCartQuantity(Number(productId))}>
                + Add to Cart
              </Button>
            ) : (
              <div className="d-flex align-items-center flex-column" style={{ gap: ".5em" }}>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5em" }}
                >
                  <Button onClick={() => decreaseCartQuantity(Number(productId))}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span>
                  </div>
                  <Button onClick={() => increaseCartQuantity(Number(productId))}>+</Button>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(Number(productId))}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
