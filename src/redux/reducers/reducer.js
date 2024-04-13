import { Toaster, toast } from "react-hot-toast";

const INIT_STATE = {
    carts: []
};

export const cartReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "ADD_CART":
            const find = state.carts.findIndex((e) => e.id === action.payload.id);

            if(find >= 0) {
                state.carts[find].qnty += 1;
                return {
                    ...state,
                    carts: [...state.carts]
                }
            } else {
                action.payload.qnty = 1;
                return {
                    ...state,
                    carts: [...state.carts, action.payload]
                }
            }
        case "REDUCE_CART":
            const search = state.carts.findIndex((e) => e.id === action.payload);

            if(search >= 0) {
                if(state.carts[search].qnty > 1) {
                    state.carts[search].qnty -= 1;
                    return {
                        ...state,
                        carts: [...state.carts]
                    }
                } else {
                    <Toaster />
                    toast.error("Minimum Cart Quantity: 1");
                    state.carts[search].qnty = 1;
                    return {
                        ...state,
                        carts: [...state.carts]
                    }
                }
            }
            break;
        case "DEL_CART":
            return {
                carts: [...state.carts.filter((e) => action.payload !== e.id)]
            }
        default:
            return state
    }
}