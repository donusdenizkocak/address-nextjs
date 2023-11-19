import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit"

//** Reducers */
import country from "@/store/apps/country"

export const store = configureStore({
    reducer: {
        country
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>