const searchBook = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResultDetails(data.docs))

}



const showSearchResultDetails = (docs) => {
    const showResult = document.getElementById('searchDetails');
    //clear data
    showResult.textContent = '';
    //books found
    if (docs.length == 0) {
        const lengthDiv = document.getElementById('booklength');
        lengthDiv.innerHTML = `
        <h3  style="color: red; text-align: center;">${docs.length} books found</h3>
        `;

    } else if (docs.length != 0) {
        const lengthDiv = document.getElementById('booklength');
        lengthDiv.innerHTML = `
        <h3  style="color: green; text-align: center;">${docs.length} books found</h3>
        `;
    }
    //forEach abd dynamic html
    docs.forEach(doc => {
        console.log(doc)
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        const url = ` https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`


        createDiv.innerHTML = `
        <div class="card">
                <img src="${url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${doc.title}</h5>
                    <h6>Author: ${doc.author_name ? doc.author_name:'Author Name is Missing'}</h6>
                    <h6>First Pulblication Year: ${doc.first_publish_year}</h6>
                    
                </div>
            </div>
            `;
        showResult.appendChild(createDiv);
    })

}