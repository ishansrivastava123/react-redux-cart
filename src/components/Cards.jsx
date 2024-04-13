import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardsData from "./CardsData";
import { useDispatch } from "react-redux";
import { toast} from "react-hot-toast";

const Cards = () => {

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch({
      type: "ADD_CART",
      payload: e
    });
    toast.success(e.rname + " added to cart!");
  }

    return (
        <div className="cards">
            <h2>Add to Cart Projects</h2>
            <hr />
            <div className="row">
            {
              CardsData.map((e, i) => (
                <Card className="card" key={i} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={e.imgdata} />
                    <Card.Body>
                        <Card.Title>{e.rname}</Card.Title>
                        <Card.Text>Price: ₹ {e.price}</Card.Text>
                        <Button 
                        variant="primary"
                        onClick={() => send(e)}>Add To Cart</Button>
                    </Card.Body>
                </Card>
              ))
            }
            </div>
        </div>
    );
};

export default Cards;
