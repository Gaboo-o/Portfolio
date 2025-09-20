import Navigation from "./components/_navigation";
import About from "./components/_about";
import Skills from "./components/_skills";
import Projects from "./components/_projects";
import Achievements from "./components/_achievements";
import Footer from "./components/_footer";
import ThemeToggle from "./components/_theme";
import content from "./data/content.json";

export default function App() {
  return (
    <div>
      <Navigation data={content.navBar} />
      <About data={content.header} />
      <Skills data={content.skills} />
      <Projects data={content.projects} />
      <Achievements data={content.achievements} />
      <Footer data={content.footer} />
      <ThemeToggle />
    </div>
  );
}
