export class FileHTML5 {
    constructor(o){
        this.evtNode={},
        this.file=null,
        this.name=null,
        this.size=null,
        this.type=null,
        this.id  =null,
        this.dateModified=null,
        this.bytesUploaded=0,
        this.boundEventHandler=null,
        this.xhrWithCredentials=true,
        this.xhrHeaders={};
        if (this.isValidFile(o)) {
            this.file = o;
        }
        else if (this.isValidFile(o.file)) {
            this.file = o.file;
        }
        else {
            this.file = false;
        }
        if (this.file && this.canUpload()) {
            //this.file = file;
            this.name = this.file.name || this.file.fileName;
            this.size = this.file.size;
            this.type = this.file.type;
            this.file = this.file;
            this.id = this.getID();
            if (this.file.hasOwnProperty("lastModifiedDate")) {
                this.dateModified = this.file.lastModifiedDate;
            }
        }
        this.evtNode[this.id] = document.createElement('tt');
    }
    /* 文件类型检查(HTML5.File) */
    isValidFile(file) {
        return (window && window.File && file instanceof File);
    }
       /**
        *  检查浏览器是否支持 FormData 及 XMLHttpRequest
        * @method canUpload
        * @static
        */
    canUpload() {
        return (window && window.FormData && window.XMLHttpRequest);
    }
    each(a,f){for(let i in a){if(a.hasOwnProperty(i)) f(a[i],i)}}
    on(ev,fn){this.evtNode[this.id].addEventListener(ev,fn)}
    detach(ev,fn){this.evtNode[this.id].removeEventListener(ev,fn),this.evtNode[this.id].remove()}
    fire(e,o={}){
		let evt = new Event(e);
		Object.assign(evt,o);
		this.evtNode[this.id].dispatchEvent(evt);
    }
    getID(){
        let t = "e";
        for (let e = 0; e < 8; e++)
            t += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        return t
    }
    _uploadEventHandler(event){
        let xhr = this.xhr;
        switch (event.type) {
            case "progress":
                this.fire("uploadprogress", {originEvent: event,
                                                bytesLoaded: event.loaded,
                                                bytesTotal: this.size,
                                                percentLoaded: Math.min(100, Math.round(10000*event.loaded/this.size)/100),
                                                file:this
                                               });
                this.bytesUploaded =  event.loaded;
                break;

            case "load":
                if (xhr.status >= 200 && xhr.status <= 299) {
                    this.fire("uploadcomplete", {originEvent: event,
                                                    data: event.target.responseText,file:this});
                    let xhrupload = xhr.upload;
                        
                    xhrupload.removeEventListener ("progress", this.boundEventHandler);
                    xhrupload.removeEventListener ("error",  this.boundEventHandler);
                    xhrupload.removeEventListener ("abort",  this.boundEventHandler);
                    xhr.removeEventListener ("load",  this.boundEventHandler);
                    xhr.removeEventListener ("error",  this.boundEventHandler);
                    xhr.removeEventListener ("readystatechange",  this.boundEventHandler);

                    this.xhr = null;
                }
                else {
                    this.fire("uploaderror", {originEvent: event,
                                                data: xhr.responseText,
                                                status: xhr.status,
                                                statusText: xhr.statusText,
                                                source: "http",
                                                file:this });
                }
                break;

            case "error":
                this.fire("uploaderror", {originEvent: event,
                                                data: xhr.responseText,
                                                status: xhr.status,
                                                statusText: xhr.statusText,
                                                source: "io",file:this});
                break;

            case "abort":
                this.fire("uploadcancel", {originEvent: event});
                break;

            case "readystatechange":
                this.fire("readystatechange", {readyState: event.target.readyState,
                                                originEvent: event,file:this});
                break;
        }
    }
    startUpload(url, parameters, fileFieldName){
        this.bytesUploaded = 0;
        this.xhr = new XMLHttpRequest();
        this.boundEventHandler = this._uploadEventHandler.bind(this);
        let uploadData = new FormData(),
            fileField = fileFieldName || "Filedata",
            xhr = this.xhr,
            xhrupload = this.xhr.upload,
            boundEventHandler = this.boundEventHandler;
        this.each(parameters, function (value, key) {uploadData.append(key, value);});
        uploadData.append(fileField, this.file);

        xhr.addEventListener ("loadstart", boundEventHandler, false);
        xhrupload.addEventListener ("progress", boundEventHandler, false);
        xhr.addEventListener ("load", boundEventHandler, false);
        xhr.addEventListener ("error", boundEventHandler, false);
        xhrupload.addEventListener ("error", boundEventHandler, false);
        xhrupload.addEventListener ("abort", boundEventHandler, false);
        xhr.addEventListener ("abort", boundEventHandler, false);
        xhr.addEventListener ("loadend", boundEventHandler, false);
        xhr.addEventListener ("readystatechange", boundEventHandler, false);

        xhr.open("POST", url, true);
        xhr.withCredentials = this.xhrWithCredentials;
        this.each(this.xhrHeaders, function (value, key) {
            xhr.setRequestHeader(key, value);
        });
        xhr.send(uploadData);
        this.fire("uploadstart", {xhr: xhr});
    }
}
