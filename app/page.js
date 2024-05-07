import Navbar from "@/app/components/navbar/navbar";
import Banner from "./components/Banner/Banner";
import Offers from "./components/offers/Offers";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Footer from "./components/Footer/Footer";
import Nav from "@/app/components/navbar/nav";
import SourcesProducts from "@/app/components/SourceProducts/SourcesProducts";
import fakeData from "@/app/FakeData/FakeData";
export default function Home({params}) {
  return (
      <main className="relative">
         <div className="sticky top-0 z-[20]">
             <Navbar/>
         </div>
          <Nav/>
          <Banner/>
          <Offers/>

          {
              fakeData.sourceCards.map((sourceCard,index)=>{
                  return(
                      <SourcesProducts
                          key={index}
                          sourceCard={sourceCard}
                      />
                  )
              })
          }
{/*
          <HomeAndOutdoor/>
          <ConsumerElectronicsAndGadgets/>*/}
          <Requests/>
          <RecommendedItems/>
          <OurExtraServices/>
          <SuppliersByRegion/>
          <Footer/>
      </main>
  );
}
