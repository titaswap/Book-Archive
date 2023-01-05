// ------------------------------------------------------- Fetch Data-------------------------------------//
const getBook = async (query) => {
    await fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(res => res.json())
        .then(books => listBooks(books))
}
const searchButton = document.getElementById('searchBook');
const searchInput = document.getElementById('searchInput');
searchButton.addEventListener('click', () => {
    const clearResults = document.querySelectorAll('.bookLists .col');
    const resultSearching = document.querySelector('.search-result');
    resultSearching.innerText='Searching...'
    clearResults.forEach(book => book.remove())
    const query = searchInput.value;
    getBook(query)
})

// ------------------------------------------------------- Add books -------------------------------------//
const listBooks = (books) => {
    const searchResult = document.querySelector('.search-result');
    const bookLists = document.querySelector('.bookLists');
    if (books.numFound === 0) {
        searchResult.innerText = 'Result not found';
    }
    else {
        searchResult.innerText = books.numFound;
    }
    books.docs.forEach(book => {
        const creatLists = document.createElement('div')
        creatLists.className = 'col'
        creatLists.innerHTML = `
                    <div class="card h-75">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top cover_i  h-50" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${book.title}</h4>
                           <p class="card-text">
                                <small class="text-secondary">Author: <a class="author text-decoration-none text-dark">${book.author_name}</a></small>
                                <br>
                                <small class="text-secondary">First Publish Year: <a class="author text-decoration-none text-dark">${book.first_publish_year}</a></small>
                                <br>
                                <small class="text-secondary">publisher: <a class="author text-decoration-none text-dark">${book.publisher[0]}</a></small>
                            </p>
                        </div>
                    </div>
        `;
        bookLists.appendChild(creatLists)
    })
    
}