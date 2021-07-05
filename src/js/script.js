{
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BooksList {
    constructor(book) {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.rating = dataSource.books[book].rating;
      thisBooksList.initData(book);
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }
  
    getElements() {
      const thisBooksList = this;
    
      thisBooksList.dom = {};
      thisBooksList.dom.booksList = document.querySelector('.books-list');
      thisBooksList.dom.filtersForm = document.querySelector('.filters form');
      thisBooksList.dom.fillBar = thisBooksList.element.querySelector('.book__rating__fill');
    }
  
    initData(book) {
      const thisBooksList = this;
      this.data = dataSource.books;

      const generatedHTML = templates.bookTemplate(this.data[book]);
      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector('.books-list');
      booksContainer.appendChild(thisBooksList.element);
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
        if(!book.details[value] && thisBooksList.filters.includes(value)){
          const targetBook = document.querySelector('[data-id="' + book.id + '"]');
          targetBook.classList.add('hidden');
        }
        else if(!book.details[value] && !thisBooksList.filters.includes(value)){
          const targetBook = document.querySelector('[data-id="' + book.id + '"]');
          targetBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(){
      const thisBooksList = this;

      if(thisBooksList.rating < 6){
        thisBooksList.dom.fillBar.style.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (thisBooksList.rating > 6 && thisBooksList.rating <= 8){
        thisBooksList.dom.fillBar.style.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (thisBooksList.rating > 8 && thisBooksList.rating <= 9){     
        thisBooksList.dom.fillBar.style.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (thisBooksList.rating > 9){     
        thisBooksList.dom.fillBar.style.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      thisBooksList.dom.fillBar.style.width = '' + (thisBooksList.rating * 10) + '%';
    }
  }

  for(let book in dataSource.books){
    const app = new BooksList(book);
  }

}