import { siteConfig } from "./site-config";

type EventPayload = Record<string, string>;

export function trackEvent(name: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as Window & {
    gtag?: (command: "event", eventName: string, parameters: EventPayload) => void;
    fbq?: (command: "trackCustom", eventName: string, parameters: EventPayload) => void;
  };

  if (siteConfig.analytics.ga4Id && analyticsWindow.gtag) {
    analyticsWindow.gtag("event", name, payload);
  }
  if (siteConfig.analytics.metaPixelId && analyticsWindow.fbq) {
    analyticsWindow.fbq("trackCustom", name, payload);
  }
}