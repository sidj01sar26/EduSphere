import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {

    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
    totalItems : localStorage.getItem("totalItems") 
    ? JSON.parse(localStorage.getItem("totalItems")) 
    : 0,

};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // setTotalItems(state, value) {
        //     state.user = value.payload;
        // },
        // TODO: HW //
        // ADD TO CART
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0){
                // if course is already on the cart do not modify
                toast.error("Course already in Cart");
                return
            }
            // If course is not in the cart then add it to the cart
            state.cart.push(course);
            // update the total quantities and price
            state.totalItems++;
            state.total += course.price;

            // update the localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // Show Toast
            toast.success("Course Added to the Cart")
        },

        // REMOVE CART
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId)

            // If Course is in the cart then remove it
            if(index >= 0){
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1)

                // Update LocalStorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

                // Show Toast
                toast.success("Course Remove from Cart")
            }
        },

        // RESET CART
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0

            // Update LocalStorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    },
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;  