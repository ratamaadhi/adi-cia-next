const toBlogsPage = () => window.location.replace("/blog");

const toSlugPage = (slug) => window.location.assign(`/blog/${slug}`);

export { toBlogsPage, toSlugPage };
