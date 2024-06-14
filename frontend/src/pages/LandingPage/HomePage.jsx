import { Container, Row, Col } from "react-bootstrap"
import HeroImage from "../../assets/img/hero.png"

import { dataSwiper, propertyTerbaru } from "../../data/index.js"
import { useNavigate } from "react-router-dom";
import FaqComponent from "../../components/FaqComponent.jsx";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


const HomePage = () => {
    let navigate = useNavigate();

  return (
    <div className="homepage">
        <header className="w-100 min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="header-box d-flex align-items-center pt-lg-5">
                    <Col lg="6" className="mt-4">
                        <h1 className="mb-4">
                            Find The <br /> <span>Perfect Rent House</span> With Us!
                        </h1>
                        <p className="mb-4">Rent House is an online platform that provides comprehensive listings of rental properties, including houses, apartments, and shared accommodations.</p>
                        
                        <div className="button">
                            <button className="btn btn1 rounded-1 me-2 mb-xs-0 mb-2" onClick={() => navigate("/property")}>Lihat Property</button>
                            <button className="btn btn2 btn-outline rounded-1 mb-xs-0 mb-2">Lihat Discount</button>
                        </div>
                    </Col>
                    <Col lg="6" className="pt-lg-0 pt-5">
                        <img src={HeroImage} alt="hero-img" />
                    </Col>
                </Row>
            </Container>
        </header>

        <div className="property w-100 min-vh-100">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center fw-bold">Property Terbaru</h1>
                        <p className="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </Col>
                </Row>
                <Row>
                    {propertyTerbaru.map((property) => {
                        return (
                            <Col key={property.id} className="shadow rounded" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={property.delay}>
                                <img src={property.image} alt="" className="w-100 mb-3 rounded-top"/>
                                <div className="star mb-2 px-3">
                                    <i className={property.star1}></i>
                                    <i className={property.star2}></i>
                                    <i className={property.star3}></i>
                                    <i className={property.star4}></i>
                                    <i className={property.star5}></i>
                                </div>
                                <h5 className="mb-3 px-3">{property.title}</h5>
                                <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                                    <p className="m-0 text-primary fw-bold">{property.price}</p>
                                    <button className="btn btn1 rounded-1" onClick={() => navigate("/detail")}>{property.detail}</button>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
                <Row>
                    <Col className="text-center">
                        <button className="btn btn1 rounded-5 btn-lg" data-aos="fade-up" data-aos-duration="1000" onClick={() => navigate("/property")}>
                            Lihat Semua Property
                            <i className="fa-solid fa-chevron-right ms-1"></i>
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="testimonial py-5">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center fw-bold my-5">Testimonial</h1>
                    </Col>
                </Row>

                <Row>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                        clickable: true,
                        }}
                        breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {dataSwiper.map((data) => {
                            return <SwiperSlide key={data.id} className="shadow-sm">
                                <p className="desc">{data.desc}</p>
                                <div className="people">
                                    <img src={data.image} alt="" />
                                    <div>
                                        <h5 className="mt-1 mb-1">{data.name}</h5>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                        
                        {/* <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide> */}
                    </Swiper>
                </Row>
            </Container>
        </div>

        <FaqComponent />
    </div>
  )
}

export default HomePage