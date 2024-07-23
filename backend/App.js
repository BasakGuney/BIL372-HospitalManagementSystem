const express = require("express");
const cors = require("cors");
const app = express();
var mysql = require("mysql");
const PORT = process.env.PORT || 8080;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1923",
  database: "proje",
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

app.post("/envanter_getir", (req, res) => {
  con.query("SELECT * FROM envanter ", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/envanter_ada_gore_sirala", (req, res) => {
  con.query(
    "SELECT * FROM envanter order by Malzeme_Adi",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/stok_miktari_gore_sirala", (req, res) => {
  con.query(
    "SELECT * FROM envanter order by Stok_Miktari",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/envanter_filtrele", (req, res) => {
  const filters = {
    Malzeme_ID: req.body.malzemeId,
    Malzeme_Adi: req.body.malzemeAdi,
    Stok_Miktari: req.body.stokMiktari,
    Siparis_Durumu: req.body.siparisDurumu,
  };

  // Base query
  let query = "SELECT * FROM envanter ";
  let queryParams = [];

  let count = 0;
  // Add dynamic conditions based on provided filters
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      if (count == 0) {
        query += ` WHERE ${key} = ?`;
        queryParams.push(value);
        count++;
      } else {
        // Only add to the query if the value is not empty or undefined
        query += ` AND ${key} = ?`;
        queryParams.push(value);
      }
    }
  }

  con.query(query.replace("AND", ""), queryParams, function (err, result) {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send({ error: "Database query failed" });
    }
    res.send(result);
  });
});

app.post("/siparis_ver", (req, res) => {
  const filters = {
    malzemeId: req.body.malzemeId,
    tarih: req.body.tarih,
    siparisMiktari: req.body.siparisMiktari,
  };

  // Base query
  let query = "INSERT INTO siparis values(?,?,?) ";
  let queryParams = [];

  // Add dynamic conditions based on provided filters
  for (const [key, value] of Object.entries(filters)) {
    queryParams.push(value);
  }

  con.query(query, queryParams, function (err, result) {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send({ error: "Database query failed" });
    }
    res.send(result);
  });
});

