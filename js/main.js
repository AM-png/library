let modal = document.querySelector('.modal')
let submit = document.querySelector('.submit')

let myLibrary = []

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

document.querySelector('.add').addEventListener('click', openModal)

function openModal() {
    modal.style.display = "block"
}

window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

submit.addEventListener('click', addBookToLibrary)

function addBookToLibrary() {
    let title = document.querySelector('.title')
    title = title.value
    localStorage.setItem('title',title)

    let p = document.createElement('p')
    p.textContent = title
    document.querySelector('main').appendChild(p)

    modal.style.display = "none"
}

