import { 
  users, categories, products, orders, orderItems
} from "@shared/schema";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { DatabaseStorage } from "./database-storage";

// Initialize database with sample data if needed
export async function seedDatabase() {
  try {
    // Check if we already have data
    const categoriesCount = await db.select({ count: sql`count(*)` }).from(categories);
    if (parseInt(categoriesCount[0].count.toString()) > 0) {
      console.log("Database already has data, skipping seeding.");
      return;
    }

    console.log("Seeding database with initial data...");
    
    const storage = new DatabaseStorage();
    
    // Create admin user
    const admin = await storage.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@heywrld.com",
      fullName: "Admin User",
      isAdmin: true,
    });

    // Create categories
    const farmProduceCategory = await storage.createCategory({
      name: "Farm Produce",
      description: "Fresh, high-quality farm produce delivered directly to your doorstep.",
      slug: "farm-produce",
      imageUrl: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
      isActive: true,
    });

    const perfumesCategory = await storage.createCategory({
      name: "Perfumes",
      description: "Discover our premium collection of luxury perfumes and fragrances.",
      slug: "perfumes",
      imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      isActive: true,
    });

    await storage.createCategory({
      name: "Clothes",
      description: "Coming soon - High-quality clothing and fashion items.",
      slug: "clothes",
      imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      isActive: false,
    });

    await storage.createCategory({
      name: "Gadgets",
      description: "Coming soon - Latest electronic gadgets and accessories.",
      slug: "gadgets",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      isActive: false,
    });

    // Create farm produce products
    const product1 = await storage.createProduct({
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

    await storage.createProduct({
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

    const product3 = await storage.createProduct({
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

    await storage.createProduct({
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

    await storage.createProduct({
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

    await storage.createProduct({
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
    const product7 = await storage.createProduct({
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

    await storage.createProduct({
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

    const product9 = await storage.createProduct({
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

    const product10 = await storage.createProduct({
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

    await storage.createProduct({
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

    await storage.createProduct({
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
    const order1 = await storage.createOrder({
      userId: admin.id,
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

    await storage.createOrderItem({
      orderId: order1.id,
      productId: product1.id,
      quantity: 2,
      price: 1200,
    });

    await storage.createOrderItem({
      orderId: order1.id,
      productId: product7.id,
      quantity: 1,
      price: 25000,
    });

    const order2 = await storage.createOrder({
      userId: admin.id,
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

    await storage.createOrderItem({
      orderId: order2.id,
      productId: product3.id,
      quantity: 3,
      price: 650,
    });

    await storage.createOrderItem({
      orderId: order2.id,
      productId: product9.id,
      quantity: 1,
      price: 15000,
    });

    const order3 = await storage.createOrder({
      userId: admin.id,
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

    await storage.createOrderItem({
      orderId: order3.id,
      productId: product10.id,
      quantity: 1,
      price: 35000,
    });

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}