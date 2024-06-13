import { Container, Row, Col } from "react-bootstrap";
import { semuaProperty } from "../../data/index.js";

const PropertyPage = () => {
  return (
    <div className="property-page">
      <div className="property min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">Semua Property</h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Col>
          </Row>

          <Row className="mb-5">
            {semuaProperty.map((property) => {
              return (
                  <Col key={property.id} className="shadow rounded" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={property.delay}>
                      <img src={property.image} alt="unsplash.com" className="w-100 mb-3 rounded-top"/>
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
                          <button className="btn btn1 rounded-1">{property.detail}</button>
                      </div>
                  </Col>
                );
            })}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default PropertyPage