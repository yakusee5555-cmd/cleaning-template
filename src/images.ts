// Central image map — files land in src/assets/ via the media hunter.
import hero from "./assets/hero.jpg";
import kitchen from "./assets/kitchen.jpg";
import bathroom from "./assets/bathroom.jpg";
import bedroom from "./assets/bedroom.jpg";
import deep from "./assets/deep.jpg";
import office from "./assets/office.jpg";
import moveout from "./assets/moveout.jpg";
import airbnb from "./assets/airbnb.jpg";
import carpet from "./assets/carpet.jpg";
import windowImg from "./assets/window.jpg";

export const IMG: Record<string, string> = {
  hero, kitchen, bathroom, bedroom, deep, office, moveout, airbnb, carpet, window: windowImg,
};
