import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";
import { db } from "./db";
import { eq, and, like, ne, desc, or, sql } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      ...insertUser,
      // Set default values explicitly for nullable fields
      phone: insertUser.phone || null,
      address: insertUser.address || null,
      city: insertUser.city || null,
      state: insertUser.state || null,
      zipCode: insertUser.zipCode || null,
      country: insertUser.country || "Nigeria",
    }).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  // Category operations
  async getCategory(id: number): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  }

  async getAllCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values({
      ...insertCategory,
      description: insertCategory.description || null,
      imageUrl: insertCategory.imageUrl || null,
    }).returning();
    return result[0];
  }

  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category> {
    const result = await db.update(categories)
      .set({
        ...updateData,
        description: updateData.description !== undefined ? updateData.description : undefined,
        imageUrl: updateData.imageUrl !== undefined ? updateData.imageUrl : undefined,
      })
      .where(eq(categories.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteCategory(id: number): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getProductBySKU(sku: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.sku, sku));
    return result[0];
  }

  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select()
      .from(products)
      .where(and(
        eq(products.featured, true),
        eq(products.isActive, true)
      ));
  }

  async getRelatedProducts(productId: number, categoryId: number): Promise<Product[]> {
    return db.select()
      .from(products)
      .where(and(
        ne(products.id, productId),
        eq(products.categoryId, categoryId),
        eq(products.isActive, true)
      ))
      .limit(4);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchPattern = `%${query}%`;
    return db.select()
      .from(products)
      .where(or(
        like(products.name, searchPattern),
        like(sql`COALESCE(${products.description}, '')`, searchPattern)
      ));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values({
      ...insertProduct,
      description: insertProduct.description || null,
      discountPrice: insertProduct.discountPrice || null,
      images: insertProduct.images || [],
    }).returning();
    return result[0];
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product> {
    const result = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return result[0];
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async getAllOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values({
      ...insertOrder,
      shippingAddress: insertOrder.shippingAddress || null,
      shippingCity: insertOrder.shippingCity || null,
      shippingState: insertOrder.shippingState || null,
      shippingZipCode: insertOrder.shippingZipCode || null,
      shippingCountry: insertOrder.shippingCountry || "Nigeria",
      shippingMethod: insertOrder.shippingMethod || "standard",
      trackingNumber: insertOrder.trackingNumber || null,
      notes: insertOrder.notes || null,
      transactionReference: insertOrder.transactionReference || null,
    }).returning();
    return result[0];
  }

  async updateOrder(id: number, updateData: Partial<InsertOrder>): Promise<Order> {
    const result = await db.update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    return result[0];
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const result = await db.insert(orderItems).values(insertOrderItem).returning();
    return result[0];
  }
}