import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Recipes from "./components/Recipes";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Settings from "./pages/Settings";
import Recipes2 from "./pages/Recipes2";
import Complaints from "./pages/Complaints";
import ChefSecrets from "./pages/ChefSecrets";

function Landing() {
  return (
    <>
      <Hero />
      <Categories />
      <Recipes />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/recipes" element={<Layout><Recipes2 /></Layout>} />
        <Route path="/complaints" element={<Layout><Complaints /></Layout>} />
        <Route path="/chefsecrets" element={<Layout><ChefSecrets /></Layout>} />
      </Routes>
    </>
  );
}
