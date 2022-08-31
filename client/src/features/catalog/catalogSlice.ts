import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter  = createEntityAdapter<Product>();

//return list of product 
export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'category/fetchProductsAsync',
    async(_,GetThunkAPI)=>{
        try {
            return await agent.Catalog.list()
        } catch (error:any) {
           return GetThunkAPI.rejectWithValue({error:error.data})
        }
    }
) 
//return single product in detail's page
export const fetchProductAsync = createAsyncThunk<Product,number>(
    'category/fetchProductAsync',
    async(productId,GetThunkAPI)=>{
        try {
            return await agent.Catalog.details(productId)
        } catch (error:any) {
            return GetThunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state,action) => {
            console.log(action.payload)
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending,(state)=>{
            state.status = 'pendingFetchProduct';
        });
        
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected,(state,action)=>{
            console.log(action);
            state.status = 'idle';
        });
    })
})
export const productSelectors = productsAdapter.getSelectors((state:RootState)=>state.catalog);