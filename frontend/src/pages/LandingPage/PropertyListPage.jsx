import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const PropertyListPage = () => {
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
    <div className="container" style={{ paddingTop: "100px" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Kategori</th>
            <th>Nama</th>
            <th>Wifi</th>
            <th>Jml Kamar</th>
            <th>Lokasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={property.id}>
              <td>{index + 1}</td>
              <td>{property.kategori_id}</td>
              <td>{property.nama_product}</td>
              <td>{property.akses_wifi}</td>
              <td>{property.jumlah_kamar}</td>
              <td>{property.lokasi}</td>
              <td>
                <button type="button" class="btn btn-warning">
                  Edit
                </button>
                <button type="button" class="btn btn-danger">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PropertyListPage;
