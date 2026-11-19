// Tag 1: animierter Elf aus der hochgeladenen PNG-Datei.
const elfImageUrl = '../../elf-2026.PNG';

initDay(1, `
  <section class="elf-dressing-room">
    <h2>Richte deinen Wichtel für die Schule ein</h2>
    <p>Wähle die Kleidung aus und beobachte, wie dein Wichtel darauf reagiert.</p>

    <div class="elf-stage-wrap">
      <div id="elfStage" class="elf-stage" aria-label="Animierter Wichtel">
        <img class="elf-photo" src="${elfImageUrl}" alt="Dein kleiner Wichtel">
        <span class="motion-sparkle sparkle-one">✦</span>
        <span class="motion-sparkle sparkle-two">✦</span>
      </div>
      <div class="mood-buttons" aria-label="Elf zeigt eine Emotion">
        <button type="button" data-mood="happy">😄 Gefällt mir</button>
        <button type="button" data-mood="smile">🙂 Möcht ich behalten</button>
        <button type="button" data-mood="neutral">😐 Neutral</button>
        <button type="button" data-mood="grumpy">😠 Gefällt mir nicht</button>
      </div>
      <p id="elfReaction" class="elf-reaction" aria-live="polite">So sieht dein Wichtel jetzt aus.</p>
    </div>

    <div class="customizer-grid">
      <label>Name des Wichtels
        <input id="elfName" maxlength="24" autocomplete="off" placeholder="Wichtelname">
      </label>
      <label>Mützenfarbe
        <select id="elfHat"><option value="Red">Rot</option><option value="Green">Grün</option><option value="Blue">Blau</option><option value="Gold">Gold</option></select>
      </label>
      <label>Jackenfarbe
        <select id="elfCoat"><option value="Green">Grün</option><option value="Red">Rot</option><option value="Blue">Blau</option><option value="Gold">Gold</option></select>
      </label>
      <label>Hosenfarbe
        <select id="elfPants"><option value="Blue">Blau</option><option value="Red">Rot</option><option value="Green">Grün</option><option value="Gold">Gold</option></select>
      </label>
      <label>Zubehör
        <select id="elfAccessory"><option value="Schal">Schal</option><option value="Brille">Brille</option><option value="Rucksack">Rucksack</option><option value="Glocke">Glocke</option></select>
      </label>
    </div>

    <button id="saveElf" class="btn" type="button">Uniform speichern und Prüfung bestehen</button>
  </section>
`);

const outfit = getOutfit();
const fields = {
  elfName: outfit.name,
  elfHat: outfit.hat,
  elfCoat: outfit.coat,
  elfPants: outfit.pants,
  elfAccessory: outfit.accessory
};
for (const [id, value] of Object.entries(fields)) {
  const field = document.getElementById(id);
  if (field) field.value = value;
}

const stage = document.getElementById('elfStage');
const reaction = document.getElementById('elfReaction');
const moodMessages = {
  happy: 'Hurra! Das gefällt dem Wichtel richtig gut!',
  smile: 'Der Wichtel lächelt zufrieden.',
  neutral: 'Der Wichtel wartet erst einmal ab.',
  grumpy: 'Oh — das findet er wohl gar nicht schön.'
};

function setMood(mood) {
  stage.dataset.mood = mood;
  stage.classList.remove('elf-reaction-jump');
  void stage.offsetWidth;
  stage.classList.add('elf-reaction-jump');
  reaction.textContent = moodMessages[mood];
}

document.querySelectorAll('[data-mood]').forEach(button => {
  button.addEventListener('click', () => setMood(button.dataset.mood));
});

function previewReaction() {
  const value = document.activeElement && document.activeElement.value;
  setMood(value === 'Gold' || value === 'Schal' ? 'happy' : 'neutral');
}

['elfHat', 'elfCoat', 'elfPants', 'elfAccessory'].forEach(id => {
  const field = document.getElementById(id);
  if (field) field.addEventListener('change', previewReaction);
});

document.getElementById('saveElf').addEventListener('click', () => {
  const nextOutfit = {
    name: document.getElementById('elfName').value.trim() || 'Wichtel',
    hat: document.getElementById('elfHat').value,
    coat: document.getElementById('elfCoat').value,
    pants: document.getElementById('elfPants').value,
    accessory: document.getElementById('elfAccessory').value,
    hair: outfit.hair
  };
  saveOutfit(nextOutfit);
  setMood('happy');
  finishDay(1, 'W', 'Die Uniform ist gespeichert. Willkommen in der Wichtelschule!');
});
