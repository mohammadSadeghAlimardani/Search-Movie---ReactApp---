import "./App.css";
import SearchMovie from "./components/SearchMovie/SearchMovie";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
    return (
        <main>
            <Navbar />
            <SearchMovie />
        </main>
    );
};

export default App;
