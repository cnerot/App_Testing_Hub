import "./App.css";
import Header from "./components/Header";
import MediaList from "./components/MediaList";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MediaList
          title={"Dernier film populaires"}
          url="https://api.themoviedb.org/3/movie/popular?api_key=1b3bbfd5c81da1fb2df8b1f9f0066007"
        />
        <MediaList
          title={"Dernieres series populaires"}
          url="https://api.themoviedb.org/3/tv/popular?api_key=1b3bbfd5c81da1fb2df8b1f9f0066007"
        />
      </main>
    </div>
  );
}

export default App;
