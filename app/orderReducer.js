export default function ordersReducer(orders, action) {
    switch (action.type) {
      case 'create': {
        return [
          ...orders,
          {
            "Crust": action.orders.Crust,
            "Flavor": action.orders.Flavor,
            "Order_ID": action.orders.Order_ID,
            "Size": action.orders.Size,
            "Table_No": Number(action.orders.Table_No),
            "Timestamp": action.orders.Timestamp
          },
        ];
      }
      case 'get': {
        return action.orders;
      }
      case 'delete': {
        return orders.filter((o) => o.Order_ID != action.orders);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  