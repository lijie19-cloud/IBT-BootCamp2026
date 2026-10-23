"use client";

/* eslint-disable @next/next/no-img-element -- arbitrary HTTPS demo previews are intentionally unoptimized; production will use validated uploads. */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "@/components/auth/AuthGate";
import { useAuth } from "@/context/AuthContext";
import { createSellerListing, getOwnedListing, updateSellerListing } from "@/lib/services/sellerProductService";

const demoImages = [
  { value: "/images/products/coffee.svg", label: "Coffee package" },
  { value: "/images/products/basket.svg", label: "Woven basket" },
  { value: "/images/products/headphones.svg", label: "Headphones" },
  { value: "/images/products/jacket.svg", label: "Clothing" },
  { value: "/images/products/lamp.svg", label: "Table lamp" },
  { value: "/images/products/spices.svg", label: "Spice jars" },
  { value: "/images/products/bag.svg", label: "Leather bag" },
  { value: "/images/products/watch.svg", label: "Watch" },
];

const emptyForm = { name: "", description: "", price: "", category: "", image: demoImages[0].value, stock: "0", status: "active" };

function FormContent({ categories, productId }) {
  const router = useRouter();
  const { user } = useAuth();
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(productId));
  const [isSaving, setIsSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!productId) return;
    let active = true;
    getOwnedListing(user, productId).then((product) => {
      if (!active) return;
      if (!product) setFormError("This listing was not found or belongs to another seller.");
      else setValues({ name: product.name, description: product.description, price: String(product.price), category: product.category, image: product.image, stock: String(product.stock), status: product.status });
      setIsLoading(false);
    }).catch(() => { if (active) { setFormError("The listing could not be loaded."); setIsLoading(false); } });
    return () => { active = false; };
  }, [productId, user]);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (name === "image") setPreviewError(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true); setErrors({}); setFormError("");
    try {
      const slugs = categories.map((category) => category.slug);
      const result = productId ? await updateSellerListing(user, productId, values, slugs) : await createSellerListing(user, values, slugs);
      if (!result.ok) { setErrors(result.errors || {}); setFormError(result.formError || "Please review the highlighted fields."); return; }
      router.push(`/seller/products?notice=${productId ? "updated" : "created"}`);
      router.refresh();
    } catch (error) { setFormError(error.message || "The listing could not be saved."); }
    finally { setIsSaving(false); }
  }

  if (isLoading) return <div className="auth-gate-loading"><span className="spinner" />Loading listing…</div>;
  if (productId && formError && !values.name) return <div className="empty-state"><h2>Listing unavailable</h2><p>{formError}</p><Link className="button button-secondary" href="/seller/products">Back to products</Link></div>;

  return <div><div className="seller-page-heading"><div><p className="eyebrow">{productId ? "Edit listing" : "New listing"}</p><h1>{productId ? "Update your product" : "Add a product"}</h1><p>Changes are saved only in this browser and are not published to other users or devices.</p></div></div><form className="product-form" onSubmit={handleSubmit} noValidate><div className="product-form-fields">{formError && <p className="form-alert error" role="alert">{formError}</p>}<label className="field"><span>Product name</span><input name="name" value={values.name} onChange={updateField} maxLength="120" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label><label className="field"><span>Description</span><textarea name="description" value={values.description} onChange={updateField} rows="7" maxLength="2000" aria-invalid={Boolean(errors.description)} />{errors.description && <small>{errors.description}</small>}<small>{values.description.length}/2000 characters</small></label><div className="form-grid"><label className="field"><span>Price (ETB)</span><input name="price" value={values.price} onChange={updateField} type="number" min="1" step="0.01" inputMode="decimal" aria-invalid={Boolean(errors.price)} />{errors.price && <small>{errors.price}</small>}</label><label className="field"><span>Stock quantity</span><input name="stock" value={values.stock} onChange={updateField} type="number" min="0" step="1" inputMode="numeric" aria-invalid={Boolean(errors.stock)} />{errors.stock && <small>{errors.stock}</small>}</label></div><div className="form-grid"><label className="field"><span>Category</span><select name="category" value={values.category} onChange={updateField} aria-invalid={Boolean(errors.category)}><option value="">Choose category</option>{categories.map((category) => <option value={category.slug} key={category.slug}>{category.name}</option>)}</select>{errors.category && <small>{errors.category}</small>}</label><label className="field"><span>Listing status</span><select name="status" value={values.status} onChange={updateField}><option value="active">Active</option><option value="inactive">Inactive</option></select>{errors.status && <small>{errors.status}</small>}</label></div><label className="field"><span>Demo image</span><select name="image" value={values.image.startsWith("/images/") ? values.image : "custom"} onChange={(event) => { if (event.target.value !== "custom") updateField({ target: { name: "image", value: event.target.value } }); }}><option value="custom">Custom HTTPS URL</option>{demoImages.map((image) => <option value={image.value} key={image.value}>{image.label}</option>)}</select></label><label className="field"><span>Image URL</span><input name="image" value={values.image} onChange={updateField} placeholder="https://example.com/product.jpg" aria-invalid={Boolean(errors.image)} />{errors.image && <small>{errors.image}</small>}<small>Use a built-in demo illustration or an HTTPS image URL. Production uploads require validated file storage.</small></label><div className="product-form-actions"><button className="button button-primary" type="submit" disabled={isSaving}>{isSaving ? "Saving listing…" : productId ? "Save changes" : "Create listing"}</button><Link className="button button-secondary" href="/seller/products">Cancel</Link></div></div><aside className="image-preview-panel"><p className="eyebrow">Image preview</p><div className="form-image-preview">{previewError ? <div><span>Image unavailable</span><small>Check the HTTPS URL or choose a demo image.</small></div> : <><img src={values.image} alt="Product preview" onError={() => setPreviewError(true)} /><span>Preview only</span></>}</div><div className="preview-summary"><span>{values.status}</span><h2>{values.name || "Product name"}</h2><p>{values.price ? `${Number(values.price).toLocaleString()} ETB` : "Price in ETB"}</p></div></aside></form></div>;
}

export default function ProductForm({ categories, productId }) { return <AuthGate role="seller"><FormContent categories={categories} productId={productId} /></AuthGate>; }
