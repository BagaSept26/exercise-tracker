const express = require('express')
const app = express()
const cors = require('cors')

//body-parser
const bodyParser = require('body-parser');
//buat id unik
const {v4:uuidv4}= require('uuid');
const req = require('express/lib/request');
const res = require('express/lib/response');

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))

//membaca data dari form
app.use(bodyParser.urlencoded({extended:false}));
//inisialisasi penyimpanan data
let users = [];
let exercises =[];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//POST api user / utk buat user baru
app.post("/api/users",(req,res)=>{
  const username = req.body.username;

  //validasi username notnull
  if(!username){
    return res.status(400).json({error:"Username tidak boleh kosong"});
    };
  const newUser = {
    username:username,
    _id: uuidv4(),
  };
  users.push(newUser);
  res.json(newUser);
});

//GET api/users dari semua user
app.get('/api/users',(req,res)=>{
  res.json(users);
});

//POST /api/users/:_id/exercise utk menambah latihan
app.post('/api/users/:_id/exercises',(req,res)=>{
  const userId=req.params._id;
  const {description,duration,date}=req.body;

  //validasi input
  if(!description || !duration){
    return res.status(400).json({error:"Deskripsi dan durasi harus di isi"});
  }

  //cari users
  const user = users.find(user => user._id === userId);
  if(!user){
    return res.status(404).json({error:"User tidak ditemukan"});
  }

  //konversi durasi ke integer
  const durationInt = parseInt(duration, 10);
  if(isNaN(durationInt) ||  durationInt <= 0){
    return res.status({error:"Durasi harus berupa angka positif"});
  };
  //jika tgl tdk diberikan gunakan tanggal sekarang
  const exerciseDate = date ? new Date(date):new Date();

  //validasi jika tgl invalid
  if(isNaN(exerciseDate)){
    return res.status(400).json({error:"Format tidak valid"});
  }
  const newExercise = {
    description,
    duration: durationInt,
    date:exerciseDate.toDateString(),
    userId:userId,
  };
  exercises.push(newExercise);

  res.json({
    username: user.username,
    description:newExercise.description,
    duration:newExercise.duration,
    date:newExercise.date,
    _id:userId,
  });
});

//GET /api/users/:_id/logs utk dapatkan log user
app.get('/api/users/:_id/logs',(req,res)=>{
  const userId = req.params._id;
  const {from, to, limit} = req.query;

  //cari user
  const user = users.find(user => user._id === userId);
  if(!user){
    return res.status(404).json({error:"User tidak ditemukan"});
  }
  // filter latihan berdasarkan user ID
  let userExercises = exercises.filter(exercise => exercise.userId === userId);
  //filter latihan berdasarkan tanggal
  if(from){
    const fromDate = new Date(from);
    if(isNaN(fromDate)){
      return res.status(404).json({error:"format tanggal 'form' tidak valid"})
    }
    userExercises = userExercises.filter(exercise => new Date(exercise.date) >= fromDate);
  } 
  if(to){
    const toDate = new Date(to);
    if(isNaN(toDate)){
      return res.status(404).json({error:"format tanggal 'to' tidak valid"})
    }
    userExercises = userExercises.filter(exercise => new Date(exercise.date) <= toDate);
  }
  //batasi jumlah latihan
  const limitInt = limit ? parseInt(limit, 10):undefined;
  if (limitInt && !isNaN(limitInt)&&limitInt>0){
    userExercises = userExercises.slice(0,limitInt);
  }
  const log = userExercises.map(exercise=> ({
    description:exercise.description,
    duration:exercise.duration,
    date: exercise.date,
  }));
  res.json({
    username: user.username,
    count: log.length,
    _id: userId,
    log: log,
  });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
