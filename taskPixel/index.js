const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const mongoClient = new MongoClient('mongodb://localhost:27017',{userNewUrlParser : true});
const cors = require('cors');

const PORT = process.env.port || 8080;


app.use(cors());

//массива уникальных идентификаторов
let masIdentifications = [];
let generateID = ()=>{
  let obj = {
    rand (){
      return Math.floor(Math.random()*100000);
    }
  }
  let randomize = obj.rand();
  let bool = false;

  for(let i  = 0; i < masIdentifications.length; i++){
    if(randomize == masIdentifications[i]){
      bool = true;
      break;
    }
  }

  if(bool){
    return generateID();
  } else {
    masIdentifications.push(randomize);
    return randomize;
  }
  if(masIdentifications.length == 0){
    masIdentifications.push(randomize);
    return randomize;
  }
}

//СОЗДАНИЕ СТАТЕЙ

app.post("/articles", urlencodedParser, (req,res,next)=>{
  mongoClient.connect((err,client)=>{
    if(err){
      console.log("Error connect database");
    }
    let db = client.db("state");
    let collection = db.collection("states");
    //Генерация уникального ид and Проверка на уникальность идентификатора
    let randomize = generateID();

    let date = new Date();
    let article = {
      id: randomize,
      title: req.body.title,
      body: req.body.textarea,
      updated_at: date,
      created_at: date
    };

    collection.insert(article,(err,result)=>{
      if(err){
        console.log("Error Create Article in base");
        res.send().status(404);
      }
      res.redirect("http://localhost:8081/articles");
    });
  });
});

// РЕДАКТИРОВАНИЕ СТАТЕЙ ПО ИД
app.post('/articles/:id/edit', urlencodedParser, (req,res,next)=>{
  mongoClient.connect((err,client)=>{
    if(err){
      console.log("ERROR PUT CONNECT DB");
      res.send().status(404);
    }

    let db = client.db("state");
    let collection = db.collection("states");
    let dateNow = new Date();
    let objUpdate = {title: req.body.title, body: req.body.textarea, updated_at: dateNow};

    collection.updateOne({id: +(req.params.id)},{$set: objUpdate},(err,upResult)=>{
      if(err || upResult == null){
        console.log("DONT FIND. Update Crash!!");
        res.send().status(404);
      } else {
        res.redirect("http://localhost:8081/articles");
      }
    });
  });
});

//ПОЛУЧЕНИЕ СТАТЕЙ СОРТИРОВАННЫХ С ПАГИНАЦИЕЙ

app.get("/articles",(req,res,next)=>{
  mongoClient.connect((error, client)=>{
    if(error){
      console.log("Error connect DB");
      res.send().status(404);
    }

    let collection = client.db("state").collection("states");

    if (req.query.secretget == 'getall'){
      collection.find().toArray((err,results)=>{
        if(err){
          console.log("Err get all");
          res.send("Not Found").status(404);
        }
        let allData = results;
        allData.sort((a,b)=>{
          if (a.created_at < b.created_at) {
            return 1;
          }
          if (a.created_at > b.created_at) {
            return -1;
          }
          return 0;
        });
        res.send(allData);
      });
    } else {
      let allData = [];
      let page = 1;
      let limit = 10;

      if(req.query.page && typeof +(req.query.page) == "number"){
        page = Number(req.query.page);
      }
      if(req.query.limit && typeof +(req.query.limit) == "number" && +(req.query.limit) <= 10 && +(req.query.limit) >= 1){
        limit = +(req.query.limit)
      }

      collection.find().toArray((err, results)=>{
        if(err){
          console.log("ERROR get array data");
          res.send("Not Found").status(404);
        }
        allData = results;
        allData.sort((a,b)=>{
          if (a.created_at < b.created_at) {
            return 1;
          }
          if (a.created_at > b.created_at) {
            return -1;
          }
          return 0;
        });
        //Вычисления для пагинации
        let articlesMas = [];

        for (let i = (limit*(page-1)); i < (limit*page); i++) {
          articlesMas.push(allData[i]);
        }

        articlesMas = articlesMas.filter(elem =>{
          if(elem != undefined || elem != null){
            return true;
          }
        })

        if(articlesMas.length == 0){
          console.log("Byada");
          res.send("Not Found").status(404);
        } else {
          let objResponce = {
            "count": allData.length,
            "page": page,
            "limit": limit,
            "articles" : articlesMas
          }

          res.send(objResponce);
        }
      });
    }
  });
  console.log("get QUERY PAGES");
});
// ПОЛУЧЕНИЕ СТАТЕЙ ПО ИД

app.get("/articles/:id",(req,res,next)=>{
  mongoClient.connect((err, client)=>{
    if(err){
      console.log("Error connect db");
    }
    let collection = client.db("state").collection("states");

    collection.findOne({id: +(req.params.id)},(err, result)=>{
      if(err){
        let error = {
            "errors": [{
                "field": "id",
                "error": "Not Found"
            }]
        }
        res.send(error);
      }
      res.send(result);
    })
  });
});

app.listen(PORT, err =>{
  if(err){
    console.log("Error listen");
  }
  console.log(`Server ON. Port: ${PORT}`);
})
