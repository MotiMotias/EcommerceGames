// import context from "react-bootstrap/esm/AccordionContext";
import CartItemContext from './CartContext';
import React, { useReducer } from 'react';


function CartContextProvider({ children }) {
    
    const initialVal = {
        totalPrice : 0,
        products: []
    }

    function cartReducer(state, action){
        const {type, payload} = action;
        switch (type){
            case 'price_changed':
                return {
                    ...state,
                    totalPrice : payload.totalPrice
                }
            case 'added':
                return {
                    ...state,
                    products : payload.products
                }
            case 'deleted':
            return {
                ...state,
                products : payload.products
            }
            default:
                return;
        }
    }

    const [state,dispatch] = useReducer(cartReducer,initialVal)

    const addProduct = (product, value) => {
        const updatedCart = state.products.concat(product)
        updatePrice(updatedCart);
        dispatch({
            type:'added',
            payload: {products : updatedCart}
        })
    }

    const removeProduct = (product) => {
        const updatedCart = state.products.filter((currentProduct) => currentProduct.title !== product.title)
        updatePrice(updatedCart);
        dispatch({
            type:'deleted',
            payload: {products : updatedCart}
        })
    }

    const updatePrice = (product) => {
        let totalPrice = 0
        product.forEach((product)=> totalPrice += product.price * product.quantity);
        dispatch({
            type:'price_changed',
            payload : {totalPrice}
        });
    }

    const addQuantity = (product, value) => {
        const updatedCart = state.products.map((currentProduct) => {
            if (currentProduct.id === product.id) {
                return {
                    ...currentProduct,
                    quantity: currentProduct.quantity + parseInt(value)
                };
            }
            return currentProduct;
        });

        updatePrice(updatedCart);
        dispatch({
            type:"added",
            payload: {
                products: updatedCart,
            },
        });
    };

    const context={
        items : state.products,
        totalPrice : state.totalPrice,
        addProduct,
        removeProduct,
        addQuantity
    }

    

    return (
        <CartItemContext.Provider value={context}>
            {children}
        </CartItemContext.Provider>
    )
}

export default CartContextProvider