import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Dashboard from "./Pages/Dashboard";
import HeroPage from "./Pages/HeroPage";
import Marketplace from "./Pages/Marketplace";
import PlaceDemandPage from "./Pages/PlaceDemandPage";
import { MarketplaceProvider } from "./Context/MarketplaceContext";
import BidDemandPage from "./Pages/BidDemandPage";
import Profile from "./Pages/Profile";
import 'leaflet/dist/leaflet.css';
import { UserProvider } from "./Context/UserContext";
import MainLayout from "./Layouts/MainLayout";
import {ContractProvider} from "./Context/ContractContext"
import {AdsProvider} from "./Context/AdsContext";
function App() {
  return (

    <ContractProvider>
        <UserProvider>
          <AdsProvider>
            <MarketplaceProvider>
              <BrowserRouter>
                <div className="w-full px-10">
                  <Routes>
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<HeroPage />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="marketplace" element={<Marketplace />} />
                      <Route path="PlaceDemand" element={<PlaceDemandPage />} />
                      <Route path="BidDemand/:ad" element={<BidDemandPage />} />
                      <Route path="profile/" element={<Profile />} />
                    </Route>
                  </Routes>
                </div>
              </BrowserRouter>
            </MarketplaceProvider>
          </AdsProvider>
        </UserProvider>
    </ContractProvider>
  );
}

export default App;
