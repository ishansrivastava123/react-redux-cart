import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from 'react-bootstrap';

const CardDetails = () => {

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getData = useSelector((state) => state.cartReducer.carts);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getData.forEach((e) => {
      if(e.id === Number(id)) {
        setData(e);
      }
    })
  }, [getData, id]);

  const send = (e) => {
    dispatch({
      type: "ADD_CART",
      payload: e
    });
    toast.success(" added to cart!");
  }
  
  const reduce = (e) => {
    dispatch({
      type: "REDUCE_CART",
      payload: e.id
    });
    if(e.qnty > 1)
      toast.error(e.rname + "'s quantity reduced!");
  }

  const del = (e) => {
    dispatch({
      type: "DEL_CART",
      payload: e.id
    })
    navigate("/");
    toast.error(e.rname + " Removed");
  }
  
  return (
    <div className='item-details'>
      <h2>Items Details</h2>
      <hr />
      <div className="item">
        <img src={data.imgdata} alt={data.rname} />
        <div className="details">
          <p><b>Restaurant:</b> {data.rname}</p>
          <p><b>Price:</b> ₹ {data.price} per item</p>
          <p><b>Dishes:</b> {data.address}</p>
          <p className='rating'><b>Rating:</b> <span>{data.rating} <StarIcon /></span></p>
          <p><b>Order Review:</b> {data.somedata}</p>
          <p><b>Total:</b> ₹ {data.qnty * data.price}</p>
          <p><b>Remove:</b> <DeleteIcon onClick={() => del(data)} /></p>
        </div>
        <div className="count">
          <Button onClick={() => send(data)} variant="outline-success"><KeyboardDoubleArrowUpIcon /></Button>{' '}
          <p>{data.qnty}</p>
          <Button onClick={() => reduce(data)} variant="outline-danger"><KeyboardDoubleArrowDownIcon /></Button>{' '}
        </div>
      </div>
    </div>
  )
}

export default CardDetails