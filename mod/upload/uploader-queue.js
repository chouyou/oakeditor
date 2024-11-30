export class UploaderQueue {
    constructor(o){
        this.CONTINUE = "continue",
        this.STOP = "stop",
        this.RESTART_ASAP = "restartasap",
        this.RESTART_AFTER = "restartafter",
        this.STOPPED = "stopped",
        this.UPLOADING = "uploading",
        this.NAME = 'uploaderqueue',
        this.queuedFiles = [];
        this.uploadRetries = {};
        this.numberOfUploads = 0;
        this.currentUploadedByteValues = {};
        this.currentFiles = {};
        this.totalBytesUploaded = 0;
        this.totalBytes = 0,
        this._currentState= UploaderQueue.STOPPED,
        this.uploadCompleteHandler=null,
        this.uploadProgressHandler=null,
        this.uploadStartHandler=null,
        this.uploadCancelHandler=null,
        this.uploadErrorHandler=null,
        this.simUploads= 2,
        this.errorAction= {
            value: "continue",
            validator  (val) {
                return (
                    val === this.CONTINUE ||
                    val === this.STOP ||
                    val === this.RESTART_ASAP ||
                    val === this.RESTART_AFTER
                );
            }
        },
        this.bytesUploaded= 0,
        this.bytesTotal=  0,
        this.fileList= [],
        this.fileFieldName= "Filedata",
        this.uploadURL= '',
        this.uploadHeaders={},
        this.withCredentials= true,
        this.perFileParameters= {},
        this.retryCount= 3,
        this.Event=new WeakMap(),
        Object.assign(this,o)
    }
    _uploadStartHandler (event) {
        let updatedEvent = {};
        updatedEvent.file = event.target;
        updatedEvent.originEvent = event;

        this.fire("uploadstart", updatedEvent);
    }
    each (a,f){for(let i=0;i< a.length;i++)f(a[i]);}
    fire(s,o={}){
		let evt = new Event(s);
		Object.assign(evt,o);
		document.dispatchEvent(evt);
    }
    _uploadErrorHandler(event) {
        let errorAction = this.errorAction,
            updatedEvent = event,
            fileid,
            retries;
        updatedEvent.file = event.target;
        updatedEvent.originEvent = event;
        this.numberOfUploads-=1;
        delete this.currentFiles[event.target.id];
        this._detachFileEvents(event.target);
        event.target.cancelUpload();
        if (errorAction === UploaderQueue.STOP) {
            this.pauseUpload();
        }
        else if (errorAction === UploaderQueue.RESTART_ASAP) {
            fileid = event.target.id;
            retries = this.uploadRetries[fileid] || 0;

            if (retries < this.retryCount) {
                this.uploadRetries[fileid] = retries + 1;
                this.addToQueueTop(event.target);
            }
            this._startNextFile();
        }
        else if (errorAction === UploaderQueue.RESTART_AFTER) {
            fileid = event.target.id;
            retries = this.uploadRetries[fileid] || 0;

            if (retries < this.retryCount) {
                this.uploadRetries[fileid] = retries + 1;
                this.addToQueueBottom(event.target);
            }
            this._startNextFile();
        }
        this.fire("uploaderror", updatedEvent);
    }
    _startNextFile() {
        if (this.queuedFiles.length > 0) {
            let currentFile = this.queuedFiles.shift(),
                fileId = currentFile.id,
                parameters = this.perFileParameters,
                fileParameters = parameters.hasOwnProperty(fileId) ? parameters[fileId] : parameters;
            this.currentUploadedByteValues[fileId] = 0;
            this.uploadCompleteHandler = this._uploadCompleteHandler.bind(this);
            this.uploadProgressHandler = this._uploadProgressHandler.bind(this);
            this.uploadStartHandler = this._uploadStartHandler.bind(this);
            this.uploadCancelHandler = this._uploadCancelHandler.bind(this);
            this.uploadErrorHandler = this._uploadErrorHandler.bind(this);
            currentFile.on("uploadstart", this.uploadStartHandler);
            currentFile.on("uploadprogress", this.uploadProgressHandler);
            currentFile.on("uploadcomplete", this.uploadCompleteHandler);
            currentFile.on("uploaderror", this.uploadErrorHandler);
            currentFile.on("uploadcancel", this.uploadCancelHandler);

            currentFile.xhrHeaders = this.uploadHeaders;
            currentFile.xhrWithCredentials = this.withCredentials;

            currentFile.startUpload(this.uploadURL, fileParameters, this.fileFieldName);

            this._registerUpload(currentFile);
        }
    }

    /**
    * Register a new upload process.
    *
    * @method _registerUpload
    * @private
    */
    _registerUpload(file) {
        this.numberOfUploads += 1;
        this.currentFiles[file.id] = file;
    }

    /**
    * Unregisters a new upload process.
    *
    * @method _unregisterUpload
    * @private
    */
    _unregisterUpload(file) {
        if (this.numberOfUploads > 0) {
            this.numberOfUploads -= 1;
        }

        delete this.currentFiles[file.id];
        delete this.uploadRetries[file.id];

        this._detachFileEvents(file);
    }

    _detachFileEvents(file) {
        
        file.detach("uploadstart", this.uploadStartHandler);
        file.detach("uploadprogress", this.uploadProgressHandler);
        file.detach("uploadcomplete", this.uploadCompleteHandler);
        file.detach("uploaderror", this.uploadErrorHandler);
        file.detach("uploadcancel", this.uploadCancelHandler);
    }

    /**
    * Handles and retransmits upload complete event.
    *
    * @method _uploadCompleteHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadCompleteHandler(event) {

        this._unregisterUpload(event.file);

        this.totalBytesUploaded += event.file.size;
        delete this.currentUploadedByteValues[event.file.id];

        if (this.queuedFiles.length > 0 && this._currentState === UploaderQueue.UPLOADING) {
            this._startNextFile();
        }

        let updatedEvent = {},
            uploadedTotal = this.totalBytesUploaded,
            percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);

        updatedEvent.file = event.file;
        updatedEvent.originEvent = event;

        this.each(this.currentUploadedByteValues, function (value) {
            uploadedTotal += value;
        });

        this.fire("totaluploadprogress", {
            bytesLoaded: uploadedTotal,
            bytesTotal: this.totalBytes,
            percentLoaded: percentLoaded
        });

        this.fire("uploadcomplete", updatedEvent);

        if (this.queuedFiles.length === 0 && this.numberOfUploads <= 0) {
            this.fire("alluploadscomplete");
            this._currentState = UploaderQueue.STOPPED;
        }
    }
    
    /**
    * Handles and retransmits upload cancel event.
    *
    * @method _uploadCancelHandler
    * @param event The event dispatched during the upload process.
    * @private
    */
    _uploadCancelHandler(event) {

        let updatedEvent = {};
        updatedEvent.originEvent = event;
        updatedEvent.file = event.target;

        this.fire("uploadcancel", updatedEvent);
    }
    _uploadProgressHandler(event) {

        this.currentUploadedByteValues[event.file.id] = event.bytesLoaded;

        let updatedEvent = {},
            uploadedTotal = this.totalBytesUploaded,
            percentLoaded = Math.min(100, Math.round(10000*uploadedTotal/this.totalBytes) / 100);

        updatedEvent.originEvent = event;
        updatedEvent.file = event.file;

        this.fire("uploadprogress", updatedEvent);

        this.each(this.currentUploadedByteValues, function (value) {
            uploadedTotal += value;
        });

        this.fire("totaluploadprogress", {
            bytesLoaded: uploadedTotal,
            bytesTotal: this.totalBytes,
            percentLoaded: percentLoaded
        });
    }

    /**
    * Starts uploading the queued up file list.
    *
    * @method startUpload
    */
    startUpload(){
        this.queuedFiles = this.fileList.slice(0);
        this.numberOfUploads = 0;
        this.currentUploadedByteValues = {};
        this.currentFiles = {};
        this.totalBytesUploaded = 0;

        this._currentState = UploaderQueue.UPLOADING;

        while (this.numberOfUploads < this.simUploads && this.queuedFiles.length > 0) {
            this._startNextFile();
        }
    }
    pauseUpload() {this._currentState = UploaderQueue.STOPPED;}
    restartUpload() {
        this._currentState = UploaderQueue.UPLOADING;
        while (this.numberOfUploads < this.simUploads) {
             this._startNextFile();
        }
    }
    forceReupload(file) {
        let id = file.id;
        if (this.currentFiles.hasOwnProperty(id)) {
            file.cancelUpload();
            this._unregisterUpload(file);
            this.addToQueueTop(file);
            this._startNextFile();
        }
    }
    addToQueueTop(file) {this.queuedFiles.unshift(file)}
    addToQueueBottom(file) {this.queuedFiles.push(file)}
    cancelUpload(file) {
        let id,
            i,
            fid;

        if (file) {
            id = file.id;

            if (this.currentFiles[id]) {
                this.currentFiles[id].cancelUpload();
                this._unregisterUpload(this.currentFiles[id]);
                if (this._currentState === UploaderQueue.UPLOADING) {
                    this._startNextFile();
                }
            }
            else {
                for (i = 0, len = this.queuedFiles.length; i < len; i++) {
                    if (this.queuedFiles[i].id === id) {
                        this.queuedFiles.splice(i, 1);
                        break;
                    }
                }
            }
        }
        else {
            for (fid in this.currentFiles) {
                this.currentFiles[fid].cancelUpload();
                this._unregisterUpload(this.currentFiles[fid]);
            }

            this.currentUploadedByteValues = {};
            this.currentFiles = {};
            this.totalBytesUploaded = 0;
            this.fire("alluploadscancelled");
            this._currentState = UploaderQueue.STOPPED;
        }
    }
}
