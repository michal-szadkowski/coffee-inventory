import { useEffect, useState } from "react"
import { CoffeeService } from "../../services/coffeeService"
import CoffeeDTO from "../../services/entities/coffeeDTO"
import { CoffeeViewElement } from "./coffeeViewElement"
import CoffeeWizard from "./coffeeWizard"

export default function CoffeeView() {

    let [coffee, setCoffee] = useState<CoffeeDTO[]>([])

    useEffect(() => {
        CoffeeService.GetAll().then(x => setCoffee(x.data));
    }, [])

    console.log(coffee);
    return (
        <div>
            {coffee.map((x, i) =>
                (<CoffeeViewElement coffee={x} key={i}></CoffeeViewElement>))}

            <CoffeeWizard coffee={undefined} submit={(x) => { console.log(x); CoffeeService.Add(x) }} />
        </div>
    )
}