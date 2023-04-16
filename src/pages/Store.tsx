import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"

export function Store() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => setProducts((prev) => data))
  }, [])

  return (
    <>
      <h1>Store</h1>
      <Row md={2} sx={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>
        ))}
      </Row>
    </>
  )
}
