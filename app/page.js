import Banner from "./components/Banner/Banner";
import Offers from "./components/offers/Offers";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import SourcesProducts from "@/app/components/SourceProducts/SourcesProducts";
import fakeData from "@/app/FakeData/FakeData";
import Nav from "@/app/components/navbar/nav";
export default function Home() {
  return (
      <>
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
      </>
  );
}
