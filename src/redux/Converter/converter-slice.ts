import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ApiResponse {
    status: number;
    result: string;
    error: {
        code: number;
        message: string;
        description: string;
    } | null;
    data: string[];
}

interface ConvertionApiResponse {
    status: number;
    result: string;
    error: {
        code: number;
        message: string;
        description: string;
    };
    data: {
        fromUnit: string;
        toUnit: string;
        factor: number;
        type: string;
        result: string;
    };
}

interface ConverterState {
    fromUnits: ApiResponse | null;
    toUnits: ApiResponse | null;
    conversionTypes: ApiResponse | null;
    convertedValue: ConvertionApiResponse | null;
    selectedFromUnit: string | null;
    selectedToUnit: string | null;
    actualType: string | null;
    loading: boolean;
    loadingConversion: boolean;
    error: boolean;
    inputValue: number | null;
}

const initialState: ConverterState = {
    fromUnits: null,
    toUnits: null,
    conversionTypes: null,
    convertedValue: null,
    selectedFromUnit: null,
    selectedToUnit: null,
    actualType: null,
    loading: false,
    loadingConversion: false,
    error: false,
    inputValue: null,
};

const jwtToken: string = import.meta.env.VITE_API_JWT_KEY;

export const fetchConversionTypes = createAsyncThunk('converter/fetchConversionTypes', async () => {
    const response = await fetch('http://localhost:8080/api/convert/types', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
});

export const fetchFromUnits = createAsyncThunk('converter/fetchFromUnits', async (type: string) => {
    const response = await fetch(`http://localhost:8080/api/convert/fromUnits?type=${type}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
});

export const fetchToUnits = createAsyncThunk('converter/fetchToUnits', async ({ fromUnit, type }: { fromUnit: string, type: string }) => {
    const response = await fetch(`http://localhost:8080/api/convert/toUnits?fromUnits=${fromUnit}&type=${type}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
});

export const fetchConversion = createAsyncThunk('converter/fetchConversion', async ({ value, fromUnit, toUnit, type }: { value: number, fromUnit: string, toUnit: string, type: string }) => {
    const response = await fetch(`http://localhost:8080/api/convert?value=${value}&fromUnit=${fromUnit}&toUnit=${toUnit}&type=${type}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json();
});

export const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setSelectedFromUnit: (state, action) => {
            state.selectedFromUnit = action.payload;
            state.inputValue = null;
        },
        setSelectedToUnit: (state, action) => {
            state.selectedToUnit = action.payload;
            state.inputValue = null;
        },
        setActualType: (state, action) => {
            state.actualType = action.payload;
            state.selectedFromUnit = null;
            state.selectedToUnit = null;
            state.fromUnits = null;
            state.toUnits = null;
            state.convertedValue = null;
            state.inputValue = null;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversionTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConversionTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.conversionTypes = action.payload;
                state.actualType = action.payload.data[0];
            })
            .addCase(fetchConversionTypes.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchFromUnits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFromUnits.fulfilled, (state, action) => {
                state.loading = false;
                state.fromUnits = action.payload;
                state.selectedFromUnit = action.payload.data[0];
            })
            .addCase(fetchFromUnits.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchToUnits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchToUnits.fulfilled, (state, action) => {
                state.loading = false;
                state.toUnits = action.payload;
                state.selectedToUnit = action.payload.data[1];
            })
            .addCase(fetchToUnits.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(fetchConversion.pending, (state) => {
                state.loadingConversion = true;
            })
            .addCase(fetchConversion.fulfilled, (state, action) => {
                state.loadingConversion = false;
                state.convertedValue = action.payload;
            })
            .addCase(fetchConversion.rejected, (state) => {
                state.loadingConversion = false;
                state.error = true;
            });
    }
});

export const { setSelectedFromUnit, setSelectedToUnit, setActualType, setInputValue } = converterSlice.actions;