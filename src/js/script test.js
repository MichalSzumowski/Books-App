// 'use strict';
{
const templates = {
  bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

class BooksList {
  constructor(book) {
    const thisBooksList = this;

    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];
    thisBookslist.rating = dataSource.books[book].rating;
    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.initActions();
    thisBooksList.determineRatingBgc();
  }

  initData(book) {
    const thisBooksList = this;
    this.data = dataSource.books;

    const generatedHTML = thisBooksList.template(this.data[book]);
    thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
    thisBooksList.dom.booksList.appendChild(thisBooksList.element);
  }
  /*
    for(let book of this.data){
    
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;

      const ratingWidth = (book.rating / 10) * 100;
      book.ratingWidth = ratingWidth;

      const generatedHTML = thisBooksList.template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      

      const thisBookslist = this;
  
      const generatedHTML = templates.bookTemplate(dataSource.books[book]);
      thisBookslist.element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector('.books-list');
      booksContainer.appendChild(thisBookslist.element);
    }
*/
  
  getElements() {
    const thisBooksList = this;
    
    thisBooksList.dom = {};
    thisBooksList.dom.booksList = document.querySelector('.books-list');
    thisBooksList.dom.filtersForm = document.querySelector('.filters form');
    thisBooksList.dom.hiddenBook = document.querySelector('book__image[data-id="' + thisBooksList.book.id + '"]');
    thisBooksList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  }

  initActions() {
    const thisBooksList = this;

  
    thisBooksList.dom.booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const bookTarget = event.target.offsetParent;
      const dataId = bookTarget.getAttribute('data-id');

      if(bookTarget.classList.contains('book__image')){
        if(!(bookTarget.classList.contains('favorite'))){
          bookTarget.classList.add('favorite');

          thisBooksList.favoriteBooks.push(dataId);

        } else {
          bookTarget.classList.remove('favorite');
  
          const removedBook = thisBooksList.favoriteBooks.indexOf(dataId);
          
          thisBooksList.favoriteBooks.splice(removedBook, 1);
        }
      }
    });
    
    thisBooksList.dom.filtersForm.addEventListener('click', function(event){
      const target = event.target;
      if(target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter'){
        if(target.checked == true){
          thisBooksList.filters.push(target.value);
        } else {
          const removedFilter = thisBooksList.filters.indexOf(target.value);
          
          thisBooksList.filters.splice(removedFilter, 1);
        }

        thisBooksList.filterBooks(target.getAttribute('value'));
      }
    });
  }

  filterBooks(value) {
    const thisBooksList = this;

    for(let book of dataSource.books){
      if(!book.details[value] && thisBooksList.filtersArray.includes(value)){
        const targetBook = document.querySelector('[data-id="' + book.id + '"]');
        targetBook.classList.add('hidden');
      }
      else if(!book.details[value] && !thisBooksList.filtersArray.includes(value)){
        const targetBook = document.querySelector('[data-id="' + book.id + '"]');
        targetBook.classList.remove('hidden');
      }
    }
  }
/*
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      
      for(const filter of thisBooksList.filters){
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        } 
      }
      const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if(shouldBeHidden == true){
        hiddenBook.classList.add('hidden');
      } else {
        hiddenBook.classList.remove('hidden');
      }
    }
*/



  determineRatingBgc(){
    const thisBooksList = this;

    if(thisBooksList.rating < 6){
      thisBookslist.dom.fillBar.style.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (thisBooksList.rating > 6 && thisBooksList.rating <= 8){
      thisBookslist.dom.fillBar.style.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (thisBooksList.rating > 8 && thisBooksList.rating <= 9){     
      thisBookslist.dom.fillBar.style.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (thisBooksList.rating > 9){     
      thisBookslist.dom.fillBar.style.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}

for(let book in dataSource.books){
  const app = new Bookslist(book);
}

/*
{


  const select = {
    booksList: '.books-list',
    booksImage: '.book__image',
    filtersForm: '.filters form'
  };

  const templates = {
    Books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  
  const filters = [];

  
  
  function render(){
    for(let book of dataSource.books){
    
      const ratingBgc = determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;

      const ratingWidth = (book.rating / 10) * 100;
      book.ratingWidth = ratingWidth;

      const generatedHTML = templates.Books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      
      const booksList = document.querySelector(select.booksList);
      
      booksList.appendChild(generatedDOM);

    }
  }

  function initActions(){
    const booksList = document.querySelector(select.booksList);
    const favoriteBooks = [];
   
    booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const dataId = event.target.offsetParent.getAttribute('data-id');

      if(event.target.offsetParent.classList.contains('book__image')){
      
        if(!(event.target.offsetParent.classList.contains('favorite'))){
          event.target.offsetParent.classList.add('favorite');
    
          favoriteBooks.push(dataId);

        } else {
          event.target.offsetParent.classList.remove('favorite');
  
          const removedBook = favoriteBooks.indexOf(dataId);
          
          favoriteBooks.splice(removedBook, 1);
        }
      }
    });
    

    const filtersForm = document.querySelector(select.filtersForm);

    filtersForm.addEventListener('click', function(event){

      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        if(event.target.checked == true){
          filters.push(event.target.value);
        } else {
          const removedFilter = filters.indexOf(event.target.value);
          
          filters.splice(removedFilter, 1);
        }

        filterBooks();
      }
    });
  }

  function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      
      for(const filter of filters){
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        } 
      }
      const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if(shouldBeHidden == true){
        hiddenBook.classList.add('hidden');
      } else {
        hiddenBook.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    if(rating < 6){
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){     
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9){     
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
     



  render();
  initActions();
  filterBooks();
}*/