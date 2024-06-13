import { Container, Row, Col } from "react-bootstrap";
import { testimonial } from "../../data/index";

const TestimonialPage = () => {
    return (
        <div className="testimonial-page">
            <div className="testimonial">
                <Container>
                <Row>
                    <Col>
                    <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">All Testimonial</h1>
                    <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">Words of praise by our valuable customers</p>
                    </Col>
                </Row>

                <Row className="row-cols-lg-3 row-cols-1">
                    {testimonial.map((data) => {
                    return (
                        <Col key={data.id} className="mb-5">
                            <div className="people">
                                <img src={data.image} alt="" />
                                <div>
                                    <h5 className="mt-1 mb-1">{data.name}</h5>
                                </div>
                            </div>
                            <p className="desc shadow-sm">{data.desc}</p>
                        </Col>
                        );
                    })}
                </Row>
                </Container>
            </div>
        </div>
    )
}

export default TestimonialPage