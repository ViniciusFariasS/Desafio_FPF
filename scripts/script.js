document.addEventListener('DOMContentLoaded', function () {
  const toggleMenuBtn = document.getElementById('toggleMenu');
  const nav = document.querySelector('nav');
  const navList = document.getElementById('nav-list');
  const navItem = document.getElementById('nav-item');
  const navItemMore = document.getElementById('nav-item-more');
  const mainContentContent = document.getElementById('mainContent-content');
  let people = [];
  const content = document.getElementById('content');
  const more = document.getElementById('more');
  const modal = document.getElementById('personInfoModal');

  toggleMenuBtn.addEventListener('click', function () {
    nav?.classList.toggle('hidden');
    mainContentContent?.classList.toggle('mainContent-content--fullWidth');
    more?.classList.toggle('mainContent-content--fullWidth');
    navList?.classList.toggle('noShow');
    navItemMore?.classList.toggle('noShowMobile');
    navItem?.classList.toggle('noShowMobile');
  });

  navItem.addEventListener('click', function () {
    navItem.classList.toggle('active');
    mainContentContent.style.display = 'flex';
    more.style.display = 'none';
    if (navItemMore.classList.contains('active')) {
      navItemMore.classList.toggle('active');
    }
  })

  navItemMore.addEventListener('click', function () {
    mainContentContent.style.display = 'none';
    more.style.display = 'flex';
    navItemMore.classList.toggle('active');
    if (navItem.classList.contains('active')) {
      navItem.classList.toggle('active');

    }
  })

  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
      people = data;
      data.forEach(person => {
        createPersonCard(person);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os dados:', error)
    });

  function closeModal() {
    const modalContent = document.getElementById('modalContent');
    modal.removeChild(modalContent);
    modal.classList.remove('showModal');
  }

  function getModalInfo(cpf) {
    modal.classList.add('showModal');
    const person = people.find((p) => p?.cpf?.replaceAll('.', '').replace('-', '') === cpf.toString());
    const modalContent = document.createElement('div');
    const closeModal = document.createElement('div');
    closeModal.innerHTML = `    
        <button class="close" onclick="closeModal()">
          &times;          
        </button>
      </div>
    `
    modalContent.id = 'modalContent';
    modalContent.classList.add('modalContent');

    const img = document.createElement('img');
    img.src = person.foto;
    img.alt = person.nome;

    const fullDetails = document.createElement('div');
    fullDetails.classList.add('modal-details');

    fullDetails.innerHTML = `
        <h2>${person.nome}</h2>
        <span><strong>Data de Nascimento:</strong> ${person.data_nascimento}</span>
        <span><strong>Idade:</strong> ${person.idade}</span>
        <span><strong>Gênero:</strong> ${person.genero}</span>
        <span><strong>CPF:</strong> ${person.cpf}</span>
        <span><strong>E-mail:</strong> ${person.email}</span>
        <span><strong>Telefone:</strong> ${person.telefone}</span>
        <span><strong>Endereço:</strong> ${person.endereco}</span>
        <span><strong>Status:</strong> ${person.status}</span>
      `;

    const seeMore = document.createElement('div');
    seeMore.classList.add('seeMore');
    seeMore.innerHTML = `<button onclick="getModalInfo(${person.cpf.replaceAll('.', '').replace('-', '')})">Ver Cadastro Completo</button>`;

    modalContent.appendChild(img);
    modalContent.appendChild(fullDetails);
    modalContent.appendChild(closeModal);
    modal.appendChild(modalContent);
  }

  function createPersonCard(person) {
    const card = document.createElement('card');
    card.classList.add('card')
    const cardContent = document.createElement('div');
    cardContent.classList.add('cardContent');

    const details = document.createElement('div');
    details.classList.add('details');
    const img = document.createElement('img');
    img.src = person.foto;
    img.alt = person.nome;
    const nameAndAge = document.createElement('div');
    nameAndAge.classList.add('name-age')
    nameAndAge.innerHTML = ` 
      <div class='name-age-content'> 
        <strong>Data de Nascimento</strong>
        <span>${person.data_nascimento}</span>
      </div>
      <div class='name-age-content'>
        <strong>Idade</strong> 
        <span>${person.idade} anos</span>
      </div>
    `;

    details.appendChild(img);
    details.appendChild(nameAndAge);

    const fullDetails = document.createElement('div');
    fullDetails.classList.add('full-details');

    fullDetails.innerHTML = `
        <h2>${person.nome}</h2>
        <span><strong>CPF:</strong> ${person.cpf}</span>
        <span><strong>E-mail:</strong> ${person.email}</span>
        <span><strong>Telefone:</strong> ${person.telefone}</span>
        <span><strong>Endereço:</strong> ${person.endereco}</span>
        <span><strong>Status:</strong> ${person.status}</span>
      `;

    const seeMore = document.createElement('div');
    seeMore.classList.add('seeMore');
    seeMore.innerHTML = `    
    <button onclick="getModalInfo(${person.cpf.replaceAll('.', '').replace('-', '')})">Ver Cadastro Completo</button>
  `;

    cardContent.appendChild(details);
    cardContent.appendChild(fullDetails);
    card.appendChild(cardContent);
    card.appendChild(seeMore);
    content.appendChild(card);
  }

  window.getModalInfo = getModalInfo;
  window.closeModal = closeModal;

  const addModal = document.getElementById('addPersonModal');
  const modalCloseBtn = addModal.querySelector('.close');
  const personForm = document.getElementById('personForm');

  const addPersonBtn = document.getElementById('addPersonBtn');
  addPersonBtn.addEventListener('click', function () {
    addModal.style.display = 'block';
  });

  modalCloseBtn.addEventListener('click', function () {
    addModal.style.display = 'none';
    resetForm(personForm);
  });

  personForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm(personForm)) {
      addModal.style.display = 'none';
      resetForm(personForm);
      alert('Cadastro efetuado com sucesso!')
    } else {
      console.log('Formulário inválido. Corrija os campos destacados.');
    }
  });
});

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    if (input.checkValidity() === false) {
      isValid = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
  return isValid;
}

function resetForm(form) {
  form.reset();
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.classList.remove('invalid');
  });
}
