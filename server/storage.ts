import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Category operations
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(id: number): Promise<void>;

  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySKU(sku: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  getProductsByCategoryId(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getRelatedProducts(productId: number, categoryId: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private categoriesData: Map<number, Category>;
  private productsData: Map<number, Product>;
  private ordersData: Map<number, Order>;
  private orderItemsData: Map<number, OrderItem>;

  private userId: number;
  private categoryId: number;
  private productId: number;
  private orderId: number;
  private orderItemId: number;

  constructor() {
    this.usersData = new Map();
    this.categoriesData = new Map();
    this.productsData = new Map();
    this.ordersData = new Map();
    this.orderItemsData = new Map();

    this.userId = 1;
    this.categoryId = 1;
    this.productId = 1;
    this.orderId = 1;
    this.orderItemId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@heywrld.com",
      fullName: "Admin User",
      isAdmin: true,
    });

    // Create categories
    const farmProduceCategory = this.createCategory({
      name: "Farm Produce",
      description: "Fresh, high-quality farm produce delivered directly to your doorstep.",
      slug: "farm-produce",
      imageUrl: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
      isActive: true,
    });

    const perfumesCategory = this.createCategory({
      name: "Perfumes",
      description: "Discover our premium collection of luxury perfumes and fragrances.",
      slug: "perfumes",
      imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      isActive: true,
    });

    this.createCategory({
      name: "Clothes",
      description: "Coming soon - High-quality clothing and fashion items.",
      slug: "clothes",
      imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      isActive: false,
    });

    this.createCategory({
      name: "Gadgets",
      description: "Coming soon - Latest electronic gadgets and accessories.",
      slug: "gadgets",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      isActive: false,
    });

    // Create farm produce products
    this.createProduct({
      name: "Premium Tomatoes",
      description: "Fresh, juicy tomatoes perfect for salads and cooking. Grown organically without pesticides.",
      categoryId: farmProduceCategory.id,
      price: 1200,
      quantity: 50,
      sku: "FP-TOM-001",
      images: [
        "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      featured: true,
      isActive: true,
    });

    this.createProduct({
      name: "Organic Apples",
      description: "Sweet and crunchy apples picked at peak ripeness. Perfect for snacking or baking.",
      categoryId: farmProduceCategory.id,
      price: 1500,
      quantity: 40,
      sku: "FP-APP-002",
      images: [
        "https://images.unsplash.com/photo-1569870499705-504209102861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      ],
      featured: true,
      isActive: true,
    });

    this.createProduct({
      name: "Fresh Carrots",
      description: "Sweet and nutritious carrots that are perfect for salads, cooking, or juicing.",
      categoryId: farmProduceCategory.id,
      price: 800,
      discountPrice: 650,
      quantity: 60,
      sku: "FP-CAR-003",
      images: [
        "https://images.unsplash.com/photo-1590165482129-1b8b27698780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      ],
      featured: false,
      isActive: true,
    });

    this.createProduct({
      name: "Leafy Spinach",
      description: "Fresh, dark green spinach leaves packed with vitamins and minerals.",
      categoryId: farmProduceCategory.id,
      price: 950,
      quantity: 30,
      sku: "FP-SPN-004",
      images: [
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
      ],
      featured: false,
      isActive: true,
    });

    this.createProduct({
      name: "Red Bell Peppers",
      description: "Crisp, sweet red bell peppers perfect for salads, stir-fries, or roasting.",
      categoryId: farmProduceCategory.id,
      price: 1100,
      discountPrice: 900,
      quantity: 45,
      sku: "FP-PEP-005",
      images: [
        "https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      featured: true,
      isActive: true,
    });

    this.createProduct({
      name: "Sweet Potatoes",
      description: "Nutrient-rich sweet potatoes with a naturally sweet flavor. Great for roasting or making fries.",
      categoryId: farmProduceCategory.id,
      price: 1300,
      quantity: 35,
      sku: "FP-SPT-006",
      images: [
        "https://images.unsplash.com/photo-1596124559055-1ea02c386211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      featured: false,
      isActive: true,
    });

    // Create perfume products
    this.createProduct({
      name: "Luxury Perfume No.5",
      description: "An elegant and sophisticated fragrance with notes of jasmine, rose, and vanilla.",
      categoryId: perfumesCategory.id,
      price: 25000,
      discountPrice: 22500,
      quantity: 15,
      sku: "PF-LUX-001",
      images: [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
      ],
      featured: true,
      isActive: true,
    });

    this.createProduct({
      name: "Designer Fragrance",
      description: "A bold and captivating scent with notes of bergamot, amber, and sandalwood.",
      categoryId: perfumesCategory.id,
      price: 30000,
      quantity: 10,
      sku: "PF-DSG-002",
      images: [
        "https://images.unsplash.com/photo-1615923732331-0da586bfa867?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      ],
      featured: true,
      isActive: true,
    });

    this.createProduct({
      name: "Fresh Citrus Perfume",
      description: "A refreshing and invigorating fragrance with notes of lemon, bergamot, and orange blossom.",
      categoryId: perfumesCategory.id,
      price: 18000,
      discountPrice: 15000,
      quantity: 20,
      sku: "PF-CIT-003",
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      ],
      featured: false,
      isActive: true,
    });

    this.createProduct({
      name: "Oriental Oud Cologne",
      description: "A rich and exotic fragrance featuring premium oud, saffron, and amber notes.",
      categoryId: perfumesCategory.id,
      price: 35000,
      quantity: 8,
      sku: "PF-OUD-004",
      images: [
        "https://images.unsplash.com/photo-1608528577891-eb055944f2e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      featured: true,
      isActive: true,
    });

    this.createProduct({
      name: "Floral Essence",
      description: "A delicate and feminine fragrance with notes of rose, peony, and lily of the valley.",
      categoryId: perfumesCategory.id,
      price: 22000,
      discountPrice: 19800,
      quantity: 12,
      sku: "PF-FLR-005",
      images: [
        "https://images.unsplash.com/photo-1588405748880-b434362febd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      featured: false,
      isActive: true,
    });

    this.createProduct({
      name: "Woody Harmony",
      description: "A sophisticated and warm fragrance with notes of cedar, vetiver, and musk.",
      categoryId: perfumesCategory.id,
      price: 27000,
      quantity: 9,
      sku: "PF-WDY-006",
      images: [
        "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      featured: false,
      isActive: true,
    });

    // Create sample orders
    const order1 = this.createOrder({
      userId: 1,
      status: "delivered",
      total: 28200,
      paymentMethod: "flutterwave",
      paymentStatus: "paid",
      shippingAddress: "123 Main Street, Lagos",
      shippingCity: "Lagos",
      shippingState: "Lagos",
      shippingZipCode: "100001",
      shippingMethod: "express",
      trackingNumber: "HW12345678",
    });

    this.createOrderItem({
      orderId: order1.id,
      productId: 1,
      quantity: 2,
      price: 1200,
    });

    this.createOrderItem({
      orderId: order1.id,
      productId: 7,
      quantity: 1,
      price: 25000,
    });

    const order2 = this.createOrder({
      userId: 1,
      status: "processing",
      total: 15900,
      paymentMethod: "pod",
      paymentStatus: "pending",
      shippingAddress: "456 Park Avenue, Abuja",
      shippingCity: "Abuja",
      shippingState: "FCT",
      shippingZipCode: "900001",
      shippingMethod: "standard",
    });

    this.createOrderItem({
      orderId: order2.id,
      productId: 3,
      quantity: 3,
      price: 650,
    });

    this.createOrderItem({
      orderId: order2.id,
      productId: 9,
      quantity: 1,
      price: 15000,
    });

    const order3 = this.createOrder({
      userId: 1,
      status: "shipped",
      total: 35000,
      paymentMethod: "flutterwave",
      paymentStatus: "paid",
      shippingAddress: "789 Beach Road, Port Harcourt",
      shippingCity: "Port Harcourt",
      shippingState: "Rivers",
      shippingZipCode: "500001",
      shippingMethod: "express",
      trackingNumber: "HW98765432",
    });

    this.createOrderItem({
      orderId: order3.id,
      productId: 10,
      quantity: 1,
      price: 35000,
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin || false,
    };
    this.usersData.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.usersData.values());
  }

  // Category operations
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categoriesData.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categoriesData.values()).find(
      (category) => category.slug === slug,
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categoriesData.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categoriesData.set(id, category);
    return category;
  }

  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category> {
    const category = await this.getCategory(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    const updatedCategory: Category = { ...category, ...updateData };
    this.categoriesData.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    this.categoriesData.delete(id);
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    return this.productsData.get(id);
  }

  async getProductBySKU(sku: string): Promise<Product | undefined> {
    return Array.from(this.productsData.values()).find(
      (product) => product.sku === sku,
    );
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.productsData.values());
  }

  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return Array.from(this.productsData.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.productsData.values()).filter(
      (product) => product.featured && product.isActive,
    );
  }

  async getRelatedProducts(productId: number, categoryId: number): Promise<Product[]> {
    return Array.from(this.productsData.values())
      .filter((product) => 
        product.id !== productId && 
        product.categoryId === categoryId &&
        product.isActive
      )
      .slice(0, 4);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.productsData.values()).filter(
      (product) => 
        (product.name.toLowerCase().includes(lowerQuery) ||
         (product.description && product.description.toLowerCase().includes(lowerQuery)) ||
         product.sku.toLowerCase().includes(lowerQuery)) &&
        product.isActive
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const now = new Date();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: now.toISOString(), 
    };
    this.productsData.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product> {
    const product = await this.getProduct(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct: Product = { ...product, ...updateData };
    this.productsData.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    this.productsData.delete(id);
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    return this.ordersData.get(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.ordersData.values());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const now = new Date();
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: now.toISOString(),
    };
    this.ordersData.set(id, order);
    return order;
  }

  async updateOrder(id: number, updateData: Partial<InsertOrder>): Promise<Order> {
    const order = await this.getOrder(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    const updatedOrder: Order = { ...order, ...updateData };
    this.ordersData.set(id, updatedOrder);
    return updatedOrder;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItemsData.values()).filter(
      (item) => item.orderId === orderId,
    );
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItemsData.set(id, orderItem);
    return orderItem;
  }
}

import { DatabaseStorage } from "./database-storage";

// Create an instance of DatabaseStorage
export const storage = new DatabaseStorage();
