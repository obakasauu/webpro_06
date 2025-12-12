"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';

  // --- 勝敗判定ロジック ---
  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;
  // ---------------------------

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display);
});
let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});
app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
});
let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});
app.get("/janken_radio", (req, res) => {
  res.sendFile(__dirname + "/janken_radio.html");
});
// ====== 1. カラオケ店のデータ ======
let karaoke = [
  { 
    id: 1, 
    name: "カラオケ館 五香店", 
    address: "千葉県松戸市常盤平５丁目２４−１", 
    openHours: "09:00-26:00", 
    rooms: 14, 
    price: 500 
  },
  { 
    id: 2, 
    name: "カラオケ まねきねこ五香店", 
    address: "千葉県松戸市常盤平５丁目１１−１２ 五香駅西口第3ビル3・4F", 
    openHours: "10:00-29:00", 
    rooms: 21, 
    price: 600 
  },
  { 
    id: 3, 
    name: "カラオケBANBAN松戸駅東口店", 
    address: "千葉県松戸市松戸１２３１ アステシオビル５Ｆ", 
    openHours: "24時間", 
    rooms: 25, 
    price: 600 
  }
];

// ====== CRUD: 一覧 ======
app.get("/karaoke", (req, res) => {
  res.render("karaoke", { data: karaoke });
});

// ====== CRUD: 詳細 ======
app.get("/karaoke/detail/:number", (req, res) => {
  const n = req.params.number;
  res.render("karaoke_detail", { id: n, data: karaoke[n] });
});

// ====== CRUD: Create（追加フォームへ） ======
app.get("/karaoke/create", (req, res) => {
  res.render("karaoke_new");
});

// ====== CRUD: Create（追加実行） ======
app.post("/karaoke/create", (req, res) => {
  const newId = karaoke.length + 1;
  karaoke.push({
    id: newId,
    name: req.body.name,
    address: req.body.address,
    openHours: req.body.openHours,
    rooms: req.body.rooms,
    price: req.body.price
  });
  res.redirect("/karaoke");
});

// ====== CRUD: Delete ======
app.get("/karaoke/delete/:number", (req, res) => {
  karaoke.splice(req.params.number, 1);
  res.redirect("/karaoke");
});

// ====== CRUD: Edit（編集フォーム） ======
app.get("/karaoke/edit/:number", (req, res) => {
  const n = req.params.number;
  res.render("karaoke_edit", { id: n, data: karaoke[n] });
});

// ====== CRUD: Update（更新実行） ======
app.post("/karaoke/update/:number", (req, res) => {
  const n = req.params.number;

  karaoke[n].name = req.body.name;
  karaoke[n].address = req.body.address;
  karaoke[n].openHours = req.body.openHours;
  karaoke[n].rooms = req.body.rooms;
  karaoke[n].price = req.body.price;

  res.redirect("/karaoke");
});


// ====== 2. スーパーのデータ ======
// ====== スーパーのデータ ======
let supermarkets = [
  { 
    id: 1, 
    name: "スーパーベルクス 習志野店", 
    address: "千葉県習志野市茜浜２丁目２−１ ミスターマックス新習志野ショッピングセンター", 
    openHours: "9:00-21:00", 
    parking: true, 
    floorArea: 1200 
  },
  { 
    id: 2, 
    name: "イオン 津田沼店", 
    address: "千葉県習志野市津田沼１丁目２３−１", 
    openHours: "8:00-22:00", 
    parking: true, 
    floorArea: 3000 
  }
];

// ====== 一覧 ======
app.get("/super", (req, res) => {
  res.render("super", { data: supermarkets });
});

// ====== 詳細 ======
app.get("/super/detail/:number", (req, res) => {
  const n = req.params.number;
  res.render("super_detail", { id: n, data: supermarkets[n] });
});

// ====== Create（追加フォーム） ======
app.get("/super/create", (req, res) => {
  res.render("super_new");
});

// ====== Create（追加実行） ======
app.post("/super/create", (req, res) => {
  const id = supermarkets.length + 1;

  supermarkets.push({
    id: id,
    name: req.body.name,
    address: req.body.address,
    openHours: req.body.openHours,
    parking: req.body.parking === "true",
    floorArea: req.body.floorArea
  });

  res.redirect("/super");
});

// ====== Delete ======
app.get("/super/delete/:number", (req, res) => {
  supermarkets.splice(req.params.number, 1);
  res.redirect("/super");
});

// ====== Edit（編集フォーム） ======
app.get("/super/edit/:number", (req, res) => {
  const n = req.params.number;
  res.render("super_edit", { id: n, data: supermarkets[n] });
});

// ====== Update（更新実行） ======
app.post("/super/update/:number", (req, res) => {
  const n = req.params.number;

  supermarkets[n].name = req.body.name;
  supermarkets[n].address = req.body.address;
  supermarkets[n].openHours = req.body.openHours;
  supermarkets[n].parking = req.body.parking === "true";
  supermarkets[n].floorArea = req.body.floorArea;

  res.redirect("/super");
});



// ====== 3. コンビニのデータ ======
// ====== コンビニのデータ ======
let conveni = [
  { 
    id: 1, 
    name: "セブンイレブン 五香駅東口店", 
    brand: "セブン", 
    address: "千葉県松戸市金ケ作４０８−７５", 
    open24h: true, 
    atm: true 
  },
  { 
    id: 2, 
    name: "ローソン 松戸五香店", 
    brand: "ローソン", 
    address: "千葉県松戸市五香１丁目１１−１１", 
    open24h: true, 
    atm: true 
  },
  { 
    id: 3, 
    name: "ファミリーマート 五香駅東口店", 
    brand: "ファミマ", 
    address: "千葉県松戸市金ケ作４０８", 
    open24h: true, 
    atm: false 
  }
];

// ====== 一覧 ======
app.get("/conveni", (req, res) => {
  res.render("conveni", { data: conveni });
});

// ====== 詳細 ======
app.get("/conveni/detail/:number", (req, res) => {
  const n = req.params.number;
  res.render("conveni_detail", { id: n, data: conveni[n] });
});

// ====== Create（追加フォーム） ======
app.get("/conveni/create", (req, res) => {
  res.render("conveni_new");
});

// ====== Create（追加実行） ======
app.post("/conveni/create", (req, res) => {
  const id = conveni.length + 1;

  conveni.push({
    id: id,
    name: req.body.name,
    brand: req.body.brand,
    address: req.body.address,
    open24h: req.body.open24h === "true",
    atm: req.body.atm === "true"
  });

  res.redirect("/conveni");
});

// ====== Delete ======
app.get("/conveni/delete/:number", (req, res) => {
  conveni.splice(req.params.number, 1);
  res.redirect("/conveni");
});

// ====== Edit（編集フォーム） ======
app.get("/conveni/edit/:number", (req, res) => {
  const n = req.params.number;
  res.render("conveni_edit", { id: n, data: conveni[n] });
});

// ====== Update（更新実行） ======
app.post("/conveni/update/:number", (req, res) => {
  const n = req.params.number;

  conveni[n].name = req.body.name;
  conveni[n].brand = req.body.brand;
  conveni[n].address = req.body.address;
  conveni[n].open24h = req.body.open24h === "true";
  conveni[n].atm = req.body.atm === "true";

  res.redirect("/conveni");
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
