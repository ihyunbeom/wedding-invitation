import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ModalProvider } from "./component/modal"
import { StoreProvider } from "./component/store"
import { coverTop, scheduleBanner, photo01, letter00, photo02, parentsGroom, parentsBride, letterGroom, letterBride } from "./images";
// 또는 from "@/images" (별칭을 쓰고 있다면)


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ModalProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ModalProvider>
  </React.StrictMode>,
)
