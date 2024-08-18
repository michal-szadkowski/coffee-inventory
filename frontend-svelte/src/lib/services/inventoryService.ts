import axios from "axios";
import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO";


export module InventoryService {
    const ApiBaseUrl: string = "http://localhost:5001";

    export async function GetAll() {
        const {data, status} = await axios.get<InventoryItemDTO[]>(ApiBaseUrl + "/inventory/all");
        let formatdata = data.map(x => FormatBack(x));
        return {data: formatdata, status};
    }

    export async function Add(item: InventoryItemDTO) {
        const {data, status} = await axios.post<InventoryItemDTO>(ApiBaseUrl + "/inventory", Format(item));
        let formatdata = FormatBack(data);
        return {data: formatdata, status};
    }

    export async function Edit(item: InventoryItemDTO) {
        const {data, status} = await axios.put<InventoryItemDTO>(ApiBaseUrl + "/inventory", Format(item));
        let formatdata = FormatBack(data);
        return {data: formatdata, status};
    }

    export async function Delete(id: string) {
        const {data, status} = await axios.delete<InventoryItemDTO>(ApiBaseUrl + "/inventory/", {params: {id: id}});
        let formatdata = FormatBack(data);
        return {data: formatdata, status};
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
            endDate: item.endDate !== undefined && item.endDate !== null ? new Date(item.endDate) : undefined
        }
    }
}