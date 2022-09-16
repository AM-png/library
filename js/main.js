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

    window.onclick = event => {
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

    // create oc where the book will be
    let oc = document.createElement('div')
    oc.style.cssText = "height: 270px; width: 115px; text-align: center; padding-top: 10px"

    // create a book (card/section) where the book's info will be displayed
    let book = document.createElement('section')
    book.style.cssText = `text-align: center; background: ${(new Date().getSeconds() > 50 ? 'brown' : new Date().getSeconds() > 40 ? '#120b3f' : new Date().getSeconds() > 30 ? '#075822' : new Date().getSeconds() > 20 ? "#0a594c" : new Date().getSeconds() > 10 ? '#45194a' : 'coral')}; height: 230px; width: 115px; padding: 40px 0 5px 0; margin: 0 0 0 0; border: 1px solid white; border-radius: 10px; display: flex; flex-wrap: wrap; flex-direction: column-reverse; justify-content: space-between; align-items: center;`

    // create a button that changes read status
    let status = document.createElement('button')
    status.classList.add("read")
    status.textContent = `${read ? "Read" : "Not Read"}`
    status.style.cssText = "color: white; margin: 0; padding: 5px; background: transparent; border: 0;"

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

    // create author element to be displayed in the book section
    let bookAuthor = document.createElement('p')
    bookAuthor.innerHTML = author
    bookAuthor.style.cssText = "color: white; display: flex; flex-wrap: wrap; border-top: 1px solid white; padding-top: 5px"

    // create a button that deletes the section
    let remove = document.createElement('button')
    remove.classList.add('remove')
    remove.textContent = "X"
    remove.style.cssText = "color: white; font-size: large; padding: 5px; border: none; background: transparent"

    // give the remove button the ability to remove the book from bookshelf and myLibrary array
    remove.addEventListener('click', removeBook)
    
    function removeBook() {
        oc.remove()
        myLibrary = myLibrary.filter(item => item.title !== title)
        return myLibrary
    }

    // create book element (title) to be displayed in the book section
    let bookInfo = document.createElement('p')
    bookInfo.innerHTML = title
    bookInfo.style.cssText = "color: white; display: flex; flex-wrap: wrap; transform: rotate(-90deg)"

    // append author to book
    book.appendChild(bookAuthor)

    // append bookInfo to book
    book.appendChild(bookInfo)

    // append delete button to book
    oc.appendChild(remove)

    // append book to oc
    oc.appendChild(book)

    // append status button to book
    oc.appendChild(status)

    // append oc to main
    document.querySelector('.row').appendChild(oc)

    // save the book in localStorage
    localStorage.setItem(`${title} by ${author}`, `pages: ${pages}, read: ${read}`)

    // reset the form and hide the modal when the submit button is clicked
    document.querySelector('.modal-box').reset()
    modal.style.display = "none"
}