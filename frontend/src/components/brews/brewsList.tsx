import {BrewViewElement} from "./brewViewElement";
import {BrewService} from "../../services/brewsService";
import {useState} from "react";
import BrewDTO from "../../services/entities/brewDTO";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";
import ConfirmDeletePopup from "../popup/confirmDeletePopup";
import Grouping from "../grouping";

export default function BrewsList({brews, inventory, select, reload}: {
    brews: BrewDTO[],
    inventory: InventoryItemDTO[],
    select: (brew: BrewDTO) => void
    reload: () => void
}) {

    let [popup, setPopup] = useState<BrewDTO | null>(null);

    function AcceptDelete() {
        if (popup != null)
            BrewService.Delete(popup.id).then(() => reload())
        setPopup(null)
    }

    const extendedBrews = brews.map(x => ({
        brew: x,
        items: inventory.filter(y => x.usage.map(z => z.itemId).includes(y.id))
    }))

    const thisWeekDate = getPrevWeekStart(0);
    const prevWeekDate = getPrevWeekStart(1);
    const thisWeek = extendedBrews.filter(x => x.brew.time.getTime() > thisWeekDate);
    const prevWeek = extendedBrews.filter(x => x.brew.time.getTime() <= thisWeekDate && x.brew.time.getTime() > prevWeekDate);
    const earlier = extendedBrews.filter(x => thisWeekDate && x.brew.time.getTime() <= prevWeekDate);

    function GetBrewViewEl(brew: BrewDTO, items: InventoryItemDTO[], i: number) {
        return (
            <BrewViewElement
                brew={brew} key={i} usedItems={items}
                actions={
                    <div>
                        <button onClick={() => select(brew)} className="btn btn-info m-1">Edytuj
                        </button>
                        <button
                            onClick={() => setPopup(brew)} className="btn btn-danger">Usuń
                        </button>
                    </div>}/>
        );
    }

    return (
        <>
            <ConfirmDeletePopup
                isOpen={popup != null}
                onAccept={() => AcceptDelete()}
                onClose={() => setPopup(null)}
            >
                Czy na pewno chcesz usunąć?
            </ConfirmDeletePopup>

            <Grouping text={"Ten tydzień"} openOnStart={true}>
                {thisWeek.map((x, i) => GetBrewViewEl(x.brew, x.items, i))}
            </Grouping>

            <Grouping text={"Poprzedni tydzień"} openOnStart={true}>
                {prevWeek.map((x, i) => GetBrewViewEl(x.brew, x.items, i))}
            </Grouping>

            <Grouping text={"Wcześniejsze"} openOnStart={false}>
                {earlier.map((x, i) => GetBrewViewEl(x.brew, x.items, i))}
            </Grouping>
        </>
    )
}

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

function getPrevWeekStart(i: number) {
    const msInADay = 24 * 60 * 60 * 1000;
    const weekStart = Date.now() - mod((new Date(Date.now()).getDay() - 1), 7) * msInADay;
    const weekStartWithZeroHours = new Date(weekStart).setHours(0, 0, 0);
    return weekStartWithZeroHours - i * 7 * msInADay;
}