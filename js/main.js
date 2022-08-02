let modal = document.querySelector('.modal')
let submit = document.querySelector('.submit')

let myLibrary = []

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
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
    book.style.cssText = "padding: 10px; border: 3px solid black; border-radius: 17px; display: flex; justify-content: space-between; align-items: baseline"

    // create a button that changes read status
    let status = document.createElement('button')
    status.classList.add("read")
    status.textContent = `${read ? "Read" : "Not Read"}`
    status.style.cssText = "margin: 0"

    // give the status buton the ability to change the read status and textContent
    status.addEventListener('click', changeReadStatus)

    function changeReadStatus() {
        myLibrary.map(item => {
            if (item.title === title) {
                return item.read ? item.read = false : item.read = true
            }
        })
        this.textContent === 'Read' ? this.textContent = "Not Read" : this.textContent = "Read"
    }

    // create a button that deletes the section
    let remove = document.createElement('button')
    remove.classList.add('remove')
    remove.textContent = "X"
    remove.style.cssText = "font-size: large; padding: 5px; border: none; background: transparent"

    // give the remove button the ability to remove the book from bookshelf and myLibrary array
    remove.addEventListener('click', removeBook)
    
    function removeBook() {
        book.remove()
        myLibrary = myLibrary.filter(item => item.title !== title)
        return myLibrary
    }

    // create book element to be displayed in the book section
    let bookInfo = document.createElement('p')
    bookInfo.innerHTML = title

    // append bookInfo to book
    book.appendChild(bookInfo)

    // append status button to book
    book.appendChild(status)

    // append delete button to book
    book.appendChild(remove)

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