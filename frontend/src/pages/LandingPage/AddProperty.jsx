import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

import { toast, ToastContainer } from 'react-toastify';

const AddProperty = () => {
  const [Property, setProperty] = useState({
    kategori_id: "",
    nama_product: "",
    gambar1: "",
    gambar2: "",
    gambar3: "",
    gambar4: "",
    akses_wifi: "",
    jumlah_kamar: "",
    lokasi: "",
    harga: "",
    ruang_tamu: "",
    garasi: "",
    no_rek: "",
    map: "",
    luas_properti: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProperty({ ...Property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = new Date().getTime().toString();

      await axios.post("http://localhost:3000/property", {
        id,
        ...Property, // Send all form data collected in formData state
      });
      toast.success('Data berhasil ditambahkan!'),
      navigate("/property");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="AddProperty">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} className="mt-5">
            <Card className="p-4 mt-5 border rounded bg-light shadow">
              <h2 className="text-center mt-0 mb-4 display-4 fw-bold">
                Enter Rental <span className="text-danger">Data</span>
              </h2>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        id="kategori_id"
                        name="kategori_id"
                        value={Property.kategori_id}
                        onChange={handleChange}
                        required
                      >
                        <option value={1}>Apartement</option>
                        <option value={2}>Villa</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="nama_product"
                        name="nama_product"
                        placeholder="Name Property"
                        value={Property.nama_product}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="url"
                        className="form-control"
                        id="gambar1"
                        name="gambar1"
                        placeholder="Image"
                        value={Property.gambar1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="url"
                        className="form-control"
                        id="gambar2"
                        name="gambar2"
                        placeholder="Image 2 (optional)"
                        value={Property.gambar2}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="url"
                        className="form-control"
                        id="gambar3"
                        name="gambar3"
                        placeholder="Image 3 (optional)"
                        value={Property.gambar3}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="url"
                        className="form-control"
                        id="gambar4"
                        name="gambar4"
                        placeholder="Image 4 (optional)"
                        value={Property.gambar4}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        id="akses_wifi"
                        name="akses_wifi"
                        value={Property.akses_wifi}
                        onChange={handleChange}
                        required
                      >
                        <option selected>Select WiFi Availability</option>
                        <option value="yes">Free Wifi</option>
                        <option value="no">Not available</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="jumlah_kamar"
                        name="jumlah_kamar"
                        placeholder="how many rooms are available?"
                        value={Property.jumlah_kamar}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lokasi"
                        name="lokasi"
                        placeholder="Location"
                        value={Property.lokasi}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="harga"
                        name="harga"
                        placeholder="Price"
                        value={Property.harga}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        id="ruang_tamu"
                        name="ruang_tamu"
                        value={Property.ruang_tamu}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Living Room Availability
                        </option>
                        <option value="yes">Living room</option>
                        <option value="no">Not available</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        id="garasi"
                        name="garasi"
                        value={Property.garasi}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Garage Availability</option>
                        <option value="yes">Garage</option>
                        <option value="no">Not available</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="no_rek"
                        name="no_rek"
                        placeholder="Bank account"
                        value={Property.no_rek}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="url"
                        className="form-control"
                        id="map"
                        name="map"
                        placeholder="Map URL (optional)"
                        value={Property.map}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="luas_properti"
                        name="luas_properti"
                        placeholder="Building Area"
                        value={Property.luas_properti}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberCheck"
                      >
                        Remember me
                      </label>
                    </div>
                  </Col>
                  <Col md={12}>
                    <button
                      className="btn text-white d-block w-100"
                      type="submit"
                      style={{ backgroundColor: "#1f3265" }}
                    >
                      Add To List
                    </button>
                  </Col>
                </Row>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AddProperty;
