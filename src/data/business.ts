/**
 * ============================================================
 *  BUSINESS CUSTOMISATION
 *  Replace the values below with your own shop details.
 *  The design stays exactly the same when content changes.
 * ============================================================
 */

export const shop = {
  /** Event name — used in the page title and the WhatsApp message. */
  name: "श्री रामचरितमानस कथा महोत्सव",
};

/**
 * Event Core Information: Organizer, Promoters, Venue, and Contacts
 */
export const organizerInfo = {
  label: "मुख्य आयोजक",
  eyebrow: "पावन सानिध्य",
  name: "जयदेवी शास्त्री",
  titles: [
    "वरिष्ठ समाजसेविका",
    "पूर्व जिलामंत्री भाजपा, बदायूँ",
    "जिला कार्यकारिणी सदस्य भाजपा",
  ],
};

export const promoterInfo = {
  label: "प्रबंधक",
  eyebrow: "सहयोग एवं संरक्षण",
  title: "प्रबंधक",
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
 * Blessing on the temple intro screen (above "दर्शन करें • Tap to enter"). On load each line —
 * `heading` in gold, then `title`, then each chaupai line — flies up out of the temple's spire.
 */
export const gateBlessing = {
  heading: "॥ जय श्री राम ॥",
  title: "श्री रामचरितमानस",
  chaupai: ["मंगल भवन अमंगल हारी।", "द्रवहु सो दसरथ अजिर बिहारी॥"],
};

export const ramayanMessage = {
  heading: "॥ जय श्री राम ॥",
  wish:
    "प्रभु श्री राम की असीम कृपा और आशीर्वाद आप और आपके समस्त परिवार पर सदैव बना रहे।",
  closingWish:
    "प्रभु श्री राम का पावन आशीर्वाद आपके जीवन में सुख, शांति, समृद्धि और आनंद की वर्षा करे।",
};
