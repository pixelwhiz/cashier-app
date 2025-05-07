import {Col, Row} from "react-bootstrap";
import {Result, Categories, NavbarComponent, Menus} from "./components/Index.jsx";
import Container from "react-bootstrap/Container";

import React, {Component} from 'react';
import axios from "axios";
import {API_URL} from "./utils/constant.js";

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            selectedCategory: 'Makanan'
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
            })
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

    render() {

        const { menus, selectedCategory } = this.state;

        return (
            <div className={"App"}>
                <NavbarComponent />
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
                                        />
                                    ))}
                                </Row>
                            </Col>
                            <Result />
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default App;