const OUTFIT_KEY = 'wichtelOutfit2026';
const PROGRESS_KEY = 'wichtelProgress2026';
const DEFAULT_OUTFIT = { name: 'Wichtel', hat: 'Red', coat: 'Green', pants: 'Blue', hair: 'Blond', accessory: 'Schal' };
const STORIES = {
  1: 'Anmeldung und Einkleidung in der Wichtelschule', 2: 'Die Werkstatt-Suchprüfung', 3: 'Werkzeugkunde', 4: 'Orientierung in der Wichtelschule', 5: 'Ordnung in der Geschenkewerkstatt', 6: 'Weihnachtswissen beweisen', 7: 'Wunschzettel entziffern', 8: 'Die Lichterprüfung in Lyon', 9: 'Die Werkstatt schmücken', 10: 'Geschenkstapel berechnen', 11: 'Reaktionsprüfung', 12: 'Die geheime Wichtelnachricht', 13: 'Aufmerksam zählen', 14: 'Das Werkstattbild zusammensetzen', 15: 'Geschenke zuordnen', 16: 'Die Schreibprüfung', 17: 'Pakete sortieren', 18: 'Das Prüfungszeichen finden', 19: 'Die Gedächtnisprüfung', 20: 'Christmas carols erkennen', 21: 'Die Liefertour planen', 22: 'Die letzte Paketprüfung', 23: 'Die Generalprobe', 24: 'Abschlussprüfung an Nochebuena'
};
function getOutfit() {
  try { return { ...DEFAULT_OUTFIT, ...JSON.parse(localStorage.getItem(OUTFIT_KEY) || '{}') }; }
  catch { return { ...DEFAULT_OUTFIT }; }
}
function saveOutfit(outfit) { localStorage.setItem(OUTFIT_KEY, JSON.stringify(outfit)); }
function getDone() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}
function setDone(day, letter) {
  const progress = getDone();
  progress[day] = letter || true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
}
function elfColors(outfit) {
  const hats = { Red:'#b91d35', Green:'#174d3a', Blue:'#3159a6', Gold:'#d9ad43' };
  const coats = { Green:'#1d7655', Red:'#a51d2d', Blue:'#3159a6', Gold:'#a58029' };
  const hair = { Blond:'#d9a15e', Brown:'#755139', Red:'#8d3d31', Black:'#302a29' };
  return { hat:hats[outfit.hat] || hats.Red, coat:coats[outfit.coat] || coats.Green, pants:hats[outfit.pants] || hats.Blue, hair:hair[outfit.hair] || hair.Blond };
}
function elfHTML() {
  const outfit = getOutfit();
  const colors = elfColors(outfit);
  const accessory = outfit.accessory === 'Schal' ? '<div class="elf-scarf"></div>' : outfit.accessory === 'Brille' ? '<div class="elf-glasses"></div>' : '';
  return `<div class="elf-card"><h2>${escapeHTML(outfit.name || 'Wichtel')}</h2><div class="elf" style="--hat:${colors.hat};--coat:${colors.coat};--pants:${colors.pants};--hair:${colors.hair}"><div class="elf-hat"></div><div class="elf-hair"></div><div class="elf-head"></div><div class="elf-coat"></div><div class="elf-pants"></div>${accessory}</div><p>${escapeHTML(outfit.accessory || 'Schal')}</p></div>`;
}
function renderOverview() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  const done = getDone();
  grid.innerHTML = '';
  for (let day = 1; day <= 24; day++) {
    const link = document.createElement('a');
    link.href = `days/${String(day).padStart(2, '0')}/`;
    link.className = `day-card${done[day] ? ' done' : ''}`;
    link.setAttribute('aria-label', `Tag ${day}${done[day] ? ', bestanden' : ''}`);
    link.textContent = day;
    grid.appendChild(link);
  }
  const preview = document.getElementById('elfPreview');
  if (preview) preview.innerHTML = elfHTML();
  const count = Object.keys(done).length;
  const counter = document.getElementById('completedCount');
  if (counter) counter.textContent = count;
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = `${count / 24 * 100}%`;
}
function initDay(day, puzzleMarkup) {
  const title = document.getElementById('dayTitle');
  if (title) title.textContent = `Tag ${day} – ${STORIES[day] || 'Wichtelprüfung'}`;
  const story = document.getElementById('storyText');
  if (story) story.innerHTML = `<div class="story"><strong>Prüfung ${day}: ${STORIES[day] || 'Wichtelprüfung'}</strong><p>Hilf ${escapeHTML(getOutfit().name || 'deinem Wichtel')} bei der Prüfung der Wichtelschule. Jede bestandene Aufgabe bringt ihn seiner ersten Geschenketour näher.</p></div>`;
  const preview = document.getElementById('miniElf');
  if (preview) preview.innerHTML = elfHTML();
  const puzzle = document.getElementById('puzzle');
  if (puzzle && puzzleMarkup) puzzle.innerHTML = puzzleMarkup;
}
function finishDay(day, letter, message = 'Prüfung bestanden!') {
  setDone(day, letter);
  const box = document.getElementById('letterBox');
  if (box) box.style.display = 'block';
  const letterEl = document.querySelector('.letter');
  if (letterEl && letter) letterEl.textContent = letter;
  const feedback = document.querySelector('.feedback');
  if (feedback) feedback.textContent = message;
}
