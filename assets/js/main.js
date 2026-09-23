// En-tête : devient opaque après le héros
const entete = document.querySelector('.entete');
const surHeros = entete && entete.dataset.transparent === 'oui';
function majEntete() {
  if (!surHeros) { entete.classList.add('plein'); return; }
  entete.classList.toggle('plein', window.scrollY > 60);
}

// Menu : surligne la partie de la page en cours de lecture
const liens = [...document.querySelectorAll('.nav a[href^="#"]')];
const pages = liens.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
let pageActive = null;
function majMenu() {
  // La partie active est la dernière dont le haut a passé le tiers de l'écran,
  // ou la dernière de toutes quand on est tout en bas.
  const ligne = window.innerHeight / 3;
  const enBas = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let active = pages[0];
  if (enBas) active = pages[pages.length - 1];
  else pages.forEach(p => { if (p.getBoundingClientRect().top <= ligne) active = p; });
  if (active === pageActive) return;
  pageActive = active;
  liens.forEach(a => {
    if (a.getAttribute('href') === '#' + active.id) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
}

let enAttente = false;
function auDefilement() {
  if (enAttente) return;
  enAttente = true;
  requestAnimationFrame(() => { majEntete(); majMenu(); enAttente = false; });
}
window.addEventListener('scroll', auDefilement, { passive: true });
window.addEventListener('resize', auDefilement);
majEntete();
majMenu();

// Menu mobile
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const ouvert = entete.classList.toggle('ouvert');
  burger.setAttribute('aria-expanded', ouvert);
  burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  entete.classList.remove('ouvert');
  burger.setAttribute('aria-expanded', false);
  burger.setAttribute('aria-label', 'Ouvrir le menu');
}));

// Formulaire de contact
const formulaire = document.getElementById('formulaire');
if (formulaire) {
  const objet = formulaire.querySelector('#f-objet');
  const statut = formulaire.querySelector('.formulaire__statut');
  const bouton = formulaire.querySelector('button[type="submit"]');

  // Les boutons « Réserver ma place », etc. pré-sélectionnent l'objet
  document.querySelectorAll('[data-objet]').forEach(a => a.addEventListener('click', () => {
    objet.value = a.dataset.objet;
    objet.classList.remove('champ-surligne');
    void objet.offsetWidth; // relance l'animation
    objet.classList.add('champ-surligne');
  }));

  // Envoi sans quitter la page
  formulaire.addEventListener('submit', async e => {
    e.preventDefault();
    bouton.disabled = true;
    statut.className = 'formulaire__statut';
    statut.textContent = 'Envoi en cours…';
    try {
      const rep = await fetch(formulaire.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(formulaire)
      });
      const res = await rep.json();
      if (!res.success) throw new Error(res.message);
      formulaire.reset();
      statut.classList.add('ok');
      statut.textContent = 'Merci, ton message est bien parti ! Je te réponds rapidement.';
    } catch {
      statut.classList.add('erreur');
      statut.textContent = 'Oups, l’envoi n’a pas fonctionné. Réessaie ou écris-moi directement à baphuc.truong@gmail.com.';
    } finally {
      bouton.disabled = false;
    }
  });
}

// Année du pied de page
document.querySelectorAll('[data-annee]').forEach(el => el.textContent = new Date().getFullYear());
