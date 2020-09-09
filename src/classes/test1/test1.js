import { Application } from 'pixi.js';
import { Card } from './card';
import { DebugText } from '../debug-text';

export class Test1 extends Application {
    constructor(options) {
        super(options);

        //csantos: all asset references
        this.assets = []; 

        //csantos: custom functions
        this.bindEvents();
        this.appendView();
        this.loadAssets();
    }

    //csantos: bind global events like window resize into game application
    bindEvents() { 
        this.finishLoading = this.finishLoading.bind(this); 
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleResize = this.handleResize.bind(this);

        window.addEventListener('resize', this.handleResize);
    }

    //csantos: update all assets
    handleUpdate(time) {
        this.assets.forEach((asset) => {
            asset.update(time, this.ticker);
        }, this);
    }

    //csantos: resize all assets
    handleResize() {
        let index = 0;
        this.assets.forEach((asset) => {
            asset.resize();
            if(!asset.done()) {
                asset.animate(index);
                index++;
            }
        });
    }

    //csantos: delete a reference of an asset and update references from other assets
    handleDelete(id) {        
        this.assets.forEach((asset, index) => {
            if(id === index) {
                this.assets.splice(id, 1);
            } else if(index > id) {
                this.assets[index].id = index - 1;
            }            
        }, this);    
    }

    //csantos: append this application into HTML body
    appendView() {
        document.body.appendChild(this.view);
    }

    //csantos: load all game assets
    loadAssets() {
        this.loader
                .add('card_1', 'assets/test1/img_card_1.png')
                .add('card_2', 'assets/test1/img_card_2.png')
                .load(this.finishLoading);
    }

    //csantos: start game after all assets are created
    finishLoading(loader, resources) {  
        let i = 0;              
        for(i = 0; i < 144; i++) {
            if(i % 2 === 0) {
                this.assets.push(new Card(this.assets.length, this, resources.card_2.texture));
            } else {
                this.assets.push(new Card(this.assets.length, this, resources.card_1.texture));
            }            
        }        
        this.assets.push(new DebugText(this.assets.length, this, "", {fontFamily : 'Roboto', fontSize: 24, fill : 0x000000, align : 'left'}));
        this.ticker.add(this.handleUpdate);
    }
} 