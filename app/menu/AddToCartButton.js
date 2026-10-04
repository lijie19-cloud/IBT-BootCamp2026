"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToCart } from "@/lib/cart-api";

export default function AddToCartButton({ dish }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutation.mutate(dish)}
      disabled={mutation.isPending}
      className="add-cart-button"
    >
      {mutation.isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}
