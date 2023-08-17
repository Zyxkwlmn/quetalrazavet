import { useState } from 'react';
import Product from '../components/Product';

const initialState = {
    cart: [],
}

const useInitialState = () => {
    const [state,setState] = useState(initialState);

    const addToCart = (payload) => {
        setState({
            ...state,
            cart: [...state.cart, payload]
        });
    };

    const removeFromCart = (payload) => {
        setState({
            ...state,
            cart: state.cart.filter(item => item.id !== payload.id)
        });
    }

    return {
        state,
        addToCart,
        removeFromCart
    }
};

export default useInitialState;