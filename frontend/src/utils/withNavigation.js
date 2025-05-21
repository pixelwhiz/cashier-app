// src/utils/withNavigation.js
import { useNavigate } from "react-router-dom";
import React from "react";

export function withNavigation(Component) {
    return function Wrapper(props) {
        const navigate = useNavigate();
        return `<Component {...props} navigate={navigate} />`;
    };
}
