interface KolikLogoProps {
  color?: string;
  collapsed?: boolean;
}

export const KolikLogo = ({ color = "currentColor", collapsed = false }: KolikLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${collapsed ? 97 : 180} 50`}
    role="img"
    aria-label="kolik"
  >
    <text x="0" y="50" fontFamily="Arial, sans-serif" fontSize="43" letterSpacing="3">
      <tspan fill={color}>kol</tspan>
      <tspan fill="#9E77ED">ik</tspan>
    </text>
  </svg>
);
