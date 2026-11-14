/**
 * ============================================================
 *  BUSINESS CUSTOMISATION
 *  Replace the values below with your own shop details.
 *  The design stays exactly the same when content changes.
 * ============================================================
 */

import productHamper from "@/assets/product-hamper.jpg";
import productDiyas from "@/assets/product-diyas.jpg";
import productSweets from "@/assets/product-sweets.jpg";
import productSaree from "@/assets/product-saree.jpg";
import storeImage from "@/assets/store.jpg";
import familyPhoto from "@/assets/family.jpg";

export type Product = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  badge?: string;
  link?: string;
};

export const shop = {
  name: "श्री रामचरितमानस कथा महोत्सव",
  /** Set to an imported image or a URL. Leave empty to show a monogram. */
  logo: "",
  tagline: "परम पावन श्री रामचरितमानस अमृतवर्षा",
  description:
    "मर्यादा पुरुषोत्तम प्रभु श्री राम की पावन कथा जीवन को धर्म, सत्य और आदर्शों के मार्ग पर चलने की प्रेरणा देती है। पूज्य संत श्री रवि जी समदर्शी महाराज के सानिध्य में आयोजित इस पुनीत अमृत महोत्सव में आप सभी सपरिवार सादर आमंत्रित हैं।",
  address: "जयदेवी शास्त्री, आवास, इस्लामनगर (बदायूँ)",
  phone: "8273095177",
  whatsapp: "918273095177", // digits only, with country code
  website: "",
  instagram: "",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Islamnagar+Budaun+Uttar+Pradesh",
  storeImage,
  hours: "कथा समय: प्रतिदिन सायं 05:00 से रात्रि 10:00 बजे तक",
};

/**
 * Event Core Information: Organizer, Promoters, Venue, and Contacts
 */
export const organizerInfo = {
  label: "मुख्य आयोजक",
  eyebrow: "पावन सानिध्य",
  name: "जयदेवी शास्त्री",
  titles: [
    "वरिष्ठ भाजपा नेत्री / समाजसेविका",
    "पूर्व जिलामंत्री भाजपा, बदायूँ",
    "जिला कार्यकारिणी सदस्य भाजपा",
  ],
};

export const promoterInfo = {
  label: "पावन प्रवर्तक",
  eyebrow: "सहयोग एवं संरक्षण",
  title: "पावन प्रवर्तक",
  entities: [
    {
      name: "सी.एल. जी.डी. कॉन्वेंट स्कूल",
      address: "बिल्सी रोड, इस्लामनगर (बदायूँ)",
      category: "शिक्षा एवं संस्कार",
    },
    {
      name: "महिला समाजोत्थान समिति",
      address: "उत्तर प्रदेश",
      category: "समाज सेवा एवं उत्थान",
    },
  ],
};

export const venueInfo = {
  label: "स्थान",
  eyebrow: "पावन कथा स्थल",
  title: "जयदेवी शास्त्री, आवास",
  city: "इस्लामनगर (बदायूँ)",
  fullAddress: "जयदेवी शास्त्री, आवास, इस्लामनगर (बदायूँ)",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Islamnagar+Budaun+Uttar+Pradesh",
};

export const contactInfo = {
  label: "संपर्क सूत्र",
  eyebrow: "दर्शन एवं मार्गदर्शन",
  /** `phone`: 10-digit mobile number (calls and WhatsApp use it). `display`: how it is written on the page. */
  contacts: [
    { phone: "8273095177", display: "82730 95177" },
    { phone: "8475950474", display: "84759 50474" },
  ],
};

/**
 * Personal greeting on the red scroll.
 */
export const greeting = {
  /** Who the wishes are from — shown in gold under the photo. */
  fromName: "जयदेवी शास्त्री एवं समस्त आयोजक परिवार",
  photo: familyPhoto,
  /** Small line above the name. */
  caption: "सादर आमंत्रण",
  /** Headline wish under the name. */
  title: "श्री रामकथा पावन अमृत महोत्सव",
};

/**
 * "About us" section — plain text, write as much as you like.
 */
