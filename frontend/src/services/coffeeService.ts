import axios from "axios";
import CoffeeDTO from "./entities/coffeeDTO";

export namespace CoffeeService {
    const ApiBaseUrl: string = process.env.REACT_APP_API_URL != null ? process.env.REACT_APP_API_URL : "";

    export async function GetAll() {
        const { data, status } = await axios.get<CoffeeDTO[]>(ApiBaseUrl + "/coffee/all");
        console.log(data);

        return { data, status };
    }
}