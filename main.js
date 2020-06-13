//get reference to submit button and add event to it
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//function for saving bookmark
function saveBookmark(event) {

  event.preventDefault();

  //get value of website name input
  let siteName = document.getElementById('siteName').value;

  //get value of website url input
  let siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false
  }

  //creating the object of name and url
  let bookmark = {
    name: siteName,
    url: siteUrl
  }

  //if bookmark is empty
  if (localStorage.getItem('bookmarks') === null) {

    //setting an empty array
    let bookmarks = [];

    //add object to the array
    bookmarks.push(bookmark);

    //set the bookmark into localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } else { //if items are already int the local storage 

    //get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //add bookmark to array
    bookmarks.push(bookmark);

    //reset it back to local storage 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  }

  //clear form
  document.getElementById('myForm').reset();

  //refetch the bookmarks
  fetchBookmarks();
}

//function for delete
function deleteBookmark(url) {

  //get items from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //loop through the bookmarks 
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }

  //resetting the localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //refetch bookmarks
  fetchBookmarks();
}

//function for fetching the items from localStorage
function fetchBookmarks() {

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get output id
  let bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">' +
      '<h4>' + name +
      ' <a class="btn btn-primary btn-sm" target="_blank" href="' + url + '">Visit</a>' +
      '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger btn-sm"  href="#">Delete</a>' +
      '</h4>' +
      '</div>';
  }
}

//form validation
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  let regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use valid url');
    return false;
  }

  return true;
}