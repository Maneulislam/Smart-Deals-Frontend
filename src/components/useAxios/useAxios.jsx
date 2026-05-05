
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxios = () => {

    const { user } = use(AuthContext);

    axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user.accessToken}`

        return config;
    })


    return axiosInstance;
}

export default useAxios;