import { Text } from 'pixi.js';

export class DebugText extends Text {    
    constructor(id, parent, text, style, canvas) {
        super(text, style, canvas);
        
        this._id = id; 
        this._parent = parent;
        //this.interactive = true; //csantos: if object is interactive, uncomment this line
        
        this.resize();
        //this.bindEvents(); //csantos: if object is interactive, uncomment this line
        this._parent.stage.addChild(this);
    }

    //csants: save _parent reference id
    id(newId) {
        this._id = newId;
    }

    //csantos: bindEvents if sprite is interactive
    bindEvents() {
        this.onClick = this.onClick.bind(this);
        this.on('mousedown', this.onClick);
        this.on('touchstart', this.onClick);
    }

    //csantos: update sprite (usually used to animation)
    update(time, ticker) {      
        this.text = "FPS: " + ticker.FPS + "\n"; 
        this.text += "MIN FPS: " + ticker.minFPS + "\n"; 
        this.text += "MAX FPS: " + ticker.maxFPS + "\n"; 
    }

    //csantos: resize and reposition sprite when parent is resized
    resize() {        
        this.x = 0;
        this.y = 0;
        this.anchor.x = 0;
        this.anchor.y = 0;
    }

    //csantos: delete sprite
    delete() {         
        this._parent.stage.removeChild(this); //csantos: remove this from stage
        this._parent.handleDelete(this._id); //csantos: delete reference from parent
        this.removeEvents(); //csantos: remove all events to enable garbage collection
        this.destroy({ children: true }); //csantos: destroy all children aswell
    }

    //csantos: make an action when sprite is clicked
    onClick() {        
    }


    //csantos: remove all event listeners (necessary for garbage collection)
    removeEvents() {
        this.off('mousedown', this.onClick);
        this.off('touchstart', this.onClick);
    }
}