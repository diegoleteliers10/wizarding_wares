import axios  from "axios";
import { createProduct } from "./adminSlice";

export const createProd = (input) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/productCreated", input)
            return response; 
        } catch (error) {
            alert("Error al crear el producto", error);
        }
    }
} 
