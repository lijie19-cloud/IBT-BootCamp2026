"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";

import { fetcher } from "@/lib/fetcher";

export default function PaginatedMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlPage = Number(searchParams.get("page") || 1);

  const [page, setPage] = useState(
    Number.isFinite(urlPage) && urlPage > 0 ? urlPage : 1,
  );

  useEffect(() => {
    const nextPage = Number(searchParams.get("page") || 1);

    if (Number.isFinite(nextPage) && nextPage > 0) {
      setPage(nextPage);
    }
  }, [searchParams]);

  const { data, error, isLoading } = useSWR(
    `/api/dishes?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  function changePage(nextPage) {
    if (!data) return;

    if (nextPage < 1 || nextPage > data.totalPages) {
      return;
    }

    setPage(nextPage);

    router.push(`/menu?page=${nextPage}`);
  }

  if (error) {
    return <div className="error-message">Could not load the menu.</div>;
  }

  if (isLoading && !data) {
    return <div className="loading-message">Loading menu...</div>;
  }

  return (
    <div>
      <div className="dish-grid">
        {data?.data?.map((dish) => (
          <article key={dish.id} className="dish-card">
            <div className="dish-card-top">
              <div className="dish-icon">🍛</div>

              <span className="category-badge">{dish.category}</span>
            </div>

            <h3>{dish.name}</h3>

            <p>{dish.description}</p>

            <div className="dish-bottom">
              <strong>{dish.price} ETB</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination">
        <button
          type="button"
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
        >
          ← Previous
        </button>

        <span>
          Page <strong>{data?.page}</strong> of{" "}
          <strong>{data?.totalPages}</strong>
        </span>

        <button
          type="button"
          onClick={() => changePage(page + 1)}
          disabled={page === data?.totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
