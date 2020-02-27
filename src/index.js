//var newsapi=import('/newsapi');

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Get search
  const searchTerm = searchInput.value;
  // Check for input
  if (searchTerm == '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }
  // Clear field
  searchInput.value = '';

  // Search news
    
  /*newsapi.search(searchTerm, searchLimit, sortBy)
    .then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      // Check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
     output += `
      <div class="card mb-2">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateString(post.selftext, 100)}</p>
        <a href="${post.url}" target="_blank
        " class="btn btn-primary">Read More</a>
        <hr>
        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
        <span class="badge badge-dark">Score: ${post.score}</span>
      </div>
     </div>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
    });*/
    
  /*function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById('authors');
  const url = 'https://randomuser.me/api/?results=10';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let authors = data.results;
    return authors.map(function(author) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = author.picture.medium;
      span.innerHTML = `${author.name.first} ${author.name.last}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });  */ 



  e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Truncate String Function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}

//API CALL


async function fetchUsers(searchTerm, searchLimit, sortBy){
    //RETURNS PROMISES
    let url=`http://newsapi.org/v2/everything?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}&apiKey=171ab48f8a894889a3327230563b9593`;
    //const res= await fetch(`http://newsapi.org/v2/everything?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}&apiKey=171ab48f8a894889a3327230563b9593`);
    const res=await fetch(url);
    const data=await res.json();
    console.log(data);

    document.getElementById("container").innerHTML=`
    ${data.article.map(function(post){
      //NEWSCARD
      return`
      <ul id="news-article" style="list-style-type:none;">
        <li class="article">
          <div class="card mb-2">
            <img class="article-image" class="card-img-top" src="${post.urlToimage}" alt="Card image cap">
            <div class="card-body">
              <h2 class="article-title" class="card-title">${post.title}</h2>
              <p class="article-description" class="card-text">${truncateString(post.selftext, 100)}</p>
              <a class="article-link" href="${post.url}" target="_blank
              " class="btn btn-primary">Read More</a>
              <hr>
              <span class="article-author" class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
              <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
          </div>
        </li>
      </ul>
      `
    }
     .join('') 
      )}
    
    `
}
    
fetchUsers();
