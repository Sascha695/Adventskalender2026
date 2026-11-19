// Rätsel für Tag 1: Wichtel einkleiden und Schul-Ausstattung wählen.
const dayOneMarkup = `<section><h2>Richte deinen Wichtel für die Schule ein</h2><p>Wähle die Uniform, einen Namen und ein Accessoire. Deine Auswahl wird in diesem Browser gespeichert und an den folgenden Tagen wieder angezeigt.</p><div class="customizer-grid"><label>Name des Wichtels<input id="elfName" maxlength="24" autocomplete="off"></label><label>Mützenfarbe<select id="elfHat"><option>Red</option><option>Green</option><option>Blue</option><option>Gold</option></select></label><label>Jackenfarbe<select id="elfCoat"><option>Green</option><option>Red</option><option>Blue</option><option>Gold</option></select></label><label>Hosenfarbe<select id="elfPants"><option>Blue</option><option>Red</option><option>Green</option><option>Gold</option></select></label><label>Haarfarbe<select id="elfHair"><option>Blond</option><option>Brown</option><option>Red</option><option>Black</option></select></label><label>Glücks-Accessoire<select id="elfAccessory"><option>Schal</option><option>Brille</option><option>Rucksack</option><option>Glocke</option></select></label></div><div class="controls"><button class="btn" id="saveElf" type="button">Uniform speichern und Prüfung bestehen</button></div></section>`;
initDay(1, dayOneMarkup);
const outfit = getOutfit();
document.getElementById('elfName').value = outfit.name;
for (const [id, key] of [['elfHat','hat'], ['elfCoat','coat'], ['elfPants','pants'], ['elfHair','hair'], ['elfAccessory','accessory']]) document.getElementById(id).value = outfit[key];
document.getElementById('saveElf').addEventListener('click', () => {
  saveOutfit({ name:document.getElementById('elfName').value.trim() || 'Wichtel', hat:document.getElementById('elfHat').value, coat:document.getElementById('elfCoat').value, pants:document.getElementById('elfPants').value, hair:document.getElementById('elfHair').value, accessory:document.getElementById('elfAccessory').value });
  document.getElementById('miniElf').innerHTML = elfHTML();
  finishDay(1, 'W', 'Die Uniform ist gespeichert. Willkommen in der Wichtelschule!');
});
