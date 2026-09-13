import { createContext, useContext, useEffect, useState } from "react";

// ========================================
// CREATE CONTEXT
// ========================================

const FavoritesContext = createContext();

// ========================================
// FAVORITES PROVIDER
// ========================================

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("campusConnectFavorites");

      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);

      return [];
    }
  });

  // ========================================
  // SAVE FAVORITES TO LOCAL STORAGE
  // ========================================

  useEffect(() => {
    localStorage.setItem("campusConnectFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // ========================================
  // ADD FAVORITE
  // ========================================

  function addFavorite(club) {
    setFavorites((currentFavorites) => {
      // Prevent duplicate favorites
      const alreadyFavorite = currentFavorites.some(
        (favorite) => String(favorite.id) === String(club.id),
      );

      if (alreadyFavorite) {
        return currentFavorites;
      }

      return [...currentFavorites, club];
    });
  }

  // ========================================
  // REMOVE FAVORITE
  // ========================================

  function removeFavorite(clubId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (favorite) => String(favorite.id) !== String(clubId),
      ),
    );
  }

  // ========================================
  // CHECK FAVORITE
  // ========================================

  function isFavorite(clubId) {
    return favorites.some((favorite) => String(favorite.id) === String(clubId));
  }

  // ========================================
  // CONTEXT VALUE
  // ========================================

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ========================================
// CUSTOM HOOK
// ========================================

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
