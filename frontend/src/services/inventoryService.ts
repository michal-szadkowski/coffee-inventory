import axios from "axios";
import { InventoryItemDTO } from "./entities/inventoryItemDTO";

export namespace InventoryService {
    const ApiBaseUrl: string = process.env.REACT_APP_API_URL != null ? process.env.REACT_APP_API_URL : "";

    export async function GetAll() {
        const { data, status } = await axios.get<InventoryItemDTO[]>(ApiBaseUrl + "/inventory/all");
        let formatdata = data.map(x => FormatBack(x));
        return { formatdata, status };
    }

    export async function Add(item: InventoryItemDTO) {
        const { data, status } = await axios.post<InventoryItemDTO>(ApiBaseUrl + "/inventory", Format(item));
        return { data, status };
    }

    export async function Edit(item: InventoryItemDTO) {
        const { data, status } = await axios.put<InventoryItemDTO>(ApiBaseUrl + "/inventory", Format(item));
        return { data, status };
    }

    export async function Delete(id: string) {
        const { data, status } = await axios.delete<InventoryItemDTO>(ApiBaseUrl + "/inventory/", { params: { id: id } });
        return { data, status };
    }

    function Format(item: InventoryItemDTO) {
        return {
            ...item,
            startDate: item.startDate?.toISOString().slice(0, 10),
            endDate: item.endDate?.toISOString().slice(0, 10),
        }
    }
    function FormatBack(item: InventoryItemDTO) {
        return {
            ...item,
            startDate: new Date(item.startDate),
            endDate: item.endDate !== undefined ? new Date(item.endDate) : undefined
        }
    }
}