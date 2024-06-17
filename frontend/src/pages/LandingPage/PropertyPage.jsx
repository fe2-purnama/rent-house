import { Container, Row, Col } from "react-bootstrap";
// import { semuaProperty } from "../../data/index.js"; sudah tidak berguna
import { useEffect, useState } from "react";
import axios from "axios";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const response = await axios.get("http://localhost:3000/property/");
      console.log(response.data);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="property-page">
      <div className="property min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">
                All Property
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Lets find the best accommodation that suits your needs.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            {properties.map((property) => {
              return (
                <Col
                  key={property.id}
                  className="shadow rounded"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                >
                  <img
                    src={property.gambar1}
                    alt="unsplash.com"
                    className="w-100 mb-3 rounded-top"
                  />
                  <div className="star mb-2 px-3">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <h5 className="mb-3 px-3">{property.nama_product}</h5>
                  <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                    <p className="m-0 text-primary fw-bold">{property.harga}</p>
                    <button className="btn btn1 rounded-1">Detail</button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PropertyPage;
