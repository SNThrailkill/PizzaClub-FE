import { createContext, useReducer, useEffect } from 'react';
import ordersReducer from './orderReducer';

export const OrdersContext = createContext([]);
export const OrdersActionsContext = createContext({});

export function OrdersProvider({ children }) {
    const [orders, dispatch] = useReducer(
        ordersReducer,
        []
    );

    // Ideally we could connect using Websockets and have a realtime way to have the latest info
    // Another option is to use setInterval to poll an API and on next render the orders will be updated
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