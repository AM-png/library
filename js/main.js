let modal = document.querySelector('.modal')
let submit = document.querySelector('.submit')

let myLibrary = []

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.remove = function() {
        return document.querySelector('section').remove()
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

    // create a book (card/section) where the book's info will be displayed
    let book = document.createElement('section')
    book.style.cssText = "padding: 10px; border: 3px solid black; border-radius: 17px; display: flex; justify-content: space-between"

    // create a button that deletes the section
    let del = document.createElement('button')
    del.classList.add('del')
    del.textContent = "X"
    del.style.cssText = "border: none; background: transparent"

    // give the del button the ability to remove the book
    del.addEventListener('click', deleteBook)
    
    function deleteBook() {
        book.remove()
    }

    // create book element to be displayed in the book section
    let bookInfo = document.createElement('p')
    bookInfo.innerHTML = title

    // append bookInfo to book
    book.appendChild(bookInfo)

    // append delete button to book
    book.appendChild(del)

    // append book to main
    document.querySelector('main').appendChild(book)

    // create Book object and add it to myLibrary array
    myLibrary.push(new Book(title,author,pages,read))
    
    // save the book in localStorage
    localStorage.setItem(`${title} by ${author}`, `pages: ${pages}, read: ${read}`)

    // reset the form and hide the modal when the submit button is clicked
    document.querySelector('.modal-box').reset()
    modal.style.display = "none"
}