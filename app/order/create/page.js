'use client'; 

import { useContext, useState, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css'
import { SendingMessage, SuccessMessage } from '@/components/utils';
import { AuthContext } from '@/app/auth/authContext';
import { OrdersActionsContext } from '@/app/orderContext';


function CreateActionRow({placeOrder, sendingOrder, success}) {
    if(success) {
        return SuccessMessage
    } else {
        if(sendingOrder) {
            return SendingMessage
        }
    }
    return (
      <div className={styles.contents}>
          <button onClick={placeOrder} className={styles.card}>
              <h2>Place Order</h2>
          </button>
      </div>
  )
}

export default function OrderDetails() {
    const {cookie} = useContext(AuthContext);
    const dispatch = useContext(OrdersActionsContext);
    const [crust, setCrust] = useState();
    const [flavor, setFlavor] = useState();
    const [size, setSize] = useState();
    const [table, setTable] = useState();
    const [sendingOrder, setSendingOrder] = useState();
    const [success, setSucess] = useState();
    const { push } = useRouter();

    async function placeOrder() {
        if(!crust || !flavor || !size || !table) {
            alert("Please Fill in all Fields");
            return
        }

        setSendingOrder(true);
        const res = await fetch('https://pizza-api-app.herokuapp.com/api/orders', {
        method: 'POST',    
        headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.accessToken
            },
        body: JSON.stringify({
            "Crust": crust,
            "Flavor": flavor,
            "Size": size,
            "Table_No": Number(table)
        })
        });

        if(!res.ok) {
            setSendingOrder(false);
            alert("Unable to Send Order");
            return
        }

        const data = await res.json();
        dispatch({orders: data, type: "create"});
        setSucess(true);
        setTimeout(() => push('/'), 2500);
    }

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div>
                    <h1>What Would You Like to Order?</h1>
                </div>
            </div>
            <div>
                <h2>Crust: <input onChange={e => setCrust(e.target.value)}/></h2>
                <h2>Flavor: <input onChange={e => setFlavor(e.target.value)}/></h2>
                <h2>Size: <input onChange={e => setSize(e.target.value)}/></h2>
                <h2>Table #: <input onChange={e => setTable(e.target.value)}/></h2>
            </div>
            <br/>
            <CreateActionRow placeOrder={placeOrder} sendingOrder={sendingOrder} success={success}/>
        </main>
    );
}