
import {atom} from "recoil"

export const carts = atom({
    key:"cartState ",
    default:[]
})

export const productItem = atom({
    key:"productItem",
    default:[]
})
export const updateTotal = atom({
    key:"updateTotal",
    default: false
})
export const filter = atom({
    key:"filter",
    default: ""
})
