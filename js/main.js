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

document.querySelector('.add').addEventListener('click', openModal = () => {
    modal.style.display = "block"

    window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
})

submit.addEventListener('click', addBookToLibrary)

function addBookToLibrary() {
    let title = document.querySelector('.title').value
    let author = document.querySelector('.author').value
    let pages = document.querySelector('.pages').value
    let read = document.querySelector('.check').checked

    // create Book object and add it to myLibrary array
    myLibrary.push(new Book(title,author,pages,read))
    
    // save the book in localStorage
    localStorage.setItem(`${title} by ${author}`, `pages: ${pages}, read: ${read}`)

    // create book element to be displayed on the main page
    let book = document.createElement('p')
    book.textContent = title

    document.querySelector('main').appendChild(book)

    // reset the form and hide the modal when the submit button is clicked
    document.querySelector('.modal-box').reset()
    modal.style.display = "none"
}

