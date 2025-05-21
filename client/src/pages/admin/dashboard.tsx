import { useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Order, Product } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days">("30days");
  
  // Fetch dashboard metrics
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['/api/admin/dashboard', timeRange],
  });
  
  // Fetch recent orders
  const { data: recentOrders, isLoading: isLoadingOrders } = useQuery<Order[]>({
    queryKey: ['/api/admin/recent-orders'],
  });
  
  // Fetch popular products
  const { data: popularProducts, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/admin/popular-products'],
  });
  
  // Mock data for charts since we're using in-memory storage
  const salesData = [
    { name: "Jan", total: 1500 },
    { name: "Feb", total: 2300 },
    { name: "Mar", total: 3200 },
    { name: "Apr", total: 2800 },
    { name: "May", total: 3600 },
    { name: "Jun", total: 4100 },
    { name: "Jul", total: 4800 },
  ];
  
  const ordersByCategory = [
    { name: "Farm Produce", value: 65 },
    { name: "Perfumes", value: 35 },
  ];
  
  // Default metrics if data isn't loaded yet
  const metrics = {
    totalSales: dashboardData?.totalSales || 125500,
    totalOrders: dashboardData?.totalOrders || 28,
    totalProducts: dashboardData?.totalProducts || 42,
    totalCustomers: dashboardData?.totalCustomers || 153,
    salesGrowth: dashboardData?.salesGrowth || 12.5,
    ordersGrowth: dashboardData?.ordersGrowth || 8.2,
    customersGrowth: dashboardData?.customersGrowth || 15.3,
    productsGrowth: dashboardData?.productsGrowth || -2.4,
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const renderGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <ArrowUpRight className="mr-1 h-4 w-4" />
          <span>{growth.toFixed(1)}%</span>
        </div>
      );
    } else if (growth < 0) {
      return (
        <div className="flex items-center text-red-600 dark:text-red-400">
          <ArrowDownRight className="mr-1 h-4 w-4" />
          <span>{Math.abs(growth).toFixed(1)}%</span>
        </div>
      );
    } else {
      return <span className="text-gray-500">0%</span>;
    }
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="w-full md:w-auto">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.totalSales)}
                </div>
                {renderGrowthIndicator(metrics.salesGrowth)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Orders</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="text-2xl font-bold">{metrics.totalOrders}</div>
                {renderGrowthIndicator(metrics.ordersGrowth)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Products</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Package className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="text-2xl font-bold">{metrics.totalProducts}</div>
                {renderGrowthIndicator(metrics.productsGrowth)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="text-2xl font-bold">{metrics.totalCustomers}</div>
                {renderGrowthIndicator(metrics.customersGrowth)}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value/1000}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#004D2C"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Orders by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersByCategory}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#A0D911"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders & Top Products */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between p-3 bg-gray-100 dark:bg-gray-800 animate-pulse rounded">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {recentOrders && recentOrders.length > 0 ? (
                    recentOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex flex-col">
                          <span className="font-medium">Order #{order.id}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{formatCurrency(order.total)}</span>
                          <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No recent orders
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingProducts ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between p-3 bg-gray-100 dark:bg-gray-800 animate-pulse rounded">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-[120px]"></div>
                      </div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {popularProducts && popularProducts.length > 0 ? (
                    popularProducts.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                            {product.images && product.images.length > 0 && (
                              <img 
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <span className="font-medium">{formatCurrency(product.price)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No popular products
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
