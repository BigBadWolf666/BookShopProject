<template>
  <div class="no-link-page">
    <div class="content">
      <img src="/src/assets/cosmonaut.jpeg" alt="Ссылка не доступна" class="no-link-image" />
      <h1>Приносим извинения, но ссылка не доступна</h1>
      <p>К сожалению, у этой книги нет доступной ссылки для просмотра. Пожалуйста, попробуйте позже или выберите другую книгу.</p>
      <router-link to="/main" class="btn btn-primary">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<style>
.no-link-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
}

.content {
  max-width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.no-link-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  color: #333333;
  margin-bottom: 15px;
}

p {
  color: #666666;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>

