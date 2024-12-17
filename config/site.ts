export const siteConfig = {
  siteMetadata: {
    title: " ",
    description: "",
  },
  siteLogo: { url: "" },
  sideBarItems: [
    { slug: "/", label: "Dashboard" },
    { slug: "/users", label: "Users" },
    { slug: "/tax-settings", label: "Tax Settings" },
    { slug: "/settings", label: "Settings" },
  ],
  footerQucksLink: [
    { slug: "/privacy-policy", label: "Privacy Policy" },
    { slug: "/terms-and-condition", label: "Terms & Condition" },
    { slug: "/refund-policy", label: "Refund Policy" },
    { slug: "/help-and-support", label: "Help & Support" },
  ],
};

export type SiteConfig = typeof siteConfig;
