import {Component} from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import Sukses from "../assets/images/sukses.png";
import axios from "axios";
import {API_URL} from "../utils/constant.js";

export default class Success extends Component {

    componentDidMount() {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                keranjangs.map(function (item) {
                    return axios
                        .delete(API_URL+ "keranjangs/" + item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className={"mt-4 text-center"}>
                <Image src={Sukses} width={"500"} />
                <h2>Sukses Pesan</h2>
                <p>Terimakasih sudah memesan!</p>
                <Button variant={"primary"} as={Link} to={"/"}>
                    Kembali
                </Button>
            </div>
        )
    }
}