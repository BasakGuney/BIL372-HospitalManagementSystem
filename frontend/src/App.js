import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import MainPage from "./main_page";
import RandevuTakvimi from "./randevu_takvimi";
import HastaAtamasi from "./hasta_atamasi";
import EnvanterGoruntuleme from "./envanter_goruntuleme";
import Faturalandirma from "./faturalandirma";
import DoktorGuncelleme from "./doktor_guncelleme";
import HastaGuncelleme from "./hasta_guncelleme";
import BolumBilgileri from "./bolum_bilgileri";
import RandevuListesi from "./randevu_listesi";
import RandevuOlustur from "./randevu_olustur";
import HastaFatura from "./hasta_fatura";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/randevu_takvimi">
            <RandevuTakvimi></RandevuTakvimi>
          </Route>
          <Route exact path="/hasta_ataması">
            <HastaAtamasi></HastaAtamasi>
          </Route>
          <Route exact path="/envanter_goruntuleme">
            <EnvanterGoruntuleme></EnvanterGoruntuleme>
          </Route>
          <Route exact path="/faturalandirma">
            <Faturalandirma></Faturalandirma>
          </Route>
          <Route exact path="/doktor_bilgi_guncelleme">
            <DoktorGuncelleme></DoktorGuncelleme>
          </Route>
          <Route exact path="/hasta_guncelleme">
            <HastaGuncelleme></HastaGuncelleme>
          </Route>
          <Route exact path="/bolum_bilgileri">
            <BolumBilgileri></BolumBilgileri>
          </Route>
          <Route exact path="/randevu_listesi">
            <RandevuListesi></RandevuListesi>
          </Route>
          <Route exact path="/randevu_olustur">
            <RandevuOlustur></RandevuOlustur>
          </Route>
          <Route exact path="/hasta_fatura">
            <HastaFatura></HastaFatura>
          </Route>
          <Route>
            <MainPage></MainPage>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
