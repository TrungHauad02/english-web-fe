import HomeBanner from "./HomeBanner";
import ContentHomeStudent from "./ContentHomeStudent";
import PracticeTestSlider from "./PracticeTestSlider";
import HeaderStudent from "../header/HeaderStudent";
import Footer from "shared/footer/Footer";

function PageStudent() {
  return (
    <>
      <HeaderStudent />
      <HomeBanner />
      <ContentHomeStudent />
      <PracticeTestSlider />
      <Footer />
    </>
  );
}

export default PageStudent;
