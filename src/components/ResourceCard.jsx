function ResourceCard({ title, category, description, icon, link }) {
  return (
    <article className="resource-card">
      <div className="resource-icon">{icon}</div>

      <div className="resource-card-content">
        <span className="resource-category">{category}</span>

        <h2>{title}</h2>

        <p>{description}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link"
        >
          Access Resource →
        </a>
      </div>
    </article>
  );
}

export default ResourceCard;
