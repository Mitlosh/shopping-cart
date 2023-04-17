import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { useEffect, useState } from "react"
import data from "../data/item.json"

type ShoppingCartProps = {
  toggleCart: boolean
}

export function ShoppingCart({ toggleCart }: ShoppingCartProps) {
  const { toggleCartDisplay, cartItems } = useShoppingCart()

  return (
    <Offcanvas show={toggleCart} placement="end" onHide={toggleCartDisplay}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:
            {cartItems.reduce((acc, cartItem) => {
              const item = data.find((item) => item.id === cartItem.id)
              return acc + (item?.price || 0) * cartItem.quantity
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
