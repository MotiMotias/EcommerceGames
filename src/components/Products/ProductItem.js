import React from 'react';
import Card from 'react-bootstrap/Card';
import ProductItemForm from './ProductItemForm';
import classes from "./Products.module.css";
import {Link} from 'react-router-dom'

function ProductItem(props) {
  return (
    <Card style={{ width: '18rem', margin : '5px' }} className={classes.card}>
      <Link className={classes.productLink} to={`/details/${props.id}`} >
        <Card.Img variant="top" src={props.img}/>
      </Link>
      <Card.Body className={classes.body}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
        </Card.Text>
        <ProductItemForm title={props.title} price = {props.price} key={props.id} id={props.id} quantity={props.quantity}/>
      </Card.Body>
    </Card>
  )
}

export default ProductItem