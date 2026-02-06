import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  sellerName: string;
  stock: number;
  status: 'active' | 'inactive' | 'sold';
  createdAt: string;
}

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Gaming Keyboard', 
      description: 'Mechanical gaming keyboard with RGB lighting', 
      price: 89.99, 
      category: 'Electronics', 
      sellerId: '2', 
      sellerName: 'Jane Smith',
      stock: 15,
      status: 'active',
      createdAt: '2023-02-20'
    },
    { 
      id: '2', 
      name: 'Wireless Mouse', 
      description: 'Ergonomic wireless mouse with precision tracking', 
      price: 39.99, 
      category: 'Electronics', 
      sellerId: '3', 
      sellerName: 'Mike Johnson',
      stock: 25,
      status: 'active',
      createdAt: '2023-03-10'
    },
    { 
      id: '3', 
      name: 'Laptop Stand', 
      description: 'Adjustable aluminum laptop stand for better ergonomics', 
      price: 45.50, 
      category: 'Accessories', 
      sellerId: '2', 
      sellerName: 'Jane Smith',
      stock: 8,
      status: 'sold',
      createdAt: '2023-01-15'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Electronics',
    stock: 0,
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      sellerId: '1', // Default admin/seller
      sellerName: 'Admin',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: 'Electronics',
      stock: 0,
    });
    setShowAddDialog(false);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F6FF]">Manage Products</h1>
        <p className="text-[#A7B0C8]">View and manage marketplace products</p>
      </div>

      {/* Controls */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A7B0C8] w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#00F0FF] hover:bg-[#00D0DF] text-[#05060B] flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
              <DialogHeader>
                <DialogTitle className="text-[#F4F6FF]">Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-[#A7B0C8]">Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right text-[#A7B0C8]">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right text-[#A7B0C8]">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                    className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right text-[#A7B0C8]">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]">
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right text-[#A7B0C8]">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock || ''}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                    className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleAddProduct}
                  className="bg-[#00F0FF] hover:bg-[#00D0DF] text-[#05060B]"
                >
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
        <CardHeader>
          <CardTitle className="text-[#F4F6FF]">Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,240,255,0.1)]">
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Product</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Price</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Category</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Seller</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Stock</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Status</th>
                  <th className="py-3 px-4 text-left text-[#A7B0C8]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[rgba(0,240,255,0.1)] hover:bg-[#11152B]">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-[#F4F6FF] font-medium">{product.name}</p>
                        <p className="text-[#A7B0C8] text-sm">{product.description.substring(0, 40)}...</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#F4F6FF]">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-[#00F0FF]/20 text-[#00F0FF] border-[rgba(0,240,255,0.3)]">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[#A7B0C8]">{product.sellerName}</td>
                    <td className="py-3 px-4 text-[#F4F6FF]">{product.stock}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={product.status === 'active' ? 'default' : product.status === 'sold' ? 'secondary' : 'outline'}
                        className={product.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : product.status === 'sold' 
                            ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }
                      >
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-[#00F0FF] hover:bg-[#00F0FF]/10"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:bg-red-400/10"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="sm:max-w-md bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)]">
            <DialogHeader>
              <DialogTitle className="text-[#F4F6FF]">Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-[#A7B0C8]">Name</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-[#A7B0C8]">Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-[#A7B0C8]">Stock</Label>
                <Input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
                  className="col-span-3 bg-[#11152B] border-[rgba(0,240,255,0.2)] text-[#F4F6FF]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-[#A7B0C8]">Status</Label>
                <select
                  value={editingProduct.status}
                  onChange={(e) => handleInputChange('status', e.target.value as any)}
                  className="col-span-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded text-[#F4F6FF]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                onClick={handleUpdateProduct}
                className="bg-[#00F0FF] hover:bg-[#00D0DF] text-[#05060B]"
              >
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageProducts;