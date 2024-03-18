import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import CartContext from '../../Store/CartContext';

function Cart(props) {
    const context = useContext(CartContext);
    const products = context.items;
    const total = context.totalPrice;


    function handleClick(productId){
        const selected = products.find((product)=>product.id === productId);
        context.removeProduct(selected);
    }    

    
    const newArrayProduct = products.map((jeu) =>
    <tr key={jeu.id}>
        <td>{jeu.title}</td>
        <td>{jeu.price}</td>
        <td>{jeu.quantity}</td>
        <td><img src='trash.svg' alt='cancel' width={20} onClick={() => handleClick(jeu.id)}></img></td>
    </tr>
    )
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newArrayProduct}
                    </tbody>
                </Table>
                Total Price : {total}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="secondary">
                    Order
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;