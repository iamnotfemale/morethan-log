const { CONFIG } = require("./site.config")
console.log("Vercel Build Config:", {
  link: CONFIG.link,
  ogImageGenerateURL: CONFIG.ogImageGenerateURL,
})
