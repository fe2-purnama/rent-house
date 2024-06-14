import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"

const InvoicePage = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async () => {
        try {
            const response = await axios.get("http://localhost:3000/orders");
            setItems(response.data.buyers);
            console.log(response.data);
        } catch (err) {
            console.log("wrong");
            setItems([]);
        }
    }

    return (
        <div>
            <ul>
                {items.map((data, i) => {
                    <li key={i}>
                        <p>
                            <b>Nama Depan</b> : {data.nama_depan}
                        </p>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default InvoicePage