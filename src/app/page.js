import Banner from "@/components/Banner";
import ImageSlider from "@/components/ImageSlider";
import Reward from "@/components/Reward";
import Students from "@/components/Student";

export default function Home() {
  return (
    <div className="container">
      <Banner />
      <ImageSlider />
      <Reward />
      <Students />
    </div>
  );
}
