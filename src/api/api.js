import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }

}

export const getProductsLimit = async (limit) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products with a certain limit: ', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/categories`);
        return response.data;
    } catch (error) {
        console.error("Error Fetching Categories: ", error);
        throw error;
    }
};

export const getProduct = async ({ id }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Fetching single product with id: ", error);
        throw error;
    }
}



  
