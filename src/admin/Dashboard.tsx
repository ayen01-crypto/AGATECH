import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    { title: 'Total Users', value: '1,248', icon: Users, change: '+12%' },
    { title: 'Active Sellers', value: '42', icon: Package, change: '+5%' },
    { title: 'Total Orders', value: '248', icon: ShoppingCart, change: '+8%' },
    { title: 'Revenue', value: '$12,480', icon: DollarSign, change: '+15%' },
  ];

  // Mock recent activity data
  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Created new product', time: '2 mins ago' },
    { id: 2, user: 'Jane Smith', action: 'Placed order', time: '15 mins ago' },
    { id: 3, user: 'Mike Johnson', action: 'Registered as seller', time: '1 hour ago' },
    { id: 4, user: 'Sarah Williams', action: 'Updated profile', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F6FF]">Admin Dashboard</h1>
        <p className="text-[#A7B0C8]">Welcome back, Administrator</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#A7B0C8]">{stat.title}</CardTitle>
                <div className="p-2 bg-[#00F0FF]/10 rounded-lg">
                  <Icon className="w-5 h-5 text-[#00F0FF]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#F4F6FF]">{stat.value}</div>
                <p className="text-xs text-[#00F0FF]">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
          <CardHeader>
            <CardTitle className="text-[#F4F6FF]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-[#11152B] rounded-lg">
                  <div className="w-10 h-10 bg-[#00F0FF]/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#F4F6FF] text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-[#A7B0C8] text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
          <CardHeader>
            <CardTitle className="text-[#F4F6FF]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-[#11152B] rounded-lg border border-[rgba(0,240,255,0.1)] hover:border-[rgba(0,240,255,0.3)] transition-colors">
                <Package className="w-8 h-8 text-[#00F0FF] mx-auto mb-2" />
                <p className="text-[#F4F6FF] text-sm">Add Product</p>
              </button>
              <button className="p-4 bg-[#11152B] rounded-lg border border-[rgba(0,240,255,0.1)] hover:border-[rgba(0,240,255,0.3)] transition-colors">
                <Users className="w-8 h-8 text-[#00F0FF] mx-auto mb-2" />
                <p className="text-[#F4F6FF] text-sm">Manage Users</p>
              </button>
              <button className="p-4 bg-[#11152B] rounded-lg border border-[rgba(0,240,255,0.1)] hover:border-[rgba(0,240,255,0.3)] transition-colors">
                <ShoppingCart className="w-8 h-8 text-[#00F0FF] mx-auto mb-2" />
                <p className="text-[#F4F6FF] text-sm">View Orders</p>
              </button>
              <button className="p-4 bg-[#11152B] rounded-lg border border-[rgba(0,240,255,0.1)] hover:border-[rgba(0,240,255,0.3)] transition-colors">
                <DollarSign className="w-8 h-8 text-[#00F0FF] mx-auto mb-2" />
                <p className="text-[#F4F6FF] text-sm">Financials</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;