<script>
export default {
  data(){
    return {
      search:''
    }
  },
    methods:{
    goReaded(){
        this.$router.push({
        name:'readedPage'
        })
    },
    goMain(){
        this.$router.push({
        name:'mainPage'
        })
    },
    goMy(){
        this.$router.push({
          name: 'myPage'
        })
    }
    }
}
</script>
<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
    <div class="d-flex me-auto">
      <span class="fs-4" @click="goMain()" id="shop-title">BookShop</span>
      <span class="ms-3">
        <img src="C:\Users\Артем\Desktop\vue projects\итоговый проект\project-template\project-template\src\assets\book icon.png" style="width: 50px; height: 50px; object-fit: contain;">
      </span>
    </div>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mb-2 mb-lg-0 ms-4">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#" @click="goMain" :class="{
                    'active': $route.name === 'mainPage',
                    'inactive': $route.name != 'mainPage'
                }">Главная</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="goMy" :class="{
                    'active': $route.name === 'myPage'
                }">Мои книги</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="goReaded" :class="{
                    'active': $route.name === 'readedPage'
                }">Прочитано</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<style>
#shop-title{
  cursor: pointer;
}
</style>