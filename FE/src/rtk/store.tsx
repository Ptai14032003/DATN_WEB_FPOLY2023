import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import moviesApi from './movies/movies'
import guestApi from './qlGuest/qlGuest'
import phongChieuApi from './qlPhongChieu/qlPhongChieu'
import discountApi from './discount/discount'
import nhanSuApi from './qlNhanSu/qlNhanSu'
import suatChieuApi from './qlSc/qlSc'
import authApi from './auth/auth'
import actorApi from './actors/actors'
import countryApi from './countries/countries'
import genresApi from './genres/genres'
import moviesApiPerson from './moviesPerson/moviesPerson'
export const store = configureStore({
    reducer: {
        phongChieu: phongChieuApi.reducer,
        discount: discountApi.reducer,
        personnels: nhanSuApi.reducer,
        showtimes: suatChieuApi.reducer,
        movies: moviesApi.reducer,
        auth: authApi.reducer,
        users: guestApi.reducer,
        actor: actorApi.reducer,
        countries: countryApi.reducer,
        list_genres: genresApi.reducer,
        moviesPerson: moviesApiPerson.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(moviesApi.middleware)
            .concat(guestApi.middleware)
            .concat(phongChieuApi.middleware)
            .concat(nhanSuApi.middleware)
            .concat(suatChieuApi.middleware)
            .concat(discountApi.middleware)
            .concat(authApi.middleware)
            .concat(actorApi.middleware)
            .concat(countryApi.middleware)
            .concat(genresApi.middleware)
            .concat(moviesApiPerson.middleware)
});


setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch