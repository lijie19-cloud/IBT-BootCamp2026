import Button from "./Button";

export default function EmptyState({ title, description, actionHref = "/products", actionLabel = "Clear filters" }) {
  return <div className="empty-state"><span aria-hidden="true">◇</span><h2>{title}</h2><p>{description}</p><Button href={actionHref} variant="secondary">{actionLabel}</Button></div>;
}