app.post("/siparis_listesi_getir", (req, res) => {
  con.query(
    "select Malzeme_ID, Malzeme_Adi, Stok_Miktari, Siparis_Miktari,Tarih from siparis natural join envanter ",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/fatura_listesi_getir", (req, res) => {
  con.query(
    "select Fatura_ID, Hasta_ID,Ad,Soyad,TCNO,Sigorta_Bilgisi,Tarih,Tutar from fatura join hasta where Hasta_ID=Customer_ID",
    function (err, result) {
      console.log(result);
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/guncel_tutar_hesapla", (req, res) => {
  con.query(
    "select Fatura_ID, Hasta_ID,Ad,Soyad,TCNO,Sigorta_Bilgisi,Tarih,Tutar,CASE WHEN Sigorta_Bilgisi='yok' THEN Tutar WHEN Sigorta_Bilgisi=1 THEN Tutar-100 ELSE NULL END as Guncel_Tutar from fatura join hasta where Hasta_ID=Customer_ID",
    function (err, result) {
      console.log(result);
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/fatura_ada_gore_sirala", (req, res) => {
  con.query(
    "select Fatura_ID, Hasta_ID,Ad,Soyad,TCNO,Sigorta_Bilgisi,Tarih,Tutar,CASE WHEN Sigorta_Bilgisi='yok' THEN Tutar WHEN Sigorta_Bilgisi='var' THEN Tutar-1000 ELSE NULL END as Guncel_Tutar from fatura join hasta where Hasta_ID=Customer_ID ORDER BY Ad",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/fatura_tarihe_gore_sirala", (req, res) => {
  con.query(
    "select Fatura_ID, Hasta_ID,Ad,Soyad,TCNO,Sigorta_Bilgisi,Tarih,Tutar,CASE WHEN Sigorta_Bilgisi='yok' THEN Tutar WHEN Sigorta_Bilgisi='var' THEN Tutar-1000 ELSE NULL END as Guncel_Tutar from fatura join hasta where Hasta_ID=Customer_ID ORDER BY Tarih",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/fatura_tutara_gore_sirala", (req, res) => {
  con.query(
    "select Fatura_ID, Hasta_ID,Ad,Soyad,TCNO,Sigorta_Bilgisi,Tarih,Tutar,CASE WHEN Sigorta_Bilgisi='yok' THEN Tutar WHEN Sigorta_Bilgisi='var' THEN Tutar-1000 ELSE NULL END as Guncel_Tutar from fatura join hasta where Hasta_ID=Customer_ID ORDER BY Tutar",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/fatura_filtrele", (req, res) => {
  const filters = {
    Fatura_ID: req.body.faturaId,
    Hasta_ID: req.body.hastaId,
    Ad: req.body.ad,
    Soyad: req.body.soyad,
    TCNO: req.body.TCNO,
    Sigorta_Bilgisi: req.body.sigorta,
    Tarih: req.body.tarih,
    Tutar: req.body.tutar,
  };

  // Base query
  let query =
    "select Fatura_ID, Hasta_ID,Ad,Soyad,TCNO,Sigorta_Bilgisi,Tarih,Tutar,CASE WHEN Sigorta_Bilgisi='yok' THEN Tutar WHEN Sigorta_Bilgisi='var' THEN Tutar-1000 ELSE NULL END as Guncel_Tutar from fatura join hasta where Hasta_ID=Customer_ID ";
  let queryParams = [];

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

app.post("/doktor_getir", (req, res) => {
  con.query(
    "select * from personel natural join doktor WHERE Personel_ID=?",
    [req.body.personelId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/doktor_guncelle", (req, res) => {
  const filters = {
    Uzmanlik_Alani: req.body.uzmanlik,
    Calisma_Saatleri: req.body.saat,
    Personel_ID: req.body.personelId,
  };
  console.log(req.body.personelId);
  // Base query
  let query = "update doktor set ";
  let queryParams = [];

  // Add dynamic conditions based on provided filters
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      if (key == "Personel_ID") {
        query = query.replace(",", "");
        query += ` WHERE ${key} = ?`;
        queryParams.push(value);
      } else {
        console.log(key);
        // Only add to the query if the value is not empty or undefined
        query += ` ,${key} = ?`;
        queryParams.push(value);
      }
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

app.post("/hasta_getir", (req, res) => {
  con.query(
    "select * from hasta where Hasta_ID=?",
    [req.body.hastaId],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/hasta_guncelle", (req, res) => {
  const filters = {
    Sigorta_Bilgisi: req.body.sigorta,
    Hasta_ID: req.body.hastaId,
  };
  // Base query
  let query = "update hasta set ";
  let queryParams = [];

  // Add dynamic conditions based on provided filters
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      if (key == "Hasta_ID") {
        query = query.replace(",", "");
        query += ` WHERE ${key} = ?`;
        queryParams.push(value);
      } else {
        console.log(key);
        // Only add to the query if the value is not empty or undefined
        query += ` ,${key} = ?`;
        queryParams.push(value);
      }
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

app.post("/bolum_listesi_getir", (req, res) => {
  con.query(
    "SELECT Bolum_Adi, Yatak_Sayisi, COUNT(*) AS Yatan_Hasta_Sayisi FROM bolum GROUP BY  Bolum_Adi, Yatak_Sayisi",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/bolum_ada_gore_sirala", (req, res) => {
  con.query(
    "SELECT Bolum_Adi, Yatak_Sayisi, COUNT(*) AS Yatan_Hasta_Sayisi FROM bolum GROUP BY  Bolum_Adi, Yatak_Sayisi order by Bolum_Adi",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/bolum_hasta_gore_sirala", (req, res) => {
  con.query(
    "SELECT Bolum_Adi, Yatak_Sayisi, COUNT(*) AS Yatan_Hasta_Sayisi FROM bolum GROUP BY  Bolum_Adi, Yatak_Sayisi order by Yatan_Hasta_Sayisi",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/bolum_yatak_gore_sirala", (req, res) => {
  con.query(
    "SELECT Bolum_Adi, Yatak_Sayisi, COUNT(*) AS Yatan_Hasta_Sayisi FROM bolum GROUP BY  Bolum_Adi, Yatak_Sayisi order by Yatak_Sayisi",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(8080);
