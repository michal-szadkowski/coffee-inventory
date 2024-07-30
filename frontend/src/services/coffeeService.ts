import axios from "axios";
import CoffeeDTO from "./entities/coffeeDTO";

export namespace CoffeeService {
    const ApiBaseUrl: string = (window as any)._env_.REACT_APP_API_URL;

    export async function GetAll() {
        const {data, status} = await axios.get<CoffeeDTO[]>(ApiBaseUrl + "/coffee/all");
        return {data, status};
    }

    export async function Add(coffee: CoffeeDTO) {
        const {data, status} = await axios.post<CoffeeDTO>(ApiBaseUrl + "/coffee", coffee);
        return {data, status};
    }

    export async function Edit(coffee: CoffeeDTO) {
        const {data, status} = await axios.put<CoffeeDTO>(ApiBaseUrl + "/coffee", coffee);
        return {data, status};
    }

    export async function Delete(id: string) {
        const {data, status} = await axios.delete<CoffeeDTO>(ApiBaseUrl + "/coffee/", {params: {id: id}});
        return {data, status};
    }
}