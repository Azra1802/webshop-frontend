const OrderTable = ({ orders }) => {
  return (
    <table className="w-full border mt-6">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Customer</th>
          <th className="p-2 border">Items</th>
          <th className="p-2 border">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{order.customerName}</td>
            <td className="p-2 border">
              {order.items.map((item) => (
                <div key={item.id}>
                  {item.name} x {item.quantity}
                </div>
              ))}
            </td>
            <td className="p-2 border">${order.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
