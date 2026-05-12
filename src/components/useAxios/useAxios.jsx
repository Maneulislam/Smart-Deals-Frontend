
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const axiosInstance = axios.create({
    baseURL: "https://smart-deals-backend-two.vercel.app",
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