'use strict';

// Public GitHub data only: no token is needed or stored in the site.
async function loadGitHub(card) {
  const user = card.dataset.github;
  const status = card.querySelector('[data-github-status]');
  const key = `github-profile-v1:${user}`;
  const valid = data => data && ['public_repos', 'followers', 'public_gists'].every(k => Number.isInteger(data[k]) && data[k] >= 0);
  const display = (data, timestamp, cached = false) => {
    card.querySelectorAll('[data-stat]').forEach(el => {
      el.textContent = data[el.dataset.stat].toLocaleString();
    });
    status.textContent = `${cached ? 'Cached public data' : 'Public data from GitHub'} · Updated ${new Date(timestamp).toLocaleString()}`;
  };
  let cached;
  try {
    cached = JSON.parse(localStorage.getItem(key));
    if (!cached || !valid(cached.data) || !Number.isFinite(cached.at) || cached.at > Date.now()) cached = null;
  } catch { /* Storage can be unavailable in private browsing. */ }
  // Show the last successful result immediately, then refresh on every load.
  if (cached) {
    display(cached.data, cached.at, true);
  }
  status.textContent = cached ? status.textContent : 'Loading public GitHub metrics…';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, {
      credentials: 'omit', cache: 'no-cache', referrerPolicy: 'no-referrer',
      headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const data = await response.json();
    if (!valid(data)) throw new Error('Incomplete GitHub profile');
    const at = Date.now();
    display(data, at);
    try { localStorage.setItem(key, JSON.stringify({data: {
      public_repos: data.public_repos, followers: data.followers, public_gists: data.public_gists
    }, at})); } catch { /* Metrics still work without persistent storage. */ }
  } catch {
    if (cached) {
      display(cached.data, cached.at, true);
      status.textContent += ' · Refresh unavailable.';
    } else {
      status.textContent = 'GitHub metrics are unavailable right now. Visit the profile for current activity.';
    }
  } finally { clearTimeout(timer); }
}

document.querySelectorAll('[data-github]').forEach(loadGitHub);

const postList = document.querySelector('#post-list');
if (postList) {
  const rows = [...postList.querySelectorAll('[data-category]')];
  const input = document.querySelector('#post-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const status = document.querySelector('#filter-status');
  let category = 'All';
  // Keep the publishing empty state simple until there is content to search.
  document.querySelector('.blog-tools').hidden = rows.length === 0;
  function filter() {
    const query = input.value.trim().toLowerCase();
    let count = 0;
    rows.forEach(row => {
      const match = (category === 'All' || row.dataset.category === category) && row.dataset.search.toLowerCase().includes(query);
      row.hidden = !match;
      if (match) count++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    document.querySelector('#no-results').hidden = count !== 0 || rows.length === 0;
    status.textContent = rows.length ? `${count} ${count === 1 ? 'writeup' : 'writeups'}` : '';
  }
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filter(); }));
  input.addEventListener('input', filter);
  filter();
}

// The chart is a remote image: no API token or third-party script is loaded.
const contributionChart = document.querySelector('[data-contribution-chart]');
if (contributionChart) {
  const showChartError = () => {
    contributionChart.parentElement.hidden = true;
    document.querySelector('[data-chart-error]').hidden = false;
  };
  contributionChart.addEventListener('error', showChartError);
  // The image may finish loading before this deferred script runs.
  if (contributionChart.complete && contributionChart.naturalWidth === 0) showChartError();
}
