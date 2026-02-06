export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  slug?: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  features?: string[]; // Detailed technical capabilities
}

export interface NavLink {
  label: string;
  path: string;
  external?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  link?: string;
}

export interface SlideItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  schemaType?: 'WebSite' | 'Organization' | 'LocalBusiness' | 'Service' | 'Course' | 'Article' | 'AboutPage' | 'ContactPage' | 'SearchResultsPage';
  image?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface GlobalSettings {
  contactInfo: ContactInfo;
  navLinks: NavLink[];
  socialLinks: { platform: string; url: string }[];
}

export interface PageData<T> {
  seo: SEOData;
  content: T;
}

export interface TenderItem {
  id: string;
  title: string;
  refNumber: string;
  publishDate: string;
  closingDate: string;
  downloadLink: string;
  category: 'Goods' | 'Works' | 'Services';
}

export interface DownloadItem {
  id: string;
  title: string;
  date: string;
  size: string;
  link: string;
  type: 'PDF' | 'DOC';
}

export interface GenericPageContent {
  title: string;
  subtitle?: string;
  body: string; // HTML content
  lastUpdated?: string;
  image?: string; // Optional hero image
}

export interface RichServiceContent extends GenericPageContent {
  features?: string[];
  specifications?: Record<string, string>[]; // For tables like Range/Accuracy
  benefits?: string[];
}

export interface ExtensionCentreData {
  name: string;
  description: string;
  address: string;
  image: string;
  contact: { phone: string; email: string };
  services: string[];
}

export interface SearchItem {
  title: string;
  path: string;
  type: 'Service' | 'Training' | 'Page' | 'Download' | 'Person' | 'Facility' | 'News';
  desc: string;
}
