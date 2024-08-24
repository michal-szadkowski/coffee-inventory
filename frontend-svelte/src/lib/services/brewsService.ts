export const ssr = false;
import axios from "axios";
import type {BrewDTO} from "$lib/services/entities/brewDTO";

export namespace BrewService {
    const ApiBaseUrl: string = "http://192.168.0.71:5001";

    export async function GetAll() {
        const {data, status} = await axios.get<BrewDTO[]>(ApiBaseUrl + "/brew/all");
        let formatdata = data.map(x => FormatBack(x));
        return {data: formatdata, status};
    }

    export async function Add(coffee: BrewDTO) {
        const {data, status} = await axios.post<BrewDTO>(ApiBaseUrl + "/brew", coffee);
        let formatdata = FormatBack(data);
        return {data: formatdata, status};
    }

    export async function Edit(coffee: BrewDTO) {
        const {data, status} = await axios.put<BrewDTO>(ApiBaseUrl + "/brew", coffee);
        let formatdata = FormatBack(data);
        return {data: formatdata, status};
    }

    export async function Delete(id: string) {
        const {data, status} = await axios.delete<BrewDTO>(ApiBaseUrl + "/brew/", {params: {id: id}});
        let formatdata = FormatBack(data);
        return {data: formatdata, status};
    }

    function FormatBack(item: BrewDTO) {
        return {
            ...item,
            time: new Date(item.time),
        }
    }
}