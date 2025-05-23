import React from "react";
import {Card, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {numberWithCommas} from "../utils/Utils.js";

const Menus = ({ menu, addCart }) => {
    return (
        <Col md={4} xs={6} className={"mb-4"}>
            <Card className={"shadow"} onClick={() => addCart(menu)}>
                <Card.Img
                    variant="top"
                    src={
                        "src/assets/images/" +
                        menu.category.nama.toLowerCase() +
                        "/" +
                        menu.gambar
                    }
                />
                <Card.Body>
                    <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                    <Card.Text>
                        Rp. {numberWithCommas(menu.harga)}

                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus