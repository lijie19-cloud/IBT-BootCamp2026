import ProductForm from "@/components/products/ProductForm";
import { getCategories } from "@/lib/services/productService";

export const metadata = { title: "Edit product" };
export default async function EditProductPage({ params }) { const [{ id }, categories] = await Promise.all([params, getCategories()]); return <ProductForm categories={categories} productId={id} />; }
