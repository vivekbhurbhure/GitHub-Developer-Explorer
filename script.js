const loader = document.getElementById("loader");

async function searchUser() {
  const username = document.getElementById("username").value.trim();
  if (username === "") { alert("Enter Username"); return; }

  loader.style.display = "block";
  document.getElementById("profile").innerHTML = "";
  document.getElementById("repos").innerHTML = "";
  const existingChart = document.getElementById("langChart");
  if (existingChart) existingChart.remove();

  try {
    const user = await fetchGitHubUser(username);
    AppState.repos = await fetchUserRepos(username);
    renderProfile(user);
    renderRepos(AppState.repos);
    renderLanguageChart(AppState.repos);
  } catch (error) {
    document.getElementById("profile").innerHTML = `<div class="error">${error.message}</div>`;
  } finally {
    loader.style.display = "none";
  }
}

function sortRepos() {
  AppState.repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  renderRepos(AppState.repos);
}
