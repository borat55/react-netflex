import { atom } from "recoil";

export const chosenMovieCategory = atom({
  key: "chosenMovieCategory",
  default: "",
});

export const chosenTVCategory = atom({
  key: "chosenTVCategory",
  default: "",
});
