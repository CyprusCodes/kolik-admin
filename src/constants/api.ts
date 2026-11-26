export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";
export const KOLIK_APP_URL: string = import.meta.env.VITE_KOLIK_APP_URL ?? "http://localhost:3000";
export const OPENREPLAY_URL: string = import.meta.env.VITE_OPENREPLAY_URL ?? "https://openreplay.kolik.co/";
export const CLOUDWATCH_DASHBOARD_URL: string =
  import.meta.env.VITE_CLOUDWATCH_DASHBOARD_URL ??
  "https://cloudwatch.amazonaws.com/dashboard.html?dashboard=kolik-api-monitoring&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTYyNjUzNTM5MTcxNSIsIlUiOiJ1cy1lYXN0LTFfRlMwaVVEY3BYIiwiQyI6IjRjZHJxaTBwczFydm9vaThkc3ByMHYwY3NsIiwiSSI6InVzLWVhc3QtMTo0MjIzZGY3My02OGRiLTRjOWQtOTE3MC0yZmJhNThiNmI4OWMiLCJNIjoiUHVibGljIn0=";
