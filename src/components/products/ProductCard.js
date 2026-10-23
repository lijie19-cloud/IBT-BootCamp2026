import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatETB } from "@/lib/utils";
import ProductActions from "@/components/commerce/ProductActions";

export default function ProductCard({ product, categories }) {
  const inStock = product.stock > 0;
  return (
    <article className="product-card">
      <Link className="product-image-link" href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <Image className="product-image" src={product.image} alt="" fill unoptimized={product.image.startsWith("https://")} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
        <span className={`stock-pill ${inStock ? "in-stock" : "out-of-stock"}`}>{inStock ? `${product.stock} available` : "Out of stock"}</span>
      </Link>
      <div className="product-card-body">
        <div className="product-meta"><span>{categoryLabel(product.category, categories)}</span><span>{product.seller.location}</span></div>
        <h3><Link href={`/products/${product.id}`}>{product.name}</Link></h3>
        <p className="seller-line">Sold by {product.seller.name}</p>
        <div className="product-card-footer">
          <strong>{formatETB(product.price)}</strong>
          <Link className="text-link" href={`/products/${product.id}`}>View details <span aria-hidden="true">→</span></Link>
        </div>
        <ProductActions product={product} compact />
      </div>
    </article>
  );
}
