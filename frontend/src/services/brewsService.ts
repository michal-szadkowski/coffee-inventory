import axios from "axios";
import BrewDTO from "./entities/brewDTO";

export namespace BrewService {
    const ApiBaseUrl: string = process.env.REACT_APP_API_URL != null ? process.env.REACT_APP_API_URL : "";

    export async function GetAll() {
        const { data, status } = await axios.get<BrewDTO[]>(ApiBaseUrl + "/brew/all");
        let formatdata = data.map(x => FormatBack(x));
        return { data: formatdata, status };
    }

    export async function Add(coffee: BrewDTO) {
        const { data, status } = await axios.post<BrewDTO>(ApiBaseUrl + "/brew", coffee);
        let formatdata = FormatBack(data);
        return { data: formatdata, status };
    }

    export async function Edit(coffee: BrewDTO) {
        const { data, status } = await axios.put<BrewDTO>(ApiBaseUrl + "/brew", coffee);
        let formatdata = FormatBack(data);
        return { data: formatdata, status };
    }

    export async function Delete(id: string) {
        const { data, status } = await axios.delete<BrewDTO>(ApiBaseUrl + "/brew/", { params: { id: id } });
        let formatdata = FormatBack(data);
        return { data: formatdata, status };
    }

    function FormatBack(item: BrewDTO) {
        return {
            ...item,
            time: new Date(item.time),
        }
    }
}