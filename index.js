let express = require('express');
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mainProject');

let BookSchema = new mongoose.Schema({
  author: String,
  country: String,
  imageLink: String,
  language: String,
  link: String,
  pages: Number,
  title: {
  type: String,
  required: true,
  unique: true,
  },
  year: Number,
  isRead: Boolean,
  isMine: Boolean,
});

let Book = mongoose.model('Book', BookSchema);
//Загрузим все книги на главной странице
app.get('/main', async function (req, res) {
     let title = req.query.title;
     let sort = Number(req.query.sort);
     if (sort) {
      console.log('Параметр sort передан:', sort);
  } else {
      console.log('Параметр sort не передан');
  }
    let search = {}; // объект настроек поиска
    let sorting = {}; // объект настроек сортировки
    if (title) {
      search.title = title;//Если клиент передаёт title, то мы внесём его в объект search для настройки поиска
    }if(sort){
      sorting.year = sort;
    }else{
      sorting.isRead = 1;
    }
    let data = await Book.find(search).sort(sorting)
    res.send(data);
  });
//Загрузим прочитанные книги
app.get('/readed', async function(req,res){
  let books = await Book.find({isRead:true,});
  res.send(books);
})
//Добавим книги в прочитанные или уберём из прочитанных
app.put('/main', async function (req,res){
  let id = req.body.id;
  let book = await Book.findOne({
    _id:id
  });
  if (!book.isRead){
    book.isRead = true;
  }else{
    book.isRead = false;
  }
  await book.save();
  res.send(book);
});
//Создадим книгу 
app.post('/my', async function(req,res){
 let title = req.body.title;
  let author =  req.body.author;
  let country = req.body.country;
  let  year = req.body.year;
  let language =req.body.language;
  let pages = req.body.pages;
  let imageLink =req.body.image;
  let  isMine = true;

  let existingBook = await Book.findOne({ title: title });
  if (existingBook) {
    return res.status(400).send({ message: "Книга с таким названием уже существует!" });
  }
  if (!title || !author || !country || !year || !language || !pages){
    res.sendStatus(400)
  }
  if(!imageLink){
    imageLink = "/src/assets/book icon.png"
    }

  let book = new Book({
    title: title,
    author: author,
    country: country,
    year: year,
    language: language,
    pages: pages,
    imageLink: imageLink,
    isMine: true,
  })
  try {
    await book.save()
    res.sendStatus(200);
}catch(err){
    res.sendStatus(400);
}
 
});
//Загрузим книги добавленные нами
app.get('/my', async function(req,res){
  let books = await Book.find({isMine:true,});
  res.send(books);
});
//Удалим книгу
app.delete('/my', async function (req,res){
  let id = req.query.id;
  await Book.deleteOne({_id: id});
  res.sendStatus(200);
})