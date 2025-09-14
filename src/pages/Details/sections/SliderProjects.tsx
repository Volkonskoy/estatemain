import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import SwiperClass from "swiper";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { SliderProps } from "../interfaces/interfaces";

export default function SliderProjects({ imageUrls, videoUrls }: SliderProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const slides = [...imageUrls, ...videoUrls];

    return (
        <div className="mb-[30px]">
            {/* Основной слайдер */}
            <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {imageUrls.map((photo, index) => (
                    <SwiperSlide key={`photo-${index}`}>
                        <div className="w-full h-[300px] phone:h-[400px] small:h-[500px] flex justify-center items-center overflow-hidden bg-black">
                            <img
                                src={`https://osfinanzen.com/api/images/${photo}`}
                                alt={`Project Photo ${index + 1}`}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => {
                                    setLightboxIndex(index);
                                    setLightboxOpen(true);
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                {videoUrls.map((video, index) => {
                    const videoId = video.split("v=")[1];
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                        <SwiperSlide key={`video-${index}`}>
                            <div className="w-full h-[300px] phone:h-[400px] small:h-[500px] flex justify-center items-center overflow-hidden bg-black">
                                <iframe
                                    src={embedUrl}
                                    title={`YouTube Video ${index + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Слайдер с миниатюрами */}
            <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={slides.length > 5 ? 5 : slides.length}
                watchSlidesProgress={true}
                className="h-[80px] phone:h-[100px] projectSlider"
            >
                {imageUrls.map((photo, index) => (
                    <SwiperSlide key={`thumb-photo-${index}`} className="cursor-pointer border-2 border-transparent">
                        <img
                            src={`https://osfinanzen.com/api/images/${photo}`}
                            alt={`Thumb ${index + 1}`}
                            className="w-full h-full object-cover"
                            onClick={() => {
                                setLightboxIndex(index);
                                setLightboxOpen(true);
                            }}
                        />
                    </SwiperSlide>
                ))}
                {videoUrls.map((video, index) => {
                    const videoId = video.split("v=")[1];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    return (
                        <SwiperSlide key={`thumb-video-${index}`} className="cursor-pointer border-2 border-transparent">
                            <img
                                src={thumbnailUrl}
                                alt={`Thumb Video ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Lightbox для изображений */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={imageUrls.map((img) => ({ src: `https://osfinanzen.com/api/images/${img}` }))}
                index={lightboxIndex}
                plugins={[Thumbnails]}
                on={{
                    view: (slide) => setLightboxIndex(slide.index),
                }}
            />
        </div>
    );
}
