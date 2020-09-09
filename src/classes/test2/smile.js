import { Sprite } from 'pixi.js';

export class Smile extends Sprite {
    constructor(id, parent, texture) {
        super(texture);  
        
        //csantos: custom properties
        this._id = id; 
        this._pos = 0;
        this._parent = parent;
        this._type = "smiles";
        this._originalWidth = this.width / 4;
        this._originalHeight = this.height / 4;              

        //csantos: inherited properties
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        //this.interactive = true; //csantos: if object is interactive, uncomment this line

        //this.resize();
        this.bindEvents();   
        //this._parent.stage.addChild(this);
    }

    //csantos: save _parent reference id
    set id(newId) {
        this._id = newId;
    }

    get id() {
        return this._id;
    }

    //csantos: position inside assets array
    set pos(newPos) {
        this._pos = newPos;
    }

    get pos() {
        return this._pos;
    }

    //csantos: type
    set type(newType) {
        this._type = newType;
    }

    get type() {
        return this._type;
    }

    //csantos: bindEvents if sprite is interactive
    bindEvents() {        
    }

    //csantos: update sprite (usually used to move the object)
    update() {     
        this.texture = this._parent.getRandomTexture();
    }

    //csantos: resize and reposition sprite when parent is resized
    resize(centerElementWidth, centerElementHeight) {        
        let scale = (window.innerWidth < 1280) ? window.innerWidth / 1280 : 1;
        this.width = this._originalWidth * scale;
        this.height = this._originalHeight * scale;                       

        this.x = window.innerWidth / 2 + (((centerElementWidth + this.width) / 2) * (this._pos - 1));        
        this.y = window.innerHeight / 2;
    }

    //csantos: delete sprite
    delete() {         
        this._parent.stage.removeChild(this); //csantos: remove this from stage
        this._parent.handleDelete(this._id); //csantos: delete reference from parent
        this.removeEvents(); //csantos: remove all events to enable garbage collection
        this.destroy({ children: true }); //csantos: destroy all children aswell
    }    

    //csantos: remove all event listeners (necessary for garbage collection)
    removeEvents() {
    }
}