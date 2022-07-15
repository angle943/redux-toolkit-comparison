import React from "react";

import { CartItemType } from "../Index";

interface Props {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
  handleShowDetails: (item: CartItemType) => void;
}

const Item: React.FC<Props> = ({
  item,
  handleAddToCart,
  handleShowDetails,
}) => {
  return (
    <>
      <img
        src={item.image}
        alt={item.title}
        height="45%"
        width="100%"
        onClick={() => handleShowDetails(item)}
      />
      <div style={{ color: "white" }}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <button onClick={() => handleAddToCart(item)}>Add to cart</button>
    </>
  );
};

export default Item;
