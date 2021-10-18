import { MainNavDownLogos } from "../cmps/MainNavDownLogos.jsx";
import { MainNavTopLogos } from "../cmps/MainNavTopLogos.jsx";
import { Plans } from "../cmps/Plans.jsx";

export const MainNav = () => {
  return (
    <section className="main-nav-wrapper flex column align-center justify-space-between">
      <MainNavTopLogos/>
      <Plans />
      <MainNavDownLogos />
    </section>
  );
};