export const about = {
  eyebrow: "पावन अमृत प्रसंग",
  title: "श्री रामकथा परिचय",
  story:
    "मर्यादा पुरुषोत्तम भगवान श्री राम के आदर्श चरित्र, अगाध भ्रातृ-प्रेम, धर्मनिष्ठा और त्याग की अमर गाथा 'श्री रामकथा' संपूर्ण मानव जाति का कल्याण करने वाली है।\n\nपूज्य संत श्री के पावन श्रीमुख से प्रवाहित अमृतमयी वाणी के श्रवण से अंतःकरण पवित्र होता है और जीवन में सुख, शांति, भक्ति और आनंद का संचार होता है।",
  thanks: "॥ सियावर रामचंद्र की जय • जय श्री राम ॥",
};

/**
 * Big title over the temple. It plays by itself once the gate has opened:
 * `eyebrow` fades in, `top` is hand-written left → right, and each letter of
 * `bottom` rises from behind the temple.
 */
export const heroTitle = {
  eyebrow: "॥ श्री रामचरितमानस ॥",
  top: "अखंड",
  bottom: "रामायण पाठ",
};

/**
 * Blessing on the temple intro screen (above "दर्शन करें • Tap to enter"). It writes itself in
 * on load: `heading` rises word by word in gold, then `title`, then the chaupai is recited
 * word by word, one line after the other.
 */
export const gateBlessing = {
  heading: "॥ जय श्री राम ॥",
  title: "श्री रामचरितमानस",
  chaupai: ["मंगल भवन अमंगल हारी।", "द्रवहु सो दसरथ अजिर बिहारी॥"],
};

export type KathaEvent = {
  title: string;
  date: string;
  time: string;
  /** Small italic line under the date — place, or what happens. Optional. */
  note?: string;
  /** Picture in the gold medallion on the timeline. */
  icon: "kalash" | "jyoti" | "janm" | "vivah" | "rajtilak" | "yajna" | "deep" | "prasad";
};

/**
 * Katha schedule — the timeline right under the temple. Events are numbered
 * automatically (प्रसंग 01, 02, …) in the order listed. Add or remove freely.
 */
export const katha: { eyebrow: string; title: string; timing: string; events: KathaEvent[] } = {
  eyebrow: "॥ कथा कार्यक्रम ॥",
  title: "श्री राम कथा",
  timing: "प्रतिदिन सायं 05:00 से रात्रि 10:00 बजे तक",
  events: [
    {
      title: "भव्य कलश यात्रा",
      date: "22 नवम्बर 2026, रविवार",
      time: "प्रातः 09:00 बजे",
      note: "नगर भ्रमण से कथा स्थल तक",
      icon: "kalash",
    },
    {
      title: "कथा शुभारंभ एवं अखंड ज्योति",
      date: "22 नवम्बर 2026, रविवार",
      time: "सायं 05:00 बजे",
      note: "व्यास पीठ पूजन के साथ",
      icon: "jyoti",
    },
    {
      title: "श्री राम जन्मोत्सव",
      date: "24 नवम्बर 2026, मंगलवार",
      time: "सायं 05:00 बजे",
      note: "बधाई एवं जन्मोत्सव बधाई गान",
      icon: "janm",
    },
    {
      title: "श्री सीता-राम विवाह महोत्सव",
      date: "26 नवम्बर 2026, गुरुवार",
      time: "सायं 05:00 बजे",
      note: "पावन विवाह झांकी एवं उत्सव",
      icon: "vivah",
    },
    {
      title: "श्री राम राज्याभिषेक महोत्सव",
      date: "30 नवम्बर 2026, सोमवार",
      time: "सायं 05:00 बजे",
      note: "पावन राजतिलक एवं उत्सव",
      icon: "rajtilak",
    },
    {
      title: "यज्ञ / हवन एवं पूर्णाहुति",
      date: "01 दिसम्बर 2026, मंगलवार",
      time: "दोपहर 12:00 बजे",
      note: "वैदिक मंत्रोच्चार सहित पूर्णाहुति",
      icon: "yajna",
    },
    {
      title: "विशाल भण्डारा (महाप्रसाद)",
      date: "01 दिसम्बर 2026, मंगलवार",
      time: "दोपहर 02:00 बजे से प्रभु इच्छा तक",
      note: "समस्त भक्तजन सपरिवार सादर आमंत्रित",
      icon: "prasad",
    },
  ],
};

