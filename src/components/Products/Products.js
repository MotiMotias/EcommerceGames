import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import classes from "./Products.module.css";
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Products() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [errorBE, setErrorBE]= useState(false);
    useEffect(()=>{
        axios
            .get('http://localhost:3000/api/product')
            .then((response) => setData(response.data.products))
            .catch((error) => setErrorBE(true), setLoading(false))
    }, []);
    if (loading) {
        return (
            <>
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </Button>{' '}
            </>
        )
    }
    if (errorBE){
        return (
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    There is a problem with the database!
                </p>
            </Alert>
        );
    }

    const quantity=0;
    const newArrayProducts = data.map((jeu) =>
        <ProductItem key={jeu.id} id={jeu.id} title={jeu.name} description={jeu.description} img={jeu.images} price={jeu.price} quantity={quantity} />)

    return (
        // <Row xs={1} md={2} className={classes.row}>
        // {Array.from({ length: 4 }).map((_, idx) => (
        //     <Col className={classes.col}>
        //         {newArrayProducts}
        //     </Col>
        // ))}
        // </Row>
        <section className={classes.products}> {newArrayProducts}</section>
       
    )
}

export default Products