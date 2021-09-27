import { configureStore } from "@reduxjs/toolkit"
import { goodsApi } from "./rtk"

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer
  },
  middleware: (m) => m().concat(goodsApi.middleware)
})
