import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchInvoices = createAsyncThunk(
    "invoices/fetchInvoices",
    async () => {
        const response = await axios.get("http://localhost:5000/invoice");
        return response.data;
    }
);

export const deleteInvoice = createAsyncThunk(
    "invoices/deleteInvoice",
    async (invoiceId: number, { dispatch }) => {
        await axios.delete(`http://localhost:5000/invoice/${invoiceId}`);
        dispatch(fetchInvoices()); // Refresh the list after deletion
    }
);

// Slice
const invoiceSlice = createSlice({
    name: "invoices",
    initialState: {
        data: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.pending, (state) => {
                state.status = "loading";
                state.error = null; // Reset error on new request
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "An unknown error occurred";
            });
    },
});

export default invoiceSlice.reducer;
