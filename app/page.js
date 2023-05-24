'use client'
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css'
import { NoResultsMessage } from '@/components/utils'
import { OrdersContext, OrdersActionsContext } from './orderContext.js';

function OrderRow({ order }) {
  if (Array.isArray(order)) return <h2>No Results Found</h2>
  return (
      <div className={styles.grid}>
          <Link
              href={"/order/" + order.Order_ID}
              className={styles.card}>
  
              <h2>Order #: {order.Order_ID}</h2>
              <p>Crust: {order.Crust}</p>
              <p>Flavor: {order.Flavor}</p>
              <p>Size: {order.Size}</p>
              <p>Table #: {order.Table_No}</p>
          </Link>
      </div>
  )
}

function SearchRow({orders, setFilteredResults}) {
  /* 
  * In order to prevent state management issues, we pass the event directly to our function
  * so event.target.value can be evaluated in the moment and have the latest value 
  * versus trying to setState onChange which will cause our filter results to be 1 character behind what is actually typed in the input
  */
  const searchItems = (event) => {
    const searchValue = event.target.value;
    var returnValue = [];
    
    // Here we will search across all attributes for any part of the search value. In order to prevent duplicates we pass combined results to a Set.
    returnValue = returnValue.concat(orders.filter((o) => o.Crust.toUpperCase().includes(searchValue.toUpperCase())));
    returnValue = returnValue.concat(orders.filter((o) => o.Flavor.toUpperCase().includes(searchValue.toUpperCase())));
    returnValue = returnValue.concat(orders.filter((o) => o.Size.toUpperCase().includes(searchValue.toUpperCase())));
    returnValue = returnValue.concat(orders.filter((o) => o.Order_ID.toString().includes(searchValue)));
    returnValue = returnValue.concat(orders.filter((o) => o.Table_No.toString().includes(searchValue)));
    returnValue = [...new Set(returnValue)];

    if(searchValue !== ''){
      setFilteredResults(returnValue);
    } else {
      setFilteredResults(orders);
    }
} 

  return (
    <div>
      <div className={styles.center}>
        <h2>Search Orders:</h2>&nbsp;<input onChange={searchItems}/>
      </div>
      <div></div>
    </div>
  )
}

function ActionsRow() {
  return (
      <div className={styles.contents}>
          <Link
              href={"/order/create"}
              className={styles.card}>
  
              <h2>Place New Order</h2>
          </Link>
      </div>
  )
}

function ResultsRow({filteredResults}) {
  if(filteredResults.length > 0){
    return (
      <div className={styles.grid}>
      { 
        filteredResults.map(o => {
          return <OrderRow key={o.Order_ID} order={o}/>
        })
      }
      </div>
    );
  }
  return NoResultsMessage
}

export default function Orders() {
  const orders = useContext(OrdersContext);
  const dispatch = useContext(OrdersActionsContext);
  const [filteredResults, setFilteredResults] = useState(orders);

  // This will cause 2 calls in Strict Mode when in Dev Mode. Will not be problem in production.
  useEffect(() => {
    fetch('https://pizza-api-app.herokuapp.com/api/orders')
      .then(res => res.json())
      .then(data => dispatch({orders: data, type: "get"}))
  }, []);
  
  return (
        <main className={styles.main}>
          <div className={styles.center}>
            <div>
              <h1>Current Orders @ Pizza Club</h1>
            </div>
          </div>
          <SearchRow orders={orders} setFilteredResults={setFilteredResults}/>
          <br/>
          <ActionsRow/>
          <br/>
          <ResultsRow filteredResults={filteredResults}/>
        </main>
  )
}
