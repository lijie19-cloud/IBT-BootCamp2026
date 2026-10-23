import ProductForm from "@/components/products/ProductForm";
import { getCategories } from "@/lib/services/productService";

export const metadata = { title: "Add product" };
export default async function NewProductPage() { const categories = await getCategories(); return <ProductForm categories={categories} />; }
