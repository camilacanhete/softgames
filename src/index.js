import './styles/main.scss';
import { Config } from './config/config';
import { Test1 } from "./classes/test1/test1";
import { Test2 } from "./classes/test2/test2";
import { Test3 } from "./classes/test3/test3";

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    let game = null;
    const btnContainer = document.getElementById("btnContainer");
    const btnTest1 = document.getElementById("btnTest1");
    const btnTest2 = document.getElementById("btnTest2");
    const btnTest3 = document.getElementById("btnTest3");
    const btnRemove = function() {
        btnContainer.remove();
    };

    btnTest1.addEventListener("click",() => {
        btnRemove();
        game = new Test1(Config);
    });

    btnTest2.addEventListener("click",() => {
        btnRemove();
        game = new Test2(Config);
    });

    btnTest3.addEventListener("click",() => {
        btnRemove();
        game = new Test3(Config);
    });
});