import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Resources from "./pages/Resources";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home Page */}
          <Route index element={<Home />} />

          {/* Clubs */}
          <Route path="clubs" element={<Clubs />} />
          <Route path="clubs/:id" element={<ClubDetails />} />

          {/* Events */}
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetails />} />

          {/* Resources */}
          <Route path="resources" element={<Resources />} />

          {/* About */}
          <Route path="about" element={<About />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;