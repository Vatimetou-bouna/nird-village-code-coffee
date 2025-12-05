const houses = document.querySelectorAll('.house .enter');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const badgesList = document.getElementById('badges');

const HOUSES = {
  linux: {
    title: 'Maison Linux',
    text: 'Installer Linux peut prolonger la vie des machines et donner autonomie aux équipes. Petit quiz : quel est un avantage principal du logiciel libre ?',
    question: {
      q: 'Quel est un avantage du logiciel libre ?',
      options: ['Coût élevé', 'Liberté d’étude et modification', 'Dépendance à un éditeur'],
      answer: 1
    },
    badge: 'Découvreur·se Libre'
  },
  materiel: {
    title: 'Recyclage & Matériel',
    text: 'Réparer, recycler et redonner vie aux postes : vrai ou faux ?',
    question: {
      q: 'Réparer un ordinateur est souvent :',
      options: ['Impossible', 'Souvent possible et moins cher', 'Toujours plus cher que remplacer'],
      answer: 1
    },
    badge: 'Réparateur·rice'
  },
  donnees: {
    title: 'Données souveraines',
    text: 'Garder les données dans l’UE renforce la protection. Petit quiz :',
    question: {
      q: 'Stocker localement est :',
      options: ['Plus sécurisé si bien géré', 'Toujours dangereux', 'Illégal'],
      answer: 0
    },
    badge: 'Gardien·ne des données'
  },
  sobriete: {
    title: 'Sobriété',
    text: 'Réduire la consommation numérique = actions concrètes.',
    question: {
      q: 'Une action de sobriété efficace :',
      options: ['Laisser tous les écrans allumés', 'Mettre en veille et optimiser', 'Installer plus d’apps'],
      answer: 1
    },
    badge: 'Sobriète·e'
  },
  formation: {
    title: 'Formation',
    text: 'Former les élèves est essentiel pour l’autonomie numérique.',
    question: {
      q: 'Former les élèves permet :',
      options: ['Rien', 'Accroître compétences et autonomie', 'Dépendre plus des éditeurs'],
      answer: 1
    },
    badge: 'Formateur·rice'
  }
};

function renderBadges(){
  const earned = JSON.parse(localStorage.getItem('nird_badges')||'[]');
  badgesList.innerHTML = '';
  if(earned.length===0){
    badgesList.innerHTML = '<li>Aucun badge gagné — commencez le parcours !</li>';
    return;
  }
  earned.forEach(b=>{
    const li = document.createElement('li');
    li.textContent = b;
    badgesList.appendChild(li);
  });
}

function openHouse(id){
  const data = HOUSES[id];
  modalContent.innerHTML = `<h2>${data.title}</h2><p>${data.text}</p>
    <div id="quiz">
      <p><strong>${data.question.q}</strong></p>
      <div id="options"></div>
    </div>`;
  const opts = document.getElementById('options');
  data.question.options.forEach((opt,i)=>{
    const b = document.createElement('button');
    b.textContent = opt;
    b.style.display='block';
    b.style.margin='8px 0';
    b.onclick = ()=> {
      const correct = i === data.question.answer;
      showResult(correct, data.badge);
    };
    opts.appendChild(b);
  });
  modal.classList.remove('hidden');
}

function showResult(correct, badge){
  modalContent.innerHTML = `<h3>${correct ? 'Bravo !' : 'Presque...'}</h3>
    <p>${correct ? 'Vous avez gagné le badge '+badge : 'Réessayez, puis validez à nouveau'}</p>
    <button id="closeResult">Fermer</button>`;
  document.getElementById('closeResult').onclick = ()=>{
    if(correct){
      const arr = JSON.parse(localStorage.getItem('nird_badges')||'[]');
      if(!arr.includes(badge)){ arr.push(badge); localStorage.setItem('nird_badges', JSON.stringify(arr)); }
      renderBadges();
    }
    modal.classList.add('hidden');
  };
}

houses.forEach(h=>{
  h.addEventListener('click', (e)=>{
    const id = e.target.closest('.house').dataset.id;
    openHouse(id);
  });
});

closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
renderBadges();
