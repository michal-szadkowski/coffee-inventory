import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import {useState} from "react";
import ConfirmDeletePopup from "../popup/confirmDeletePopup";
import {InventoryService} from "../../services/inventoryService";
import {InventoryViewItem} from "./inventoryViewItem";
import Grouping from "../grouping";

export default function ItemsList({inventory, reload, select}: {
    inventory: InventoryItemDTO[],
    reload: () => void,
    select: (arg: InventoryItemDTO) => void
}) {

    let [popup, setPopup] = useState<InventoryItemDTO | null>(null);

    function AcceptDelete() {
        if (popup != null)
            InventoryService.Delete(popup.id).then(x => reload());
        setPopup(null)
    }

    var itemsOpen = inventory.filter(x => x.endDate == null);
    var itemsClosed = inventory.filter(x => x.endDate != null);

    function GetInventoryViewEl(x: InventoryItemDTO, i: number) {
        return (
            <InventoryViewItem item={x} key={i} actions={
                <div>
                    <button onClick={() => select(x)} className="btn btn-info m-1">Edytuj</button>
                    <button onClick={() => setPopup(x)}
                            className="btn btn-danger">
                        Usuń
                    </button>
                </div>}/>
        )
    }

    return <>
        <ConfirmDeletePopup
            isOpen={popup != null}
            onAccept={() => AcceptDelete()}
            onClose={() => setPopup(null)}
        >
            Czy na pewno chcesz usunąć?
        </ConfirmDeletePopup>

        <Grouping text={"Rozpoczęte"} openOnStart={true}>
            {itemsOpen.map((x, i) => GetInventoryViewEl(x, i))}
        </Grouping>

        <Grouping text={"Skończone"} openOnStart={false}>
            {itemsClosed.map((x, i) => GetInventoryViewEl(x, i))}
        </Grouping>
    </>
}