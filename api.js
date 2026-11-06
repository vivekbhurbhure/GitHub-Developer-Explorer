async function fetchGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const rateLimit = res.headers.get("X-RateLimit-Remaining");
  if (rateLimit === "0") {
    const resetTime = res.headers.get("X-RateLimit-Reset");
    const wait = new Date(Number(resetTime) * 1000).toLocaleTimeString();
    throw new Error(`API rate limit exceeded. Resets at ${wait}.`);
  }
  if (!res.ok) throw new Error("User Not Found");
  return res.json();
}

async function fetchUserRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  return res.json();
}
