<script>
import axios from 'axios';
export default {
data(){
return {
    books:[],
    author: '',
country: '',
imageLink: '',
language: '',
link: '',
pages: '',
title: '',
year: '',
isRead: '',
search:'',
sort:null,
};
}, 
methods: {
async loadBooks(){
let response = await axios.get('/main',{params:{title: this.search, sort: this.sort}});
this.books = response.data;
},
async BookisReaded(bookId) {
  let response = await axios.put('/main', { id: bookId });
  this.loadBooks();
},
async UnReadedBook(bookId) {
  let response = await axios.put('/main', {id: bookId});
  this.loadBooks();
},

},
mounted () {
this.loadBooks();
}
};
</script>


<template>
  <main class="">
    <nav class="navbar bg-body-tertiary mb-3" >
  <div class="container">
    <form class="d-flex align-items-center" role="search" @submit.prevent="loadBooks()">
      <input class="form-control me-2" type="search" placeholder="Введите название" aria-label="Search" v-model="search">
      <button class="btn btn-outline-success" type="submit">Поиск</button>
         <!-- стрелка вверх -->
        <div class="d-flex ms-3"> 
         <input value="1" type="radio" class="btn-check" id="sort-up" autocomplete="off" v-model="sort" @change="loadBooks()">
                    <label class="btn btn-outline-secondary m-1" for="sort-up">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                      </svg>
                    </label>

                    <!-- стрелка вниз -->
                    <input value="-1" type="radio" class="btn-check" id="sort-down" autocomplete="off" v-model="sort" @change="loadBooks()">
                    <label class="btn btn-outline-secondary m-1" for="sort-down">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                      </svg>
                    </label>
        </div>
    </form>
  </div>
</nav>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
      <div class="col" v-for="book in books"> <!-- Добавьте класс col для правильного размещения -->
        <div class="card" style="width: 300px;">
          <img :src="'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + book.imageLink" class="card-img-top" alt="..." style="width: 100%; height: 200px; object-fit: contain;" v-if="!book.isMine">
          <img :src="book.imageLink" class="card-img-top" alt="..." style="width: 100%; height: 200px; object-fit: contain;" v-else>
      <div class="card-body" style="height: 250px">
        <h5 class="card-title mb-3" v-if="book.link"> <a :href="book.link" target="_blank" > {{ book.title }} </a></h5> <!-- Уменьшаем нижний отступ -->
        <h5 class="card-title mb-3" v-else> <RouterLink to="/sorry"> {{ book.title }} </RouterLink> </h5> <!-- Уменьшаем нижний отступ -->
            <p class="card-text mb-1">Автор: <span style="font-weight: 600; font">{{ book.author }}</span></p> <!-- Уменьшаем нижний отступ -->
            <p class="card-text mb-1" v-if="book.year > 0">Год выпуска: {{ book.year }} г.</p> <!-- Уменьшаем нижний отступ -->
            <p class="card-text mb-1" v-else>Год выпуска: {{ -book.year  }} г. до н. э.</p> <!-- Может быть можно иначе, но я пока не придумал -->
            <p class="card-text mb-2">Страна: {{ book.country }}</p> <!-- Убираем нижний отступ -->
            <p class="card-text mb-2">Язык: {{ book.language }}</p> <!-- Убираем нижний отступ -->
            <p class="card-text mb-2">Кол-во страниц: {{ book.pages }}</p> <!-- Убираем нижний отступ -->
            <div> 
              <button type="button" class="btn btn-outline-success btn-sm mb-2" v-if="!book.isRead" @click="BookisReaded(book._id)">Прочитал</button>
            <span class="badge bg-success" v-if="book.isRead" @click="UnReadedBook(book._id)">Прочитано</span>
            </div>
            <div>
              <span class="badge bg-primary" v-if="book.isMine">Моя книга</span>
             </div>
          <div class="form-check">

          </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</main>

</template>

<style>
a {
  cursor: pointer;
}

.card-img-top {
  object-fit: cover;
  height: 200px;
}

.card-body {
  height: 200px;
  overflow-y: scroll;
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.home {
  border-color: lightskyblue;
}

.clothes {
  border-color: pink;
}

.food {
  border-color: lightgreen;
}
.badge {
  cursor: pointer; /*изменяем курсор на руку */
}
.badge:hover {
  transition: 0.3s;
  transform: scale(1.1);
}
</style>
