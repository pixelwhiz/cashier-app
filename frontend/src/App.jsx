import { Component } from "react";

import { Home, Success } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent.jsx";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavbarComponent />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sukses" element={<Success />} />
                    </Routes>
                </main>
            </BrowserRouter>
        );
    }
}

export default App;
