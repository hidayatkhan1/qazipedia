import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-amber-500 text-teal-950 hover:bg-amber-400 shadow-sm hover:shadow-md",
  secondary:
    "bg-teal-900 text-parchment-50 hover:bg-teal-800",
  outline:
    "border border-teal-700 text-teal-900 hover:bg-teal-900 hover:text-parchment-50",
  ghost: "text-teal-900 hover:bg-teal-900/10",
};

/**
 * Shared button component. Renders a <Link> when `to` is provided,
 * otherwise a native <button>. Keeps focus rings and transitions
 * consistent everywhere a call-to-action appears.
 */
export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
