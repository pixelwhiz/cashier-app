import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/Utils";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../utils/constant";
import axios from "axios";
import { withNavigation } from "../utils/withNavigation";

class TotalPrice extends Component {
    submitTotalPrice = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        };

        axios.post(API_URL + "pesanans", pesanan)
            .then((res) => {
                this.props.navigate('/sukses');
            })
            .catch((error) => {
                console.error("Gagal mengirim pesanan:", error);
            });
    };

    render() {
        const { keranjangs } = this.props;

        const totalPrice = (keranjangs || []).reduce((result, item) => {
            return result + (
                item.total_harga ||
                item.total_price ||
                0
            );
        }, 0);

        const isKeranjangEmpty = keranjangs?.length === 0;

        return (
            <div className="fixed-bottom">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>
                            Total Price :
                            <strong className="float-right mr-2">
                                Rp. {numberWithCommas(totalPrice)}
                            </strong>
                        </h4>
                        <Button
                            variant="primary"
                            className="mb-2 mt-4 mr-2 w-100"
                            size="lg"
                            onClick={() => this.submitTotalPrice(totalPrice)}
                            disabled={isKeranjangEmpty}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />{""}
                            <strong>BAYAR</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TotalPrice;
