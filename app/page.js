import Navbar from "@/app/components/navbar/navbar";
import Banner from "./components/Banner/Banner";
import Offers from "./components/offers/Offers";
import HomeAndOutdoor from "./components/SourceProducts/HomeAndOutdoor";
import ConsumerElectronicsAndGadgets from "./components/SourceProducts/ConsumerElectronicsAndGadgets";
import Requests from "./components/requests/Requests";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <Offers />
      <HomeAndOutdoor />
      <ConsumerElectronicsAndGadgets />
      <Requests />
      <br /><br />
    </main>
  );
}
