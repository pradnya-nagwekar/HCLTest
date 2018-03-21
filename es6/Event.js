module.exports = class Event{
    constructor(sender){
        this._sender = sender;
        this._listeners = [];
    }
    /**
    attach listerner
    */
    attach(listener){
        this._listeners.push(listener);
    }
    /**
    notify all listners listening to Event
    */
    notify(args){
        this._listeners.forEach((item)=>{
        item(this._sender,args)
        })
    }
}
