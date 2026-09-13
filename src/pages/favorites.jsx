import { Link } from "react-router-dom";

import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <main className="page-section">
      <div className="page-header">
        <h1>My Favorite Clubs</h1>

        <p>Clubs you have saved for later.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorite clubs yet</h2>

          <p>Explore campus clubs and save the ones you are interested in.</p>

          <Link to="/clubs" className="details-button">
            Explore Clubs
          </Link>
        </div>
      ) : (
        <div className="favorite-list">
          {favorites.map((club) => (
            <article key={club.id} className="favorite-card">
              <img src={club.image} alt={`${club.name} club`} />

              <div className="favorite-card-content">
                <span className="club-category">{club.category}</span>

                <h2>{club.name}</h2>

                <p>{club.description}</p>

                <div className="favorite-actions">
                  <Link to={`/clubs/${club.id}`} className="details-button">
                    View Details
                  </Link>

                  <button
                    type="button"
                    className="remove-favorite-button"
                    onClick={() => removeFavorite(club.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
