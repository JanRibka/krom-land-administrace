export type AppRoute =
  | "/admin"
  | "/admin/home"
  | "/admin/actions"
  | "/admin/gallery"
  | "/admin/contact"
  | "/admin/gdpr"
  | "/admin/termsOfConditions";

export const AppRoute = {
  Dashboard: "/admin" as AppRoute,
  Home: "/admin/home" as AppRoute,
  Actions: "/admin/actions" as AppRoute,
  Gallery: "/admin/gallery" as AppRoute,
  Contact: "/admin/contact" as AppRoute,
  Gdpr: "/admin/gdpr" as AppRoute,
  TermsOfConditions: "/admin/termsOfConditions" as AppRoute,
};
