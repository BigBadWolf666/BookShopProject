<script>
import axios from 'axios';
export default {
data(){
return {
    books:[],
    title:'',
    author:'',
    country:'',
    year:'',
    pages:'',
    language:'',
    image:'',
    success: false,
    error: false,
}},
methods:{

async loadMyBooks(){
let response = await axios.get('/my');
this.books = response.data;
},

async addBook(){
try {
    let response = await axios.post('/my',{
    title: this.title,
    author: this.author,
    country:this.country,
    year: this.year,
    language: this.language,
    pages: this.pages,
    image:this.image,
    isMine: true,
});
    this.success = true;
    this.error = false;
    this.loadMyBooks();
}catch (err){
    this.error = true;
    this.success = false;
}
},

async deleteBook(id){
let response = await axios.delete('/my',{
params:{
    id: id,
}
});
this.loadMyBooks();
}, 
},
mounted (){
this.loadMyBooks();
}
}
</script>

<template>
<div class="container ms-5 mt-3">
    <div class="row">
        <div class="col-3">
            <form class="p-4 bg-light border rounded" @submit.prevent="addBook()">
                <div class="mb-3">
                    <label for="title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="title" v-model="title" placeholder="Капитанская дочка">
                </div>
                <div class="mb-3">
                    <label for="author" class="form-label">Автор</label>
                    <input type="text" class="form-control" id="author" v-model="author" placeholder="Пушкин А. С.">
                </div>
                <div class="mb-3">
                    <label for="country" class="form-label">Страна</label>
                    <input type="text" class="form-control" id="country" v-model="country" placeholder="Россия">
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Год выпуска</label>
                    <input type="number" class="form-control" id="year" v-model="year" placeholder="2023">
                </div>
                <div class="mb-3">
                    <label for="language" class="form-label">Язык</label>
                    <input type="text" class="form-control" id="language" v-model="language" placeholder="Русский">
                </div>
                <div class="mb-3">
                    <label for="pages" class="form-label">Кол-во страниц</label>
                    <input type="number" class="form-control" id="pages" v-model="pages" placeholder="320">
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Изображение</label>
                    <input type="url" class="form-control" id="image" v-model="image" placeholder="вставьте ссылку">
                </div>
                <button type="submit" class="btn btn-primary">Отправить</button>
                <div class="alert alert-danger mt-3" v-if="error">Произошла ошибка, попробуйте ещё раз</div>


                <div class="alert alert-primary mt-3" v-if="success">Книга успешно добавлена </div>
            </form>
        </div>
        <div class="col-9">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div class="col" v-for="book in books" :key="book.id">
                                <div class="card" style="height: 450px;">
                                    <img :src="book.imageLink" class="card-img-top" alt="..." style="width: 100%; height: 200px; object-fit: contain;">
                                    <div class="card-body">
                                        <h5 class="card-title mb-3"> <span>{{ book.title }}</span></h5>
                                        <p class="card-text mb-1">Автор: <span style="font-weight: 600;">{{ book.author }}</span></p>
                                        <p class="card-text mb-1">Год выпуска: {{ book.year }}</p>
                                        <p class="card-text mb-1">Страна: {{ book.country }}</p>
                                        <p class="card-text mb-1">Язык: {{ book.language }}</p>
                                        <p class="card-text mb-0">Кол-во страниц: {{ book.pages }}</p>
                                        <div>
                                            <span class="badge bg-primary" v-if="book.isMine">Моя книга</span>
                                        </div>
                                        <div class="mt-2"> 
                                            <button class="btn btn-outline-danger btn-sm" @click="deleteBook(book._id)"> Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</div>
      
     </div>
</template>


<style>

</style>