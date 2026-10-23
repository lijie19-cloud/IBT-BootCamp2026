import Link from "next/link";

export default function Button({ href, children, variant = "primary", className = "", ...props }) {
  const classes = `button button-${variant} ${className}`.trim();
  if (href) return <Link className={classes} href={href} {...props}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
