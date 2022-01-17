import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userFetchResult } from '../../utils/configs/types/api';
import { loginArg } from "../../utils/configs/types/global";
import { RootState, AppDispatch } from '../store/store';
import { fetchTemp } from '../../utils/helpers/index';
import { apiRoute } from "../../utils/configs/constants";

export const loginThunk = createAsyncThunk<
userFetchResult,
loginArg,
{
    state : RootState,
    dipatch : AppDispatch,
    rejectValue : {error : string}
}
>(
    'user/login',
    async (args : loginArg , thunkApi) => {
        const result = await fetchTemp<loginArg, userFetchResult>(apiRoute.admin, "POST", args) as { result : userFetchResult, error : string | boolean};
        if( !result || result.error ) return thunkApi.rejectWithValue({error : result.error as string});

        return result.result;
    }
)
export const userSlice = createSlice({
    name          : 'user',
    initialState  : { data : {} as userFetchResult,
                      error :  false as (boolean | string),
                      isLoading : false
                    },
    reducers      : {
        isDarkModeReducer : (state , action: PayloadAction<"1" | "0">) => {
            console.log(action);
            state.data.is_dark_theme = action.payload
        }
    },
    extraReducers : builder => {
        builder
        .addCase(loginThunk.fulfilled, (state , { payload }) => {
            state.data      = payload;
            state.isLoading = false;
            state.error     = false;
        })
        .addCase(loginThunk.rejected, (state, { payload })=> {
            state.isLoading = false;
            state.error     = payload!.error || false;
            
        })
        .addCase(loginThunk.pending, (state) => {
            state.isLoading = true;
            state.error     = false;
        })
    } 
    
});
export default userSlice.reducer;
export const { isDarkModeReducer } = userSlice.actions