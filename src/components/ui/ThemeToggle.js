"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ compact = false }) {
  const { theme, setTheme } = useTheme();

  return (
    <label className={compact ? "theme-control theme-control-compact" : "theme-control"}>
      <span className="sr-only">Color theme</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42M7.06 16.94l-1.42 1.42M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
      <select value={theme} onChange={(event) => setTheme(event.target.value)} aria-label="Choose color theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
