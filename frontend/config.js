// Site-wide configuration — update these when deploying or changing services.
const CONFIG = {
  // Backend contact form endpoint
  contactEndpoint: 'https://rfoo1250-web-service.onrender.com/contact',

  // Email obfuscation — split to keep address out of static HTML
  emailUser:   'rfoo1',
  emailDomain: 'asu.edu',

  // Journey data source
  journeyJsonPath: './data/json/journey.json',

  // Publications data source
  publicationsJsonPath: './data/json/publications.json',
};
