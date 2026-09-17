// BEFORE (kept for reference only -- not imported anywhere in src/).
//
// This is roughly the starting point the deliverable assumes: cart,
// auth, and theme all crammed into one context, so ANY change to any
// of the three -- toggling the theme, logging in, adding a dish --
// re-rendered every consumer of useCart, useAuth-via-cart, etc.
//
// Step 1 of the migration was just this: wrap the raw useContext call
// in a hook that throws when there's no provider above it, so a missing
// <CartProvider> fails loudly at the call site instead of quietly
// returning undefined and breaking three components downstream.
import { createContext, useContext, useState } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null) // <- auth, tangled in here too
  const [theme, setTheme] = useState('light') // <- and theme

  const addItem = (dish) => setItems((prev) => [...prev, dish])
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setItems([])
  const login = (name) => setUser({ name })
  const logout = () => setUser(null)
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, user, login, logout, theme, toggleTheme }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Step 1: the useCart wrapper that throws without a provider.
export function useCart() {
  const ctx = useContext(CartContext)
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}

// Every consumer -- a component that just wanted the item count, one
// that just wanted to log in, one that just wanted to flip the theme --
// called useCart() and got the WHOLE object back. React context has no
// concept of "give me just this field"; a change anywhere in `value`
// re-renders every component that called useContext(CartContext), full
// stop. That's the problem Steps 2-5 fix.
