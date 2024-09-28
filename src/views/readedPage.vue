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
};
}, 
methods: {
async loadBooks(){
let response = await axios.get('/readed');
this.books = response.data;
},
},
mounted () {
this.loadBooks();
}
};
</script>


<template>
  <main>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
      <div class="col" v-for="book in books"> <!-- Добавьте класс col для правильного размещения -->
        <div class="card" style="width: 300px;">
          <img :src="'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + book.imageLink" class="card-img-top" alt="..." style="width: 100%; height: 200px; object-fit: contain;">
      <div class="card-body" >
        <h5 class="card-title mb-3"> <span class=""> {{ book.title }} </span></h5> <!-- Уменьшаем нижний отступ -->
            <p class="card-text mb-1">Автор: <span style="font-weight: 600; font">{{ book.author }}</span></p> <!-- Уменьшаем нижний отступ -->
            <p class="card-text mb-1">Год выпуска: {{ book.year }} г.</p> <!-- Уменьшаем нижний отступ -->
            <p class="card-text mb-0">Кол-во страниц: {{ book.pages }}</p> <!-- Убираем нижний отступ -->
            <div> 
            <span class="badge bg-success" v-if="book.isRead" @click="UnReadedBook(book._id)">Прочитано</span>
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
</style>