module.exports = {
  name: "Mike Henke",
  description:
    "Full-stack web and mobile developer with 15+ years of experience. Specializing in JavaScript, Python, React, and modern web technologies.",

  // Environment-specific URLs
  url:
    process.env.NODE_ENV === "production"
      ? "https://mikehenke.com"
      : "http://localhost:8080",

  environment: process.env.NODE_ENV || "development",

  // For GitHub Pages
  repository: "mhenke/mike-henke-website",
};
