export type AppRoute =
  | "/admin"
  | "/admin/dashboard"
  | "/admin/login"
  | "/admin/home"
  | "/admin/actions"
  | "/admin/gallery"
  | "/admin/contact"
  | "/admin/gdpr"
  | "/admin/termsOfConditions"
  | "/admin/webSettings"
  | "/admin/logos"
  | "/admin/users"
  | "/admin/unauthorized"
  | "/admin/notfound";

export const AppRoute = {
  Base: "/admin" as AppRoute,
  Dashboard: "/admin/dashboard" as AppRoute,
  Login: "/admin/login" as AppRoute,
  Home: "/admin/home" as AppRoute,
  Actions: "/admin/actions" as AppRoute,
  Gallery: "/admin/gallery" as AppRoute,
  Contact: "/admin/contact" as AppRoute,
  Gdpr: "/admin/gdpr" as AppRoute,
  TermsOfConditions: "/admin/termsOfConditions" as AppRoute,
  WebSettings: "/admin/webSettings" as AppRoute,
  Logos: "/admin/logos" as AppRoute,
  Users: "/admin/users" as AppRoute,
  Unauthorized: "/admin/unauthorized" as AppRoute,
  Notfound: "/admin/notfound" as AppRoute,
};
