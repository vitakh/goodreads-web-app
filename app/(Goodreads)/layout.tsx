'use client';
import { ReactNode } from "react";
import GoodreadsNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
export default function GoodreadsLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <Provider store={store}>
                <div id="wd-kambaz">
                    <div className="d-flex">
                        <div>
                            <GoodreadsNavigation />
                        </div>
                    </div>
                    <div className="wd-main-content-offset p-3 flex-fill">
                        {children}
                    </div>
                </div>
        </Provider>

    );}