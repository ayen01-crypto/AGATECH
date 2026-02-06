import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  sellerName: string;
  quantity: number;
  totalAmount: number;
  commission: number; // 15% of totalAmount for AGA Tech Studios
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: '1', 
      customerName: 'John Doe', 
      customerEmail: 'john@example.com', 
      productName: 'Gaming Keyboard', 
      sellerName: 'Jane Smith',
      quantity: 1,
      totalAmount: 89.99,
      commission: 89.99 * 0.15, // 15% commission
      status: 'delivered',
      date: '2023-02-25'
    },
    { 
      id: '2', 
      customerName: 'Jane Smith', 
      customerEmail: 'jane@example.com', 
      productName: 'Wireless Mouse', 
      sellerName: 'Mike Johnson',
      quantity: 2,
      totalAmount: 79.98,
      commission: 79.98 * 0.15, // 15% commission
      status: 'shipped',
      date: '2023-03-15'
    },
    { 
      id: '3', 
      customerName: 'Bob Wilson', 
      customerEmail: 'bob@example.com', 
      productName: 'Laptop Stand', 
      sellerName: 'Jane Smith',
      quantity: 1,
      totalAmount: 45.50,
      commission: 45.50 * 0.15, // 15% commission
      status: 'processing',
      date: '2023-01-20'
    },
    { 
      id: '4', 
      customerName: 'Alice Brown', 
      customerEmail: 'alice@example.com', 
      productName: 'Mechanical Keyboard', 
      sellerName: 'Tom Davis',
      quantity: 1,
      totalAmount: 120.00,
      commission: 120.00 * 0.15, // 15% commission
      status: 'pending',
      date: '2023-04-10'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    return order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate total commission for AGA Tech Studios
  const totalCommission = orders.reduce((sum, order) => sum + order.commission, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F6FF]">Orders Management</h1>
        <p className="text-[#A7B0C8]">View and manage all orders</p>
      </div>

      {/* Financial Summary */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#11152B] p-4 rounded-lg border border-[rgba(0,240,255,0.1)]">
              <p className="text-[#A7B0C8] text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-[#F4F6FF]">
                ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-[#11152B] p-4 rounded-lg border border-[rgba(0,240,255,0.1)]">
              <p className="text-[#A7B0C8] text-sm">AGA Tech Commission (15%)</p>
              <p className="text-2xl font-bold text-[#00F0FF]">${totalCommission.toFixed(2)}</p>
            </div>
            <div className="bg-[#11152B] p-4 rounded-lg border border-[rgba(0,240,255,0.1)]">
              <p className="text-[#A7B0C8] text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-[#F4F6FF]">{orders.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Control */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A7B0C8] w-4 h-4" />
            <Input
              placeholder="Search orders by customer, product, or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardHeader>
          <CardTitle className="text-[#F4F6FF]">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,240,255,0.1)]">
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Order ID</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Customer</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Product</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Seller</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Quantity</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Total</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Commission</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Status</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[rgba(0,240,255,0.1)] hover:bg-[#11152B]">
                    <td className="py-3 px-4 text-[#F4F6FF] font-medium">#{order.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-[#F4F6FF]">{order.customerName}</p>
                        <p className="text-[#A7B0C8] text-sm">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#F4F6FF]">{order.productName}</td>
                    <td className="py-3 px-4 text-[#F4F6FF]">{order.sellerName}</td>
                    <td className="py-3 px-4 text-[#F4F6FF]">{order.quantity}</td>
                    <td className="py-3 px-4 text-[#F4F6FF]">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-[#00F0FF] font-medium">${order.commission.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={order.status === 'delivered' ? 'default' : 
                                order.status === 'shipped' ? 'secondary' : 
                                order.status === 'processing' ? 'outline' : 
                                order.status === 'pending' ? 'outline' : 'destructive'}
                        className={order.status === 'delivered' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : order.status === 'shipped' 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                            : order.status === 'processing' 
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                              : order.status === 'pending' 
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[#A7B0C8]">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;