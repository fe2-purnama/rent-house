import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
    return (
        <div className="footer py-5">
        <Container>
            <Row className="d-flex justify-content-between">
            <Col lg="5">
                <h3 className="fw-bold">Rent House</h3>
                <p className="desc">Rent House is an online platform that provides comprehensive listings of rental properties, including houses, apartments, and shared accommodations.</p>

                <div className="no mb-1 mt-4">
                    <Link className="text-decoration-none">
                        <i className="fa-brands fa-whatsapp"></i>
                        <p className="m-0">62 857-1201-3561</p>
                    </Link>
                </div>

                <div className="mail">
                    <Link className="text-decoration-none">
                        <i className="fa-regular fa-envelope"></i>
                        <p className="m-0">fadhilaridhas@gmail.com</p>
                    </Link>
                </div>
            </Col>

            <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
                <h5 className="fw-bold">Menu</h5>
                <Link to="home">Home</Link>
                <Link to="property">Property</Link>
                <Link to="testimonial">Testimonial</Link>
                <Link to="faq">FAQ</Link>
                <Link to="team">Team</Link>
            </Col>

            <Col lg="4" className="mt-lg-0 mt-5">
                <h5 className="fw-bold mb-3">Subscribe For More Information</h5>
                <div className="subscribe">
                    <input type="text" placeholder="Subscribe..." />
                    <button className="btn btn1 rounded-end rounded-0">Subscribe</button>
                </div>
                <div className="social mt-3">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-tiktok"></i>
                </div>
            </Col>
            </Row>

            <Row>
                <Col>
                    <p className="text-center px-md-0 px-2">&copy; Copyright {new Date().getFullYear()} by <span className="fw-bold">Rent House</span>, All Right Reserved</p>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default FooterComponent