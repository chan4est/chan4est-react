export const linkConstants = Object.freeze({
  HOME: "/",
  TECH_STACK: "/#tech-stack",
  PROJECTS: "/#projects",
  BLOG: "/blog",
  TERMS: "/terms-and-conditions",
  PRIVACY: "/privacy-policy",
  RESUME: "/Chandler-Forrest-Resume.pdf",
  EMAIL: "mailto:chan4est@gmail.com?subject=I Found Your Website!",
  GAMES: "https://howlongtobeat.com/user/chan4est",
  CONCERT_SHEET:
    "https://docs.google.com/spreadsheets/d/1JjRG0ecEKX-PcujPT5zeRwYcGetAocj5kE3DGuULYkQ/edit?usp=sharing",
  LINKEDIN: "https://www.linkedin.com/in/chan4est/",
  GITHUB: "https://github.com/chan4est/",
  TOKYO_BLOG: "/blog/tokyo?img_index=19",
  NAGOYA_BLOG: "/blog/nagoya?img_index=4",
  BLOG_GALLERY: "/blog/gallery",
  BLOG_ROUTER_LINK: (country, imageIndex) =>
    `/blog/${country}?img_index=${imageIndex + 1}`,
  BLOG_BACK_LINK: (country) => `/blog/${country}`,
});
