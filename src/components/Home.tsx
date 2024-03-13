import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from "react-naver-maps";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ShopData {
  [key: string]: {
    tags: string[];
    shop_name: string;
    geo_location: string[];
  };
}

const Home = () => {
  const navermaps = useNavermaps();
  const [shopData, setShopData] = useState<ShopData>({});

  const getShopData = async () => {
    const docRef = doc(db, "foodmap", "visit");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setShopData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return;
    }
  };

  useEffect(() => {
    getShopData();
  }, []);

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3495704, 127.105399)}
        defaultZoom={10}
      >
        {Object.values(shopData)
          .filter((shop) => shop.geo_location)
          .map((shop, index) => {
            return (
              <Marker
                key={index}
                position={navermaps.LatLng(
                  shop.geo_location[1],
                  shop.geo_location[0]
                )}
                title={shop.shop_name}
                icon={{
                  url: "https://private-user-images.githubusercontent.com/52443401/312287782-bb533cb1-e47d-4de2-b250-8897b7a1784c.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAyOTY2MjksIm5iZiI6MTcxMDI5NjMyOSwicGF0aCI6Ii81MjQ0MzQwMS8zMTIyODc3ODItYmI1MzNjYjEtZTQ3ZC00ZGUyLWIyNTAtODg5N2I3YTE3ODRjLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAzMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMzEzVDAyMTg0OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTEwOGZhZDU3YTBlZTBjYjk0MWI2MDJmZjM2NzVjMmYyMjY1MTJjODkxZGRhNWNhMmY4MzY2Nzk0MzE2ZjZiYTImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Y-NMiI4Jiu2OkxDC56M8ZvhneLcDBfC_pVX0hKAdAWc",
                  size: navermaps.Size(30, 30),
                }}
                onClick={(event) => console.log(event)}
              />
            );
          })}
      </NaverMap>
    </MapDiv>
  );
};

export default Home;
