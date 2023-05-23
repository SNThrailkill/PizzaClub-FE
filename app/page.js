'use client'
import { useContext, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css'
import { NoResultsMessage } from '@/components/utils'
import { OrdersContext } from './orderContext.js';


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
  const searchItems = (event) => {
    const searchValue = event.target.value;
    var returnValue = [];
    returnValue = returnValue.concat(orders.filter((o) => o.Crust.toUpperCase().includes(searchValue.toUpperCase())));
    returnValue = returnValue.concat(orders.filter((o) => o.Flavor.toUpperCase().includes(searchValue.toUpperCase())));
    returnValue = returnValue.concat(orders.filter((o) => o.Size.toUpperCase().includes(searchValue.toUpperCase())));
    returnValue = returnValue.concat(orders.filter((o) => o.Order_ID.toString().includes(searchValue)));
    returnValue = returnValue.concat(orders.filter((o) => o.Table_No.toString().includes(searchValue)));
    returnValue = [...new Set(returnValue)];

    if(searchValue !== ''){
      console.log(returnValue);
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
  const [filteredResults, setFilteredResults] = useState(orders);
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
