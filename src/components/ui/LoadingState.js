export default function LoadingState() {
  return <div className="loading-grid" aria-label="Loading products" aria-live="polite">{Array.from({ length: 6 }, (_, index) => <div className="product-skeleton" key={index}><span /><span /><span /></div>)}</div>;
}
