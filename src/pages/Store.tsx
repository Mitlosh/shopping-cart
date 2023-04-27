import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/item.json"

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-4">
        {storeItems.map((product: any) => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>
        ))}
      </Row>
    </>
  )
}
