const API_URL = "https://api.github.com/users/";
const searchInput = document.querySelector("#input");
const searchButton = document.querySelector("#submit");

const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const login = document.querySelector("#user");
const joinedDate = document.querySelector("#date");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const locationElement = document.querySelector("#location");
const page = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const noResults = document.querySelector("#no-results");

const modeText = document.querySelector("#mode-text");
const modeIcon = document.querySelector("#mode-icon");

let darkMode = false;

// Toggle dark mode
function toggleDarkMode() {
  darkMode = !darkMode;

  document.body.classList.toggle("dark-mode", darkMode);
  modeText.textContent = darkMode ? "LIGHT" : "DARK";

  // Swap Font Awesome icon
  modeIcon.classList = darkMode ? "fas fa-sun" : "fas fa-moon";

  localStorage.setItem("dark-mode", darkMode);
}

// Listen to toggle
document.getElementById("btn-mode").addEventListener("click", toggleDarkMode);

// Load theme on DOM load
window.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("dark-mode") === "true";
  darkMode = savedMode;

  document.body.classList.toggle("dark-mode", darkMode);
  modeText.textContent = darkMode ? "LIGHT" : "DARK";
  modeIcon.classList = darkMode ? "fas fa-sun" : "fas fa-moon";

  getUser("hiteshchoudhary"); // Default profile
});

searchButton.addEventListener("click", () => {
  const username = searchInput.value.trim();
  if (username) {
    getUser(username);
  }
});

async function getUser(username) {
  try {
    const response = await fetch(`${API_URL}${username}`);
    const data = await response.json();

    if (data.message === "Not Found") {
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";
    updateProfile(data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

function updateProfile(data) {
  avatar.src = data.avatar_url;
  userName.textContent = data.name || data.login;
  login.textContent = `@${data.login}`;
  login.href = data.html_url;

  const date = new Date(data.created_at);
  joinedDate.textContent = `Joined ${date.toDateString().slice(4)}`;
  bio.textContent = data.bio || "This profile has no bio";

  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;

  locationElement.textContent = data.location || "Not Available";
  page.textContent = data.blog || "Not Available";
  page.href = data.blog || "#";

  twitter.textContent = data.twitter_username || "Not Available";
  twitter.href = data.twitter_username
    ? `https://twitter.com/${data.twitter_username}`
    : "#";

  company.textContent = data.company || "Not Available";
}