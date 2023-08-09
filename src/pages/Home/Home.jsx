import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import usePageTitle from "../../hooks/usePageTitle";
import Banner from "./Banner";
import Discount from "./Discount";
import Features from "./Features";
import Gallery from "./Gallery";
import HowItWorks from "./HowItWorks";
import ShopByCategory from "./ShopByCategory";
import Testimonials from "./Testimonials";

const Home = () => {
  usePageTitle("Home");
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    bannerContent,
    toysAndGames,
    puzzleToys,
    developmentToys,
    contents,
    gallery,
    features,
    testimonials,
  } = allData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://edu-play-mart-server.vercel.app/api/toys/category/";
        // for shop by category section
        const toysAndGames = await fetch(baseUrl + "Toys & Games").then((res) =>
          res.json()
        );
        const puzzleToys = await fetch(baseUrl + "Puzzle Toys").then((res) =>
          res.json()
        );
        const developmentToys = await fetch(
          baseUrl + "Development Toys & Kits"
        ).then((res) => res.json());

        // for banner section
        const bannerContent = await fetch(
          "https://edu-play-mart-server.vercel.app/api/banner-contents"
        ).then((res) => res.json());

        // for how it works section
        const contents = await fetch(
          "https://edu-play-mart-server.vercel.app/api/hiw-contents"
        ).then((res) => res.json());

        // for gallery section
        const gallery = await fetch(
          "https://edu-play-mart-server.vercel.app/api/gallery"
        ).then((res) => res.json());

        // for features section
        const features = await fetch(
          "https://edu-play-mart-server.vercel.app/api/features"
        ).then((res) => res.json());

        // for testimonials section
        const testimonials = await fetch(
          "https://edu-play-mart-server.vercel.app/api/testimonials"
        ).then((res) => res.json());

        setAllData({
          bannerContent,
          toysAndGames,
          puzzleToys,
          developmentToys,
          contents,
          gallery,
          features,
          testimonials,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <Banner bannerContent={bannerContent} />
      <HowItWorks contents={contents} />
      <Gallery gallery={gallery} />
      <Features features={features} />
      <ShopByCategory
        toysAndGames={toysAndGames}
        puzzleToys={puzzleToys}
        developmentToys={developmentToys}
      />
      <Discount />
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default Home;






