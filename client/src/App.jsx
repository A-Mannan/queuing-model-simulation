import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen box-border">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
