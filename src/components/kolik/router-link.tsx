import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface RouterLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(function RouterLink(
  { href, ...other },
  ref,
) {
  return <Link ref={ref} to={href} {...other} />;
});
