import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      features: 'Features',
      customer_support: 'Customer Support',
      blog: 'Blog',
      pricing: 'Pricing',
      advanced_booking_system: 'Advanced Booking System',
      comprehensive_booking_management: 'Comprehensive Booking Management',
      multi_criteria_search: 'Multi Criteria Search',
      ratings_reviews: 'Ratings & Reviews',
      multi_vendor_support: 'Multi Vendor Support',
      nifty_platform: 'Nifty Platform',
      login: 'Login',
      become_a_vendor: 'Become a Vendor',
      profile: 'Profile',
      bookings: 'Bookings',
      settings: 'Settings',
      logout: 'Logout',
      notifications: 'Notifications',
    }
  },
  nl: {
    translation: {
      home: 'Thuis',
      features: 'Functies',
      customer_support: 'Klantenservice',
      blog: 'Blog',
      pricing: 'Prijzen',
      advanced_booking_system: 'Geavanceerd Boekingssysteem',
      comprehensive_booking_management: 'Uitgebreid Boekingsbeheer',
      multi_criteria_search: 'Multi-criteria Zoeken',
      ratings_reviews: 'Beoordelingen & Reviews',
      multi_vendor_support: 'Multi-vendor Ondersteuning',
      nifty_platform: 'Handige Platform',
      login: 'Inloggen',
      become_a_vendor: 'Word een Verkoper',
      profile: 'Profiel',
      bookings: 'Boekingen',
      settings: 'Instellingen',
      logout: 'Uitloggen',
      notifications: 'Meldingen',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
