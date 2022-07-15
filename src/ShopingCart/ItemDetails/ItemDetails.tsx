import React from "react";
import { Link } from "react-router-dom";
import { CartItemType } from "../Index";
import { Wrapper } from "./ItemDetails.styles";

interface Props {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
}

const ItemDetails: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <Link to="/products">Show All Products</Link>
      <img src={item.image} alt={item.title} height="80%" width="100%" />
      <div style={{ color: "white" }}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <button onClick={() => handleAddToCart(item)}>Add to cart</button>
    </Wrapper>
  );
};

export default ItemDetails;
