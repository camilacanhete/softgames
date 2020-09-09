import { Application } from 'pixi.js';
import { DebugText } from '../debug-text';
import { Smile } from './smile';
import { CustomText } from './custom-text';

export class Test2 extends Application {
    constructor(options) {
        super(options);

        //csantos: assets pool
        this.pool = {
            "smiles": [],
            "texts": []            
        }; 

        //csantos: all asset references
        this.assets = new Array(4);

        //csantos: time
        this.elapsedTime = 0;
        this.lastSecond = -1;
        this.resources = null;

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
        this.elapsedTime += (1 / 60) * time;
        let roundedElapsedTime = Math.floor(this.elapsedTime);
        
        this.assets.forEach((asset) => {            
            if(asset.type) {
                if(this.lastSecond !== roundedElapsedTime && roundedElapsedTime % 2 === 0) {            
                    this.lastSecond = roundedElapsedTime;                        
                    this.refreshAssets();
                }
            } else {
                asset.update(time, this.ticker); //csantos: update debugger
            }                      
        }, this);
    }

    //csantos: resize all assets
    handleResize() {        
        this.assets.forEach((asset) => {
            asset.resize(this.assets[1].width, this.assets[1].height);            
        }, this);
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
                .add('spritesheet', 'assets/test2/smiles.json')
                .add('words', 'assets/test2/words.json')
                .load(this.finishLoading);
    }

    //csantos: start game after all assets are created
    finishLoading(loader, resources) {  
        let i = 0;              

        //csantos: save for later
        this.resources = resources;

        //csantos: create pool
        for(i = 0; i < 3; i++) {
            this.pool.smiles.push(new Smile(this.pool.smiles.length, this, this.getRandomTexture()));
            this.pool.texts.push(new CustomText(this.pool.texts.length, this, this.getRandomWord()));
        }               

        this.addAssets();
        this.assets.push(new DebugText(this.assets.length, this, "", {fontFamily : 'Roboto', fontSize: 24, fill : 0x000000, align : 'left'}));        
        this.ticker.add(this.handleUpdate);
    }

    //csantos: add assets into stage
    addAssets() {
        for(let i = 0; i < 3; i++) {
            this.assets[i] = this.borrowAsset();                        
            this.assets[i].pos = i;
            this.assets[i].update();            
            this.stage.addChild(this.assets[i]);            
        }        

        this.handleResize();
    }

    //csantos: delete assets from stage and add others
    refreshAssets() {
        for(let i = 0; i < 3; i++) {
            this.stage.removeChild(this.assets[i]);
            this.returnAsset(this.assets[i]);
        }
        this.addAssets();
    }

    //csantos: borrow asset from assets pool
    borrowAsset() {
        const keys = Object.keys(this.pool);
        const type = keys[keys.length * Math.random() << 0];        

        if(this.pool[type].length > 0) {
            return this.pool[type].shift();
        }
        
        return null;
    }

    //csantos: return asset to assets pool
    returnAsset(asset) {
        let type = asset.type;
        this.pool[type].push(asset);
    } 

    getRandomTexture() {        
        const keys = Object.keys(this.resources.spritesheet.textures);
        return this.resources.spritesheet.textures[keys[ keys.length * Math.random() << 0]];        
    }

    getRandomWord() {
        const random = Math.floor(Math.random() * this.resources.words.data.words.length);
        return this.resources.words.data.words[random];        
    }
} 