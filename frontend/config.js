// Site-wide configuration — update these when deploying or changing services.
const CONFIG = {
  // Backend contact form endpoint
  contactEndpoint: 'https://rfoo1250-web-service.onrender.com/contact',

  // Ping endpoint to wake the Render backend on page load
  pingEndpoint: 'https://rfoo1250-web-service.onrender.com/ping',

  // Email obfuscation — split to keep address out of static HTML
  emailUser:   'rfoo1',
  emailDomain: 'asu.edu',

  // Journey data source
  journeyJsonPath: './frontend/data/json/journey.json',

  // Publications data source
  publicationsJsonPath: './frontend/data/json/publications.json',
};