export type TeamMember = {
  name: string;
  /** Who they are — shown in small capitals under the name. */
  role: string;
  /**
   * Photo inside the sun-ray frame. Copy the photo into src/assets, import it at the top of this
   * file (e.g. `import rameshPhoto from "@/assets/ramesh.jpg";`) and set `photo: rameshPhoto`.
   * A URL also works. Leave "" to show the first letter of the name.
   */
  photo: string;
};

/** "Our team" — shown right under "About us". Add or remove people freely. */
export const team: { eyebrow: string; title: string; members: TeamMember[] } = {
  eyebrow: "॥ सेवा समिति ॥",
  title: "कथा सेवक एवं व्यवस्थापक",
  members: [
    { name: "श्री रमेश शर्मा", role: "मुख्य यजमान", photo: "" },
    { name: "श्रीमती सुनीता शर्मा", role: "व्यवस्था प्रमुख", photo: "" },
    { name: "श्री आरव शर्मा", role: "प्रसाद एवं सेवा", photo: "" },
  ],
};

export const ramayanMessage = {
  heading: "॥ जय श्री राम ॥",
  wish:
    "प्रभु श्री राम की असीम कृपा और आशीर्वाद आप और आपके समस्त परिवार पर सदैव बना रहे।",
  closingWish:
    "प्रभु श्री राम का पावन आशीर्वाद आपके जीवन में सुख, शांति, समृद्धि और आनंद की वर्षा करे।",
};

export const products: Product[] = [
  {
    id: "hamper",
    image: productHamper,
    name: "श्री रामकथा प्रसाद थाली",
    description: "पंचमेवा, शुद्ध घी की मिठाई एवं पावन तुलसी दल।",
    price: 2499,
    offerPrice: 1799,
    badge: "महाप्रसाद",
    link: "#",
  },
  {
    id: "saree",
    image: productSaree,
    name: "पीताम्बर रेशमी वस्त्र",
    description: "भगवान के शृंगार हेतु जरी किनारी युक्त पीताम्बर।",
    price: 8999,
    offerPrice: 6299,
    badge: "पूजा सामग्री",
    link: "#",
  },
  {
    id: "diyas",
    image: productDiyas,
    name: "पंचमुखी पीतल आरती दीप",
    description: "आरती एवं अखंड दीप हेतु हस्तनिर्मित पावन दीपमाला।",
    price: 1899,
    offerPrice: 1349,
    badge: "अखंड दीप",
    link: "#",
  },
  {
    id: "sweets",
    image: productSweets,
    name: "छप्पन भोग महाप्रसाद",
    description: "काजू कतली, मोतीचूर लड्डू एवं पंचामृत।",
    price: 1299,
    offerPrice: 999,
    badge: "भोग प्रसाद",
    link: "#",
  },
];

export const offer = {
  title: "श्री रामकथा पावन महोत्सव",
  discount: "अमृतवर्षा",
  subtitle: "सियावर रामचंद्र की जय",
  coupon: "RAMKATHA",
  validity: "प्रतिदिन सायं 4:00 से 7:00",
  description:
    "कथा स्थल पर पधारकर अमृतमयी कथा श्रवण करें और प्रभु श्री राम का पावन आशीर्वाद प्राप्त करें।",
  cta: "कथा स्थल दर्शन",
  ctaLink: "#about",
};

export const marqueeItems = [
  "॥ जय श्री राम ॥",
  "॥ श्री रामचरितमानस ॥",
  "॥ सामाजिक संत श्री रवि जी समदर्शी महाराज ॥",
  "॥ अमृतवर्षा ॥",
  "॥ सियावर रामचंद्र की जय ॥",
];

/* ---------- helpers ---------- */

export const whatsappLink = (text: string) =>
  `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const discountPct = (price: number, offerPrice: number) =>
  Math.round(((price - offerPrice) / price) * 100);
