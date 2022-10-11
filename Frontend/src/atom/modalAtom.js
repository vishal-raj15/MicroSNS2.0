import { atom, RecoilRoot } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: "ok",
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const userIdState = atom({
  key: "userIdState",
  default: 0,
});
