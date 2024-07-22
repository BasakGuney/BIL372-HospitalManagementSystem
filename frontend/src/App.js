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
          <Route>
            <MainPage></MainPage>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
