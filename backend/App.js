const express = require("express");
const cors = require("cors");
const app = express();
var mysql = require("mysql");
const PORT = process.env.PORT || 8080;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1923",
  database: "372_proje",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());
app.use(express.json());

app.post("/personeli_getir", (req, res) => {
  con.query(
    "SELECT Hasta_ID, TCNO, Ad, Soyad, Sigorta_Bilgisi, Kayit_No,Tarih,Saat,Gecerli_mi FROM hasta NATURAL JOIN randevu WHERE DoktorID=?",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/randevu_filtrele", (req, res) => {
  const personelId = req.body.personelId;
  const filters = {
    Hasta_ID: req.body.hastaId,
    TCNO: req.body.TCNO,
    Ad: req.body.Ad,
    Soyad: req.body.Soyad,
    Sigorta_Bilgisi: req.body.Sigorta,
    Kayit_No: req.body.KayitNo,
    Tarih: req.body.Tarih,
    Saat: req.body.Saat,
  };

  // Base query
  let query =
    "SELECT Hasta_ID, TCNO, Ad, Soyad, Sigorta_Bilgisi, Kayit_No, Tarih, Saat, Gecerli_mi FROM hasta NATURAL JOIN randevu WHERE DoktorID = ?";
  let queryParams = [personelId];

  // Add dynamic conditions based on provided filters
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      // Only add to the query if the value is not empty or undefined
      query += ` AND ${key} = ?`;
      queryParams.push(value);
    }
  }

  con.query(query, queryParams, function (err, result) {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send({ error: "Database query failed" });
    }
    res.send(result);
  });
});

app.post("/tarihe_gore_sirala", (req, res) => {
  con.query(
    "SELECT Hasta_ID, TCNO, Ad, Soyad, Sigorta_Bilgisi, Kayit_No,Tarih,Saat,Gecerli_mi FROM hasta NATURAL JOIN randevu WHERE DoktorID=? ORDER BY Tarih",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/saate_gore_sirala", (req, res) => {
  con.query(
    "SELECT Hasta_ID, TCNO, Ad, Soyad, Sigorta_Bilgisi, Kayit_No,Tarih,Saat,Gecerli_mi FROM hasta NATURAL JOIN randevu WHERE DoktorID=? ORDER BY Saat",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/ada_gore_sirala", (req, res) => {
  con.query(
    "SELECT Hasta_ID, TCNO, Ad, Soyad, Sigorta_Bilgisi, Kayit_No,Tarih,Saat,Gecerli_mi FROM hasta NATURAL JOIN randevu WHERE DoktorID=? ORDER BY Ad",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/doktor_randevu_iptali", (req, res) => {
  const { personelId, hastaId } = req.body;

  // First query to delete the record
  const deleteQuery = "DELETE FROM randevu WHERE DoktorID = ? AND Hasta_ID = ?";
  const deleteParams = [personelId, hastaId];

  // Second query to select the records
  const selectQuery = `
    SELECT Hasta_ID, TCNO, Ad, Soyad, Sigorta_Bilgisi, Kayit_No, Tarih, Saat, Gecerli_mi
    FROM hasta NATURAL JOIN randevu WHERE DoktorID = ?
  `;
  const selectParams = [personelId];

  // Execute the delete query first
  con.query(deleteQuery, deleteParams, function (err, deleteResult) {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send({ error: "Database query failed" });
    }

    // Execute the select query next
    con.query(selectQuery, selectParams, function (err, selectResult) {
      if (err) {
        console.error("Database query failed:", err);
        return res.status(500).send({ error: "Database query failed" });
      }

      // Send the result of the SELECT query
      res.send(selectResult);
    });
  });
});

app.post("/hasta_atamasi_getir", (req, res) => {
  con.query(
    "select distinct Hasta_ID,  Ad, Soyad, TCNO, Sigorta_Bilgisi from  hizmet_personeli join sorumludur join yatan_hasta natural join hasta where Personel_ID=?",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/atama_ada_gore_sirala", (req, res) => {
  con.query(
    "select distinct Hasta_ID,Ad, Soyad, TCNO, Sigorta_Bilgisi from  hizmet_personeli join sorumludur join yatan_hasta natural join hasta where Personel_ID=? ORDER BY Ad",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/atama_hasta_id_gore_sirala", (req, res) => {
  con.query(
    "select distinct Hasta_ID,Ad, Soyad, TCNO, Sigorta_Bilgisi from  hizmet_personeli join sorumludur join yatan_hasta natural join hasta where Personel_ID=? ORDER BY Hasta_ID",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/hasta_atamasi_filtrele", (req, res) => {
  const personelId = req.body.personelId;
  const filters = {
    Hasta_ID: req.body.hastaId,
    TCNO: req.body.TCNO,
    Ad: req.body.Ad,
    Soyad: req.body.Soyad,
    Sigorta_Bilgisi: req.body.Sigorta,
  };

  // Base query
  let query =
    "select distinct Hasta_ID,Ad, Soyad, TCNO, Sigorta_Bilgisi from  hizmet_personeli join sorumludur join yatan_hasta natural join hasta where Personel_ID=?";
  let queryParams = [personelId];

  // Add dynamic conditions based on provided filters
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      // Only add to the query if the value is not empty or undefined
      query += ` AND ${key} = ?`;
      queryParams.push(value);
    }
  }

  con.query(query, queryParams, function (err, result) {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send({ error: "Database query failed" });
    }
    res.send(result);
  });
});

app.listen(8080);
