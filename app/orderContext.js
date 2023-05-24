import { createContext, useReducer, useEffect } from 'react';
import ordersReducer from './orderReducer';

export const OrdersContext = createContext([]);
export const OrdersActionsContext = createContext({});

export function OrdersProvider({ children }) {
    const [orders, dispatch] = useReducer(
        ordersReducer,
        []
    );

    useEffect(() => {
        fetch('https://pizza-api-app.herokuapp.com/api/orders')
          .then(res => res.json())
          .then(data => dispatch({orders: data, type: "get"}))
    }, []);

    return (
        <OrdersContext.Provider value={orders}>
            <OrdersActionsContext.Provider value={dispatch}>
                {children}
            </OrdersActionsContext.Provider>
        </OrdersContext.Provider>
    );
}