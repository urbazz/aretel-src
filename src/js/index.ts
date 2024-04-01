import { Hero } from "./modules/Hero";
import {About} from "./modules/About";
import { Reviews } from "./modules/Reviews";
import { Portfolio } from "./modules/Portfolio";
import { Staff } from "./modules/Staff";
import { Footer } from "./modules/Footer";
import { Menu } from "./modules/Menu";
import { Header } from "./modules/Header";


window.addEventListener('DOMContentLoaded', ()=> {
  new Header;
  new Hero;
  new About;
  new Reviews;
  new Portfolio;
  new Staff;
  new Footer;
})
