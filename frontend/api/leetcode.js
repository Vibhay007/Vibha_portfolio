// api/leetcode.js
export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    if (!response.ok) {
      throw new Error(`Upstream returned ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch LeetCode stats", details: err.message });
  }
}