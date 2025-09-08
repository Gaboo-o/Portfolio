import Navigation from "./components/_navigation";
import About from "./components/_about";
import Projects from "./components/_projects";
import Skills from "./components/_skills";
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
      <Footer data={content.footer} />
      <ThemeToggle />
    </div>
  );
}