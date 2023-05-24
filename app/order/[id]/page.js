'use client'; 

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css'
import { OrdersContext, OrdersActionsContext } from '@/app/orderContext.js';
import { AuthContext } from '@/app/auth/authContext';
import { DeletingMessage, DeletedMessage } from '@/components/utils';

function DetailsActionsRow({deleteOrder, deletingOrder}) {
  if(deletingOrder) {
      return DeletingMessage
  }
  return (
      <div className={styles.contents}>
          <button onClick={deleteOrder} className={styles.card}>
              <h2>Delete Order</h2>
          </button>
      </div>
  )
}


export default function OrderDetails({ params }) {
  const { accessToken } = useContext(AuthContext);
  const previousOrders = useContext(OrdersContext);
  const dispatch = useContext(OrdersActionsContext);
  const [deletingOrder, setDeletingOrder] = useState();
  const [success, setSucess] = useState();
  const { push } = useRouter();

  // Instead of making another call to fetch a specific order, use our orders from context and filter to show only the result with the matching ID from params
  const order = previousOrders ? previousOrders.filter((o) => { if(o.Order_ID == params.id) return o })[0] : null;
  
  // String Interpolation vs concatentation
  async function deleteOrder() {
    setDeletingOrder(true);
    const res = await fetch(`https://pizza-api-app.herokuapp.com/api/orders/${order.Order_ID}`, {
    method: 'DELETE',    
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    });

    if(!res.ok) {
        setDeletingOrder(false);
        alert("Unable to Delete Order");
        return
    }

    const data = await res.json();
    dispatch({orders: params.id, type: "delete"})
    setSucess(true);
    setTimeout(() => push('/'), 2500);
}

  if(success){
    return (
      <main className={styles.main}>
      <div className={styles.center}>
        { DeletedMessage }
      </div>
      </main>
    )
  }
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div>
          <h1>Order #: {params.id}</h1>
        </div>
      </div>
      <div>
        <h2>Crust: {order && order.Crust }</h2>
        <h2>Flavor: {order && order.Flavor }</h2>
        <h2>Size: {order && order.Size }</h2>
        <h2>Table #: {order && order.Table_No }</h2>
      </div>
      <br/>
      <DetailsActionsRow deleteOrder={deleteOrder} deletingOrder={deletingOrder}/>      
    </main>
  );
}