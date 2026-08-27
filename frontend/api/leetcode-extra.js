// api/leetcode-extra.js
export default async function handler(req, res) {
  const { username, type } = req.query;

  if (!username || !["badges", "contest"].includes(type)) {
    return res.status(400).json({ error: "Missing or invalid params" });
  }

  try {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/${type}`);
    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch ${type}`, details: err.message });
  }
}