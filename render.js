function renderProfile(user) {
  document.getElementById("profile").innerHTML = `
  <div class="profile-card">
    <img src="${user.avatar_url}">
    <div>
      <h2>${user.name || user.login}</h2>
      <p>${user.bio || "No Bio Available"}</p>
      <div class="stats">
        <div class="stat">👥 Followers: ${user.followers}</div>
        <div class="stat">➡ Following: ${user.following}</div>
        <div class="stat">📦 Repos: ${user.public_repos}</div>
      </div>
    </div>
  </div>`;
}

function renderRepos(repos) {
  const reposDiv = document.getElementById("repos");
  reposDiv.innerHTML = "";
  repos.forEach(repo => {
    reposDiv.innerHTML += `
    <div class="repo-card">
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <p>⭐ Stars: ${repo.stargazers_count}</p>
      <p>🍴 Forks: ${repo.forks_count}</p>
      <p>🔤 ${repo.language || "N/A"}</p>
    </div>`;
  });
}

function renderLanguageChart(repos) {
  const existing = document.getElementById("langChart");
  if (existing) existing.remove();

  const langMap = {};
  repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(langMap).sort((a, b) => b[1] - a[1]);

  const div = document.createElement("div");
  div.id = "langChart";
  div.style.cssText = "background:white;border-radius:15px;padding:25px;margin-top:20px;box-shadow:0 8px 20px rgba(0,0,0,0.1);";
  let html = "<h3 style='margin-bottom:15px'>📊 Language Breakdown</h3><div style='display:flex;flex-wrap:wrap;gap:10px;'>";
  const colors = ["#e34c26","#178600","#f1e05a","#563d7c","#2b7489","#b07219","#c6538c","#3d6117","#00add8","#3178c6"];
  sorted.forEach(([lang, count], i) => {
    html += `<span style="background:${colors[i % colors.length]};color:white;padding:6px 14px;border-radius:20px;font-size:0.9rem;">${lang} ${((count/total)*100).toFixed(1)}%</span>`;
  });
  html += "</div>";
  div.innerHTML = html;
  document.querySelector(".container").appendChild(div);
}
