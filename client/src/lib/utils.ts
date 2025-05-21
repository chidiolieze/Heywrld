import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
}

export function getDiscountPercentage(price: number, discountPrice: number | null | undefined): number | null {
  if (!discountPrice) return null;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return '/placeholder-image.jpg';
  
  // If it's a full URL, return it as is
  if (path.startsWith('http')) return path;
  
  // Otherwise, consider it a relative path
  return path;
}

// Helper to determine if a user is logged in with admin privileges
export function isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return !!user?.isAdmin;
}
