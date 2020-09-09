import { Sprite } from 'pixi.js';
import { Ease } from 'pixi-ease';

export class Card extends Sprite {
    constructor(id, parent, texture) {
        super(texture);  
        
        //csantos: custom properties
        this._id = id; 
        this._parent = parent;
        this._originalWidth = this.width;
        this._originalHeight = this.height;        
        this._done = false;
        this._ease = new Ease();

        //csantos: inherited properties
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        //this.interactive = true; //csantos: if object is interactive, uncomment this line

        this.resize();
        this.bindEvents();   
        this.animate(this._id);
        this._parent.stage.addChild(this);
    }

    //csantos: save _parent reference id
    set id(newId) {
        this._id = newId;
    }

    get id() {
        return this._id;
    }

    //csantos: bindEvents if sprite is interactive
    bindEvents() {
        this.onComplete = this.onComplete.bind(this);
        this._ease.on('complete', this.onComplete);
    }

    animate(pos) {        
        this._ease.removeAll();
        this._ease.add(this, { x: this._targetX, y: this._targetY }, { duration: 2000, wait: 1000 * pos, easing: 'easeIn'});
    }

    //csantos: update sprite (usually used to move the object)
    update() {        
    }

    //csantos: resize and reposition sprite when parent is resized
    resize() {        
        let scale = (window.innerWidth < 1280) ? window.innerWidth / 1280 : 1;     
        let reversedId = 143 - this._id;

        this.width = this._originalWidth * scale;
        this.height = this._originalHeight * scale;        

        this._originalX = ((window.innerWidth - this.width) / 144) * this._id + this.width/2;
        this._originalY = (window.innerHeight / 2) - this.height / 2;
        this._targetX = ((window.innerWidth - this.width) / 144) * reversedId + this.width/2;
        this._targetY = this._originalY + this.height; 

        this.x = (this._done) ? this._targetX : this._originalX;
        this.y = (this._done) ? this._targetY : this._originalY;        
    }

    //csantos: delete sprite
    delete() {         
        this._parent.stage.removeChild(this); //csantos: remove this from stage
        this._parent.handleDelete(this._id); //csantos: delete reference from parent
        this.removeEvents(); //csantos: remove all events to enable garbage collection
        this.destroy({ children: true }); //csantos: destroy all children aswell
    }

    done() {
        return this._done;
    }

    //csantos: on complete animation
    onComplete() {
        this._done = true;
    }

    //csantos: remove all event listeners (necessary for garbage collection)
    removeEvents() {
        this._ease.off('complete', this.onComplete);
    }
}