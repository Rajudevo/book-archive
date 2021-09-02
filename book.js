document.getElementById('error-message').style.display = 'none';

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const notFound = document.getElementById('not-found');
   
    const searchText = searchField.value ;
   //clear data
    searchField.value = '';
    notFound.innerText = '';

  document.getElementById('error-message').style.display = 'none';

    if(searchText === '' ){

      notFound.innerText = "Search input cann't be empty. please write a book name"
      
    }else{
      //load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))
     .catch(error => displayError(error));

     }

}

const displayError = error => {
  document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = docs => {
    
  
    const searchResult = document.getElementById('search-result');
     const notMatch = document.getElementById('not-match');
     const totalResult = document.getElementById('total-result');

    
      totalResult.innerText = `Total search result: ${docs.length}` 
     
    
     if(docs.length === 0){
      notMatch.innerText = "No result found";
      
    }
    else{
      notMatch.innerText = '';
    }

    searchResult.textContent = '' ;
    totalResult.textContent = '';

    docs.forEach(book => {

     
        const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

        
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        
          <div class="card h-100 text-center">
            <img src="${url} " class="card-img-top " alt="...">
            <div class="card-body">
            <h5 class="card-title">Book name: ${book.title}</h5>
              <h5 class="card-title">Author: ${book.author_name}</h5>
              <p class="card-text">Publish : ${book.publish_year}</p>
              <p class="card-text">Publisher: ${book.publisher}</p>
              <p class="card-text">1st publish year: ${book.first_publish_year}</p>
              
            </div>
          </div>
        
        `;

       

        searchResult.appendChild(div);
    })
}





