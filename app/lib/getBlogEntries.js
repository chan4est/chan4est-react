export async function getBlogEntries() {
  const res = await fetch("http://127.0.0.1:5000/blog/");
  const blogEntries = await res.json();
  return blogEntries;
}
