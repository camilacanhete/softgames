import { Text } from 'pixi.js';

export class CustomText extends Text {    
    constructor(id, parent, text) {
        super(text, {fontFamily : 'Arial', fontSize: 50, padding: 20, fill : 0x000000, align : 'left'});
        
        //csantos: custom properties
        this._id = id; 
        this._pos = 0;
        this._parent = parent;
        this._type = "texts";
        this._originalFontSize = this.style.fontSize;

        //csantos: inherited properties        
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        //this.interactive = true; //csantos: if object is interactive, uncomment this line
        
        //this.resize();
        //this.bindEvents(); //csantos: if object is interactive, uncomment this line
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

    //csantos: update sprite (usually used to animation)
    update() {      
       this.text = this._parent.getRandomWord();      

       //csantos: randomize and update font size
       let scale = (window.innerWidth < 1280) ? window.innerWidth / 1280 : 1;
       this.style.fontSize = (16 + Math.random() * (50 - 16)) * scale; //min: 16, max: 50 
    }

    //csantos: resize and reposition sprite when parent is resized
    resize(centerElementWidth, centerElementHeight) {     
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