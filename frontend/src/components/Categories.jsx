import React, { Component } from "react";
import PropTypes from 'prop-types'; // Add this import
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constant.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese, faCoffee, faUtensils } from "@fortawesome/free-solid-svg-icons";


const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className={"mr-2"} />;
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className={"mr-2"} />;

    return <FontAwesomeIcon icon={faUtensils} className={"mr-2"} />;
};

// Add PropTypes for Icon component
Icon.propTypes = {
    nama: PropTypes.string.isRequired,
};

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { categories } = this.state;
        const { changeCategory, selectedCategory } = this.props;

        return (
            <Col md={2} mt={2}>
                <h4>
                    <strong>Categories</strong>
                </h4>
                <hr />

                <ListGroup>
                    {categories &&
                        categories.map((category) => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => changeCategory(category.nama)}
                                className={selectedCategory === category.nama ? "category-active" : "category-active"}
                            >
                                <h5>
                                    <Icon nama={category.nama} /> {category.nama}
                                </h5>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Col>
        );
    }
}

// Add PropTypes for Categories component
Categories.propTypes = {
    changeCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
};