import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  joinedDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'buyer', joinedDate: '2023-01-15', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'seller', joinedDate: '2023-02-20', status: 'active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'seller', joinedDate: '2023-03-10', status: 'active' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'buyer', joinedDate: '2023-04-05', status: 'suspended' },
    { id: '5', name: 'Admin User', email: 'admin@example.com', role: 'admin', joinedDate: '2023-01-01', status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const updateUserRole = (userId: string, newRole: 'buyer' | 'seller' | 'admin') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const updateUserStatus = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F6FF]">Manage Users</h1>
        <p className="text-[#A7B0C8]">View and manage user accounts</p>
      </div>

      {/* Controls */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A7B0C8] w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
          >
            <option value="all">All Roles</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <Button className="bg-[#00F0FF] hover:bg-[#00D0DF] text-[#05060B] flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardHeader>
          <CardTitle className="text-[#F4F6FF]">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,240,255,0.1)]">
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">User</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Email</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Role</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Status</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Joined</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[rgba(0,240,255,0.1)] hover:bg-[#11152B]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00F0FF]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#00F0FF] font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-[#F4F6FF] font-medium">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#A7B0C8]">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={user.role === 'seller' ? 'default' : user.role === 'admin' ? 'secondary' : 'outline'}
                        className={user.role === 'seller' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : user.role === 'admin' 
                            ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={user.status === 'active' ? 'default' : user.status === 'suspended' ? 'destructive' : 'outline'}
                        className={user.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : user.status === 'suspended' 
                            ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[#A7B0C8]">{user.joinedDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value as any)}
                          className="px-2 py-1 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded text-[#F4F6FF] text-sm"
                        >
                          <option value="buyer">Buyer</option>
                          <option value="seller">Seller</option>
                          <option value="admin">Admin</option>
                        </select>
                        <select
                          value={user.status}
                          onChange={(e) => updateUserStatus(user.id, e.target.value as any)}
                          className="px-2 py-1 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded text-[#F4F6FF] text-sm"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                    </td>
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

export default ManageUsers;