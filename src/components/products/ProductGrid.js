import ProductCard from "./ProductCard";

export default function ProductGrid({ products, categories }) {
  return <div className="product-grid">{products.map((product) => <ProductCard product={product} categories={categories} key={product.id} />)}</div>;
}
