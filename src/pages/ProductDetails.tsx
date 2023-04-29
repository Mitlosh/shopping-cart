import { useParams } from "react-router-dom"
import storeItems from "../data/item.json"
import { formatCurrency } from "../utilities/formatCurrency"
import { Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import GooglePayButton from "@google-pay/button-react"

export function ProductDetails() {
  const { productId } = useParams()
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart()

  const quantity: any = getItemQuantity(Number(productId))
  const product: any = storeItems.find((item) => item.id === Number(productId))
  return (
    <>
      <div
        className="d-flex justify-content-center p-5"
        style={{
          background: "white",
          gap: "7em",
        }}
      >
        <img src={product?.image} alt="" style={{ width: "500px" }} />
        <div className="d-flex flex-column">
          <div className="mb-auto">
            <h1>{product?.model}</h1>
            <p>{formatCurrency(product?.price)}</p>
            <div className="d-flex align-items-center mb-4" style={{ gap: ".5em" }}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Button
                  variant="outline-secondary"
                  style={{ border: "none" }}
                  onClick={() => decreaseCartQuantity(Number(productId))}
                >
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <Button
                  variant="outline-secondary"
                  style={{ border: "none" }}
                  onClick={() => increaseCartQuantity(Number(productId))}
                >
                  +
                </Button>
              </div>
              <Button variant="outline-secondary" onClick={() => removeFromCart(Number(productId))}>
                Remove
              </Button>
            </div>
            <h4>Description</h4>
            <p>{product?.description}</p>
            <p className="mb-0">Material:</p>
            <p>{product?.material}</p>
          </div>
          <div className="d-flex flex-column gap-2">
            <GooglePayButton
              style={{ width: "100%" }}
              environment="TEST"
              buttonSizeMode="fill"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "UAH",
                  countryCode: "UA",
                },
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("Success", paymentRequest)
                // history.push("/success")
              }}
            />
            <Button
              variant="outline-primary"
              className="w-100"
              onClick={() => increaseCartQuantity(Number(productId))}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
