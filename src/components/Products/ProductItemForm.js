import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import classes from "./Products.module.css";
import React, { useContext, useEffect, useRef, useState } from 'react';
import CartContext from '../../Store/CartContext';

function ProductItemForm(props) {
  const context = useContext(CartContext);
  const products = context.items;

  const {title, price, id, quantity} = props;

  const [isInCart, setIsInCart] = useState(false)
  useEffect (() => {
    const productIsInCart = products.find((product) => product.id === id) 
    if (productIsInCart){
      setIsInCart(true)
    }
    else {
      setIsInCart(false)
    }
  }, [products, id])


  const inputRef = useRef();
  function handleClick(){
    let value = parseInt(inputRef.current.value);
    if (!value){
      value = 1;
    }
    const prod = {title, price, id, quantity}
    if (isInCart){
      console.log('hello world!')
      context.addQuantity(prod, value);
    }
    else{
      if(value>1){
        prod.quantity = value;
      }
      else{
        prod.quantity +=1;
      }
      context.addProduct(prod);
    }
  }


  return (
    <>
    <section className={classes.form}>
      <p>{props.price}</p>
      <Stack direction="horizontal" gap={3} >
        <Form.Control className="me-auto" ref={inputRef} placeholder="How many do you want?" type="number"/>
        <Button variant="secondary" onClick={handleClick}>Add</Button>
      </Stack>
    </section>
    </>
  );
}

export default ProductItemForm;

