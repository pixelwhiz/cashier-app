import {Col, Row} from "react-bootstrap";
import {Result, Categories, NavbarComponent, Menus} from "../components";
import { API_URL } from "../utils/constant.js";
import Container from "react-bootstrap/Container";

import axios from "axios";
import {Component} from "react";
import swal from "sweetalert";

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            selectedCategory: 'Makanan',
            keranjangs: [],
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "products?category.nama="+this.state.selectedCategory)
            .then(res => {
                const menus = res.data;
                this.setState({ menus: menus });
            })
            .catch(error => {
                console.log(error)
            });

        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            axios
                .get(API_URL + "keranjangs")
                .then((res) => {
                    const keranjangs = res.data;
                    this.setState({ keranjangs });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    changeCategory = (value) => {
        this.setState({
            selectedCategory: value,
            menus: []
        })

        axios
            .get(API_URL + "products?category.nama="+value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus: menus });
            })
            .catch(error => {
                console.log(error)
            })
    }

    addCart = (value) => {

        axios
            .get(API_URL + "keranjangs?product.id="+value.id)
            .then(res => {
                if (res.data.length === 0) {

                    const cart = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value,
                    }

                    axios
                        .post(API_URL + "keranjangs", cart)
                        .then((res) => {
                            swal({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang "+cart.product.nama,
                                icon: "success",
                                button: "false",
                                timer: 1000,
                            });
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    const cart = {
                        jumlah: res.data[0].jumlah+1,
                        total_harga: res.data[0].total_harga+value.harga,
                        product: value,
                    }

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, cart)
                        .then((res) => {
                            swal({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang "+cart.product.nama,
                                icon: "success",
                                button: "false",
                            });
                        })
                        .catch(error => {
                            console.log(error)
                        });

                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        const { menus, selectedCategory, keranjangs } = this.state;

        return (
            <>
                <div className={"mt-3"}>
                    <Container fluid>
                        <Row>
                            <Categories changeCategory={this.changeCategory} selectedCategory={selectedCategory} />
                            <Col>
                                <h4><strong>Products</strong></h4>
                                <hr />
                                <Row>
                                    {menus && menus.map((menu) => (
                                        <Menus
                                            key={menu.id}
                                            menu={menu}
                                            addCart={this.addCart}
                                        />
                                    ))}
                                </Row>
                            </Col>
                            <Result keranjangs={keranjangs} {...this.props} />
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}
