import { useState, useEffect } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"

import { navLink } from "../data/index.js"
import { NavLink, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    let navigate = useNavigate();
    const [changeColor, setChangeColor] = useState(false);

    const changeBackgroundColor = () => {
        if (window.scrollY > 10) {
            setChangeColor(true);
        } else {
            setChangeColor(false);
        }
    }

    useEffect(() => {
        changeBackgroundColor();

        window.addEventListener("scroll", changeBackgroundColor);
    })

    return (
        <div>
            <Navbar bg="light" expand="lg" className={changeColor ? "color-active" : ""}>
            <Container>
                <Navbar.Brand href="#home" className="fs-3 fw-bold">Rent House </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto text-center">
                        {navLink.map((link) => {
                            return (
                                <div key={link.id} className="nav-link">
                                    <NavLink to={link.path} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""
                                    } end>{link.text}</NavLink>
                                </div>
                            );
                        })}
                    </Nav>

                    <div className="text-center">
                        <button className="btn btn1 btn-outline rounded-1">Sign Up</button> 
                        <button className="btn btn2 rounded-1 ms-2" onClick={() => navigate("/login")}>Login</button> 
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    )
}

export default NavbarComponent