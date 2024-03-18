import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import CartContext from '../../Store/CartContext'

function HeaderCartButton() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const context = useContext(CartContext);
    const products = context.items;


    const howMany = products.reduce( 
        (prevValue, currentValue) => parseInt(prevValue) + parseInt(currentValue.quantity),
        0
    );

    return (
        <>
        <Button variant="primary" onClick={handleShowModal}>
            Your Cart <Badge bg="secondary">{howMany}</Badge>
            <span className="visually-hidden">products</span>
        </Button>
        <Cart show={showModal} handleClose={handleCloseModal} />
        </>
    );
}

export default HeaderCartButton;