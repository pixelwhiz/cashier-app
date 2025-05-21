import {Badge, Col, ListGroup, Row} from "react-bootstrap";
import {Component} from "react";
import {numberWithCommas} from "../utils/Utils.js";
import TotalPrice from "./TotalPrice.jsx";

export default class Result extends Component {
    render() {
        const { keranjangs } = this.props;

        // Filter hanya item yang memiliki product
        const validKeranjangs = keranjangs.filter(item => item.product);

        return (
            <Col md={3} className="mt-2">
                <h4><strong>Result</strong></h4>
                <hr />
                {validKeranjangs.length !== 0 ? (
                    <ListGroup variant="flush">
                        {validKeranjangs.map((menuKeranjang) => (
                            <ListGroup.Item key={menuKeranjang.id}>
                                <Row>
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill variant="success">
                                                {menuKeranjang.jumlah}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product?.nama}</h5>
                                        <p>Rp. {numberWithCommas(menuKeranjang.product?.harga)}</p>
                                    </Col>
                                    <Col>
                                        <p>Rp. {numberWithCommas(
                                            menuKeranjang.total_harga ||
                                            menuKeranjang.total_price ||
                                            0
                                        )}</p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>Keranjang kosong</p>
                )}

                <TotalPrice keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}