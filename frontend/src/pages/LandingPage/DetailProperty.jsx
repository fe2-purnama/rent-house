import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { numberWithCommas } from "../../utils/utils";
import "../../assets/css/property.css";
import { toast, ToastContainer } from 'react-toastify';

const DetailProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentGambar, setCurrentGambar] = useState("");
  const [jumlahBulan, setJumlahBulan] = useState(1);
  const [harga_total, setTotalHarga] = useState(0);

  const getProperty = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/property/${id}`);
      console.log(response.data);
      setProperty(response.data);
      setCurrentGambar(response.data.gambar1);
      setTotalHarga(response.data.harga); // Set initial total price
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      getProperty(id);
    }
  }, [id]);

  const handleGambarChange = (gambar) => {
    setCurrentGambar(gambar);
  };

  const handleJumlahBulanChange = (event) => {
    const bulan = parseInt(event.target.value, 10);
    setJumlahBulan(bulan);
    setTotalHarga(property.harga * bulan);
  };

  const handlePesanClick = async () => {
    const dataPesanan = {
      jumlahBulan,
      harga_total,
    };

    try {
      await axios.put(`http://localhost:3000/property/${id}`, {
        ...property,
        dataPesanan
      });
      toast.success('Berhasil dipesan!');
    } catch (error) {
      console.error('Error saving data: ', error);
      alert('Terjadi kesalahan saat memesan.');
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <br />
      <br />
      <Row className="property-container">
        <Col
          className="mt-5 shadow rounded image-section"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <div className="card mb-3 mt-3">
            <img
              width={300}
              src={currentGambar}
              className="card-img-top"
              alt={property.nama_product}
            />
          </div>
          <Row>
            <div className="col-md-4 mb-3">
              <img
                src={property.gambar1}
                className=" card-body p-1 thumbnail-fixed-size rounded"
                alt={property.nama_product}
                onClick={() => handleGambarChange(property.gambar1)}
              />
            </div>
            {property.gambar2 && (
              <div className="col-md-4 mb-3">
                <img
                  src={property.gambar2}
                  className=" card-body p-1 thumbnail-fixed-size rounded"
                  alt={property.nama_product}
                  onClick={() => handleGambarChange(property.gambar2)}
                />
              </div>
            )}
            {property.gambar3 && (
              <div className="col-md-4 mb-3">
                <img
                  src={property.gambar3}
                  className="card-body p-1 thumbnail-fixed-size rounded"
                  alt={property.nama_product}
                  onClick={() => handleGambarChange(property.gambar3)}
                />
              </div>
            )}
            {property.gambar4 && (
              <div className="col-md-4 mb-3">
                <img
                  src={property.gambar4}
                  className="card-body p-1 thumbnail-fixed-size rounded"
                  alt={property.nama_product}
                  onClick={() => handleGambarChange(property.gambar4)}
                />
              </div>
            )}
          </Row>
        </Col>

        <Col className="mt-5 detail-section">
          <div className="card shadow no-bordered">
            <div className="card-body">
              <h5 className="card-title">{property.nama_product}</h5>
              <p className="card-text">
                <small className="text-muted">
                  {property.lokasi} <br /> <a href={property.map}>{property.map}</a>
                </small>
              </p>
              <ul className="list-group">
                <li className="list-group-item">
                  <i className="bi bi-wifi"></i> {property.akses_wifi ? "Tersedia WiFi" : "Tidak ada WiFi"},{" "}
                  {property.garasi ? "Garasi" : "Tidak ada garasi"},{" "}
                  {property.ruang_tamu ? "Ruang Tamu" : "Tidak ada ruang tamu"}
                </li>
                <li className="list-group-item">
                  <i className="bi bi-house-door"></i> {property.jumlah_kamar} Kamar
                </li>
                <li className="list-group-item">
                  <i className="bi bi-geo-alt-fill"></i> {property.luas_properti} m<sup>2</sup>
                </li>
                <li className="list-group-item">
                  <i className="bi bi-cash-stack"></i> Rp. {numberWithCommas(property.harga)}/Bulan
                </li>
              </ul>

              <div className="mt-3">
                <label htmlFor="jumlahBulan">Jumlah Bulan:</label>
                <input
                  type="number"
                  id="jumlahBulan"
                  value={jumlahBulan}
                  min="1"
                  onChange={handleJumlahBulanChange}
                  className="form-control"
                />
              </div>

              <div className="mt-3">
                <h5>Total Harga: Rp. {numberWithCommas(harga_total)}</h5>
              </div>

              <button type="button" className="btn btn-primary mt-3" onClick={handlePesanClick}>
                Pesan
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailProperty;
