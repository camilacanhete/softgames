import { Application } from 'pixi.js';
import { DebugText } from '../debug-text';
import { Fire } from './fire';

export class Test3 extends Application {
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
                .add('particle', 'assets/test3/particle2.png')                                              
                .load(this.finishLoading);
    }

    //csantos: start game after all assets are created
    finishLoading(loader, resources) {  
        let i = 0;   
        this.assets.push(new Fire(this.assets.length, this, resources.particle.texture));        
        this.assets.push(new DebugText(this.assets.length, this, "", {fontFamily : 'Roboto', fontSize: 24, fill : 0x000000, align : 'left'}));
        this.ticker.add(this.handleUpdate);
    }
} 