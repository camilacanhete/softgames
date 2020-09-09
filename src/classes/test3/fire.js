import * as Particles from 'pixi-particles';
import { Container } from 'pixi.js';

export class Fire extends Container {
    constructor(id, parent, texture) {
        super();

        //csantos: custom properties
        this._id = id;
        this._parent = parent;
        this._elapsedTime = 0;
        this._emitter = new Particles.Emitter(
            this,
            [ texture ],            
            { 
                "alpha": {
                    "start": 1,
                    "end": 0
                },                             
                "scale": {
                    list: [
                        {
                            value: 0.25,
                            time: 0
                        },
                        {
                            value: 1.5,
                            time: 0.25
                        },
                        {
                            value: 1,
                            time: 1
                        }                        
                    ]
                },
                "color": {
                    list: [
                        {
                            value: "fff191",
                            time: 0
                        },
                        {
                            value: "f06d06",
                            time: 0.3
                        },
                        {
                            value: "fb1010",
                            time: 1
                        }
                    ]                    
                },
                "speed": {
                    "start": 250,
                    "end": 50
                },
                "startRotation": {
                    "min": 260,
                    "max": 280
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 0.1,
                    "max": 1
                },
                "blendMode": "normal",
                "frequency": 0.1,
                "emitterLifetime": 0,
                "maxParticles": 10,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 10
                }
            }
           
        );

        this.resize();
        this._parent.stage.addChild(this);
    }

    //csantos: save _parent reference id
    set id(newId) {
        this._id = newId;
    }

    get id() {
        return this._id;
    }

    //csantos: update sprite (usually used to move the object)
    update(time, ticker) {   
        this._elapsedTime += (1 / 60) * time;

        //console.log(ticker.elapsedMS);
        this._emitter.update(this._elapsedTime);
    }

    resize() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }

    //csantos: delete sprite
    delete() {         
        this._parent.stage.removeChild(this); //csantos: remove this from stage
        this._parent.handleDelete(this._id); //csantos: delete reference from parent
        this.removeEvents(); //csantos: remove all events to enable garbage collection
        this.destroy({ children: true }); //csantos: destroy all children aswell
    }
}