// src/components/NavbarComponent.jsx
import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { navLink } from "../data/index.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="fs-3 fw-bold">
            Rent House
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              {navLink.map((link) => {
                return (
                  <div key={link.id} className="nav-link">
                    <NavLink
                      to={link.path}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      end
                    >
                      {link.text}
                    </NavLink>
                  </div>
                );
              })}
              {user && user.role === "1" && (
                <NavLink to="/transactions">Transactions</NavLink>
              )}
              {user && user.role === "2" && (
                <NavLink to="/userlist">User List</NavLink>
              )}
              {user && user.role === "3" && (
                <NavLink to="/list-property">Add Property</NavLink>
              )}
              {user && user.role === "4" && (
                <>
                  <NavLink to="/userlist">User List</NavLink>
                  <NavLink to="/owners">Owner List</NavLink>
                </>
              )}
            </Nav>
            <div className="text-center">
              {user ? (
                <button className="btn btn2 rounded-1 ms-2" onClick={logout}>
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="btn btn1 btn-outline rounded-1"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </button>
                  <button
                    className="btn btn2 rounded-1 ms-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
