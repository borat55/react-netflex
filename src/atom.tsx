import { atom } from "recoil";
import { IMovie } from "./api";

export const moviesResult = atom<IMovie[]>({
  key: "moviesResult",
  default: [],
});
