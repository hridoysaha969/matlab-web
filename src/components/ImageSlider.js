"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import classes from "@/styles/imageSlider.module.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "@/config/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "./Spinner";

const ImageSlider = () => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const imgListRef = ref(storage, "sliderImg/");
      listAll(imgListRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      });
      setLoading(false);
    };

    fetchImages();
  }, []);

  const settings = {
    dots: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2 className={classes.slider__title}>
        Our <span>Events</span>
      </h2>
      <div className={classes.slider__wrapper}>
        <div className={classes.left}>
          <h2>Special Moments</h2>
          <p>
            Captured some special events. Some memories with the traine and
            mentors. Sharing some time and moment.
          </p>
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <Slider {...settings}>
              {imageList.map((url, ind) => (
                <div key={ind}>
                  <img src={url} className={classes.slider__img} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
