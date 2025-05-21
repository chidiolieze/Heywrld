import { AdminLayout } from "@/components/layout/admin-layout";
import { OrderList } from "@/components/admin/order-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminOrders() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        </div>
        
        {/* Order Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Pending</CardTitle>
              <CardDescription className="text-blue-600/80 dark:text-blue-400/80">
                Orders awaiting processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">5</div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">Processing</CardTitle>
              <CardDescription className="text-yellow-600/80 dark:text-yellow-400/80">
                Orders being prepared
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">8</div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Shipped</CardTitle>
              <CardDescription className="text-purple-600/80 dark:text-purple-400/80">
                Orders in transit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">12</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-700 dark:text-green-300">Delivered</CardTitle>
              <CardDescription className="text-green-600/80 dark:text-green-400/80">
                Completed orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">25</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment Info Alert */}
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="flex items-start p-4">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-300">Flutterwave Payments</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Flutterwave payment gateway is set up for testing mode. Use test cards for payment testing.
              </p>
            </div>
            <Button variant="link" className="ml-auto text-amber-700 dark:text-amber-300">
              View Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Orders Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <OrderList />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <OrderList />
          </TabsContent>
          
          <TabsContent value="processing" className="mt-6">
            <OrderList />
          </TabsContent>
          
          <TabsContent value="shipped" className="mt-6">
            <OrderList />
          </TabsContent>
          
          <TabsContent value="delivered" className="mt-6">
            <OrderList />
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-6">
            <OrderList />
          </TabsContent>
        </Tabs>
        
        {/* Information Card */}
        <Card className="mt-2 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="flex items-start p-4">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Order Management Tips</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Process orders quickly to improve customer satisfaction. Always update tracking information when available.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
