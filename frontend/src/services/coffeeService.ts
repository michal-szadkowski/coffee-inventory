import axios from "axios";
import CoffeeDTO from "./entities/coffeeDTO";

export namespace CoffeeService {
    const ApiBaseUrl: string = process.env.REACT_APP_API_URL != null ? process.env.REACT_APP_API_URL : "";

    export async function GetAll() {
        const { data, status } = await axios.get<CoffeeDTO[]>(ApiBaseUrl + "/coffee/all");
        return { data, status };
    }

    export async function Add(coffee: CoffeeDTO) {
        const { data, status } = await axios.post<CoffeeDTO>(ApiBaseUrl + "/coffee", coffee);
        return data;
    }

    export async function Edit(coffee: CoffeeDTO) {
        const { data, status } = await axios.patch<CoffeeDTO>(ApiBaseUrl + "/coffee", coffee);
        return data;
    }

    export async function Delete(id: string) {
        const { data, status } = await axios.delete<CoffeeDTO>(ApiBaseUrl + "/coffee/", { params: { id: id } });
        return data;
    }
}