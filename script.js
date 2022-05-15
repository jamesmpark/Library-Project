// User Interface
const addBookBtn = document.getElementById('addBookBtn');
const addBookForm = document.getElementById('addBookForm');
const booksGrid = document.querySelector('.grid');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn-close-modal');
const btnsOpenModal = document.querySelector('.btn-show-modal');
const addBtn = document.querySelector('#addBtn');
const bookCard = document.querySelector('.book-card');

// Archeticture
let myLibrary = [];
let newBook;

// Book Constructor
class Book {
  constructor(title, author, numPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary() {
  // Selecting form input values for book object
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const numPages = document.getElementById('numPages').value;
  const isRead = document.getElementById('read').checked;
  const form = document.getElementById('addBookForm');

  // creates a new Book object and is pushed into
  // myLibrary array based on input values
  newBook = new Book(title, author, numPages, isRead);
  myLibrary.push(newBook);

  // other function calls after submitting
  // resets the modal form upon submitting
  form.reset();
  // closes modal
  closeModal();
  // puts data into local storage
  setLocalStorage();
  console.log(myLibrary);
  render();
}

// renders each book object with for loop
function render() {
  const display = document.querySelector('.grid');
  const bookCard = document.querySelectorAll('.book-card');
  bookCard.forEach(book => display.removeChild(book));

  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
}

// render bookCard
function createBook(item) {
  const grid = document.querySelector('.grid');
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const numPages = document.createElement('p');
  const buttonGroup = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  buttonGroup.classList.add('btn-group');
  bookCard.setAttribute('id', myLibrary.indexOf(item));

  title.textContent = item.title;
  title.classList.add('title');
  bookCard.appendChild(title);

  author.textContent = `by ${item.author}`;
  author.classList.add('author');
  bookCard.appendChild(author);

  numPages.textContent = `${item.numPages} pages`;
  numPages.classList.add('pages');
  bookCard.appendChild(numPages);

  readBtn.classList.add('btn');
  removeBtn.classList.add('remove');
  removeBtn.textContent = 'Remove';
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);

  if (item.readStatus === false) {
    readBtn.textContent = 'Unread';
    readBtn.classList.add('btn-light-red');
  } else {
    readBtn.textContent = 'Read';
    readBtn.classList.add('btn-light-green');
  }

  // Toggle readStatus to read or unread and update storage
  readBtn.addEventListener('click', function () {
    console.log('btn pressed');
    if ((item.readStatus = !item.readStatus)) {
      readBtn.textContent = 'Unread';
      readBtn.classList.add('btn-light-red');
    }
    // updating localStorage when readStatus is changed
    setLocalStorage();
    render();
  });

  // remove bookCard when remove btn is clicked
  removeBtn.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    setLocalStorage();
    render();
  });

  grid.appendChild(bookCard);
}

// Open Modal and display form
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// close Modal and removes form
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// event handler for adding books
addBtn.addEventListener('click', addBookToLibrary);

// event handler for opening modal form
btnsOpenModal.addEventListener('click', openModal);

// event handlers for closing modal form
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// closing with escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
Local Storage API

localStorage API is used because this project is 
not data intensive

Do not use localStorage to store large amounts of 
data due to performance issues
*/

function setLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem('myLibrary');
    objects = JSON.parse(objects);
    myLibrary = objects;
    render();
  }
}

restore();
