import React, {useEffect, useState} from 'react';
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Image, Alert, Button, Spinner } from "react-bootstrap";
import classes from "./Products.module.css";

function ProductDetails(props) {
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [errorBE, setErrorBE]= useState(false);
    useEffect(()=>{
        axios
            .get(`http://localhost:3000/api/product/${id}`)
            .then((response) => setData(response.data.product))
            .catch((error) => setErrorBE(true), setLoading(false))
    }, [id]);
    console.log(data)
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
                <p>Page Not Found.</p>
                <NavLink to="/">
                    Coming back to the menu.
                </NavLink>
            </Alert>
        );
    }

    var machine = "";
    const cat = data.category;
    if (cat === "64831c6f407880a3b8eecba4"){
        machine = "3DS";
    }
    else if (cat === "64831c38407880a3b8eecba1"){
        machine = "Switch";
    }
    else if (cat === "64831c7a407880a3b8eecba7"){
        machine = "Wii";
    }
    return (
        <>
        <Card>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <Image className={classes.imgDetails} src={data.images} rounded />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <h3>{data.name}</h3>
                        </Col>
                        <Col xs={6} md={4}>
                        <h3>Console : </h3>
                        <p>{machine}</p>
                        </Col>
                        <Col xs={6} md={4}>
                        <h3>Prix : </h3>
                        <p>{data.price} €</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h3>Synopsis : </h3>
                            <p>{data.description}</p>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    </>
    )
}

export default ProductDetails

