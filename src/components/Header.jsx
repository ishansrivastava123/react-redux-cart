import React, { useState } from "react";
import { Container, Nav, Navbar, Table } from "react-bootstrap";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Badge from "@mui/material/Badge";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";

const Header = () => {

    const dispatch = useDispatch();
    const getData = useSelector((state) => state.cartReducer.carts)
    let quantity = 0, total = 0;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const del = (e) => {
        dispatch({
            type: "DEL_CART",
            payload: e.id
        });
        toast.error(e.rname + " Removed");
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{position: "sticky", top: 0, zIndex: 10}}>
            <Container className="container my-2">
                <Nav className="me-auto">
                    <NavLink to="/" className="text-decoration-none text-light">
                        Home
                    </NavLink>
                </Nav>
                {getData.forEach((e) => {
                    quantity += e.qnty;
                    total += (e.qnty * e.price);
                })}
                <Badge
                    className="badge"
                    badgeContent={quantity}
                    color="primary"
                    showZero
                >
                    <ShoppingCartRoundedIcon
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    />
                </Badge>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}>
                    <div className="cart-icon">
                        <p onClick={handleClose}>+</p>
                        {
                            getData.length ? (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Item Pic</th>
                                            <th>Restaurant Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                            getData.map((e, i) => (
                                                <tr key={i}>
                                                    <td><Link to={`/cart/${e.id}`}><img className="item-pic" src={e.imgdata} alt={e.rname} onClick={handleClose} /></Link></td>
                                                    <td>
                                                        <p>{e.rname}</p>
                                                        <p>Price: ₹ {e.price}</p>
                                                        <p>Quantity: {e.qnty}</p>
                                                    </td>
                                                    <td><DeleteIcon onClick={() => del(e)} /></td>
                                                </tr>
                                            ))
                                        }
                                        <p className="total">Total:<b>₹ {total}</b></p>
                                    </tbody>
                                </Table>
                            ) : (
                                <div>
                                    <h5>Your Cart Is Empty</h5>
                                    <RemoveShoppingCartIcon 
                                    onClick={handleClose} /> 
                                </div>
                            )
                        }
                    </div>
                </Menu>
            </Container>
        </Navbar>
    );
};

export default Header;
