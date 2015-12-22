var degToRad = Math.PI/180.0;
var updatePeriod = 50;

function Scene() {
    
    CGFscene.call(this);
};

Scene.prototype = Object.create(CGFscene.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.init = function (application) {
    
    CGFscene.prototype.init.call(this, application);

    this.setGlobalAmbientLight(0.25, 0.25, 0.25, 1.0);
    this.initCameras();
    this.initLights();
    this.initMaterials();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    //Shaders
    this.myShader = new CGFshader(this.gl, dir_shaders+"myshader.vert", dir_shaders+"myshader.frag");
    this.myShader.setUniformsValues({normScale: 0.05});
    this.myShader.setUniformsValues({uSampler2: 1});

	this.axis = new CGFaxis(this);

    this.setUpdatePeriod(updatePeriod);

    //skins
    this.skin=1;

    //models

    this.pieces = [];
    //B
    this.pieces.push(new Piece(this, 5, 100, 2, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 4, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 6, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 8, 1, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 1, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 3, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 5, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 7, 2, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 2, 3, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 4, 3, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 6, 3, 'B'));
    this.pieces.push(new Piece(this, 5, 100, 8, 3, 'B'));
    //W
    //B
    this.pieces.push(new Piece(this, 5, 100, 1, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 3, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 5, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 7, 8, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 2, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 4, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 6, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 8, 7, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 1, 6, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 3, 6, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 5, 6, 'W'));
    this.pieces.push(new Piece(this, 5, 100, 7, 6, 'W'));

    var matBoardBLACK = new CGFappearance(this);
    matBoardBLACK.setAmbient(0.05, 0.05, 0.05, 1.0);
    matBoardBLACK.setDiffuse(0.05, 0.05, 0.05, 1.0);
    matBoardBLACK.setSpecular(0.02, 0.02, 0.02, 1.0);
    matBoardBLACK.setShininess(2.0);
    this.board = new Board(this,this.matWOOD,this.matWHITE,matBoardBLACK);

    //picking
    this.setPickEnabled(true);
};

Scene.prototype.initLights = function () {

    this.lights[0].setPosition(0, 10, 10, 1);
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1, 1, 1, 1);
    this.lights[0].setSpecular(1, 1, 1, 1);
    this.lights[0].enable();
    this.lights[0].ena=true;
    this.lights[0].setVisible(true);
    this.lights[0].update();

    this.lights[1].setPosition(0, 10, -10, 1);
    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1, 1, 1, 1);
    this.lights[1].setSpecular(1, 1, 1, 1);
    this.lights[1].enable();
    this.lights[1].ena=true;
    this.lights[1].setVisible(true);
    this.lights[1].update();
};

Scene.prototype.updateLights = function() {
    
    for (var i = 0; i < this.lights.length; i++) {
        if(this.lights[i].ena) this.lights[i].enable();
        else this.lights[i].disable();
    };

    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
};

Scene.prototype.initCameras = function () {
    
    this.camera = new CGFcamera(0.4, 0.01, 500, vec3.fromValues(20, 10, 0), vec3.fromValues(0, 0, 0));
    this.cameraDestination = [20,10,0];
    this.cameraTransition = false;
    this.transitionTime = 2000;
};

Scene.prototype.initMaterials = function () {

    this.matSILVER = new CGFappearance(this);
    this.matSILVER.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.matSILVER.setDiffuse(0.2, 0.2, 0.2, 1.0);
    this.matSILVER.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.matSILVER.setShininess(10.0);

    this.matGOLD = new CGFappearance(this);
    this.matGOLD.setAmbient(0.5, 0.42, 0.05, 1.0);
    this.matGOLD.setDiffuse(0.5, 0.42, 0.05, 1.0);
    this.matGOLD.setSpecular(0.8, 0.2, 0.2, 1.0);
    this.matGOLD.setShininess(2.0);

    this.matBLACK = new CGFappearance(this);
    this.matBLACK.setAmbient(0.07, 0.07, 0.07, 1.0);
    this.matBLACK.setDiffuse(0.07, 0.07, 0.07, 1.0);
    this.matBLACK.setSpecular(0.02, 0.02, 0.02, 1.0);
    this.matBLACK.setShininess(2.0);

    this.matWHITE = new CGFappearance(this);
    this.matWHITE.setAmbient(0.99, 0.99, 0.99, 1.0);
    this.matWHITE.setDiffuse(0.99, 0.99, 0.99, 1.0);
    this.matWHITE.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.matWHITE.setShininess(2.0);

    this.matWOOD = new CGFappearance(this);
    this.matWOOD.setAmbient(0.59, 0.44, 0.2, 1);
    this.matWOOD.setDiffuse(0.59, 0.44, 0.2, 1);
    this.matWOOD.setSpecular(0.15, 0.11, 0.05, 1);
    this.matWOOD.setShininess(10.0);

    this.matWOODDARK = new CGFappearance(this);
    this.matWOODDARK.setAmbient(0.09, 0.02, 0.01, 1);
    this.matWOODDARK.setDiffuse(0.09, 0.02, 0.01, 1);
    this.matWOODDARK.setSpecular(0.1, 0.02, 0.02, 1);
    this.matWOODDARK.setShininess(2.0);
};

Scene.prototype.display = function () {
    this.logPicking();
    this.clearPickRegistration();

	// ---- BEGIN Background, camera and axis setup
    	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();
	
    this.axis.display();

	// ---- END Background, camera and axis setup

    this.updateLights();

    this.board.display();    
    this.displayPieces();
};

Scene.prototype.buildState = function () {
    var res = [
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#','#','#','#','#','#','#','#','#','#']
    ];

    for(var i=0;i<this.pieces.length;i++) {
        res[this.pieces[i].posY][this.pieces[i].posX] = this.pieces[i].chr;
    }
    return res;
}

Scene.prototype.displayPieces = function () {
    
    this.pushMatrix();
        for (var i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].chr=='B' || this.pieces[i].chr=='b')
            {
                if(this.skin==1)
                    this.matBLACK.apply();
                else
                    this.matSILVER.apply();
            }
            else if(this.pieces[i].chr=='W' || this.pieces[i].chr=='w')
            {
                if(this.skin==1)
                    this.matWHITE.apply();
                else
                    this.matGOLD.apply();
            }

            this.registerForPick(65+i, this.pieces[i]);
            this.pushMatrix();
                this.translate(this.pieces[i].posY*1.30-(1.30*9)/2,0,(1.30*9)/2-this.pieces[i].posX*1.30);
                this.pieces[i].display();
            this.popMatrix();
            if(this.pieces[i].chr=='b' || this.pieces[i].chr=='w')
            {
                this.pushMatrix();
                    this.translate(this.pieces[i].posY*1.30,0.5,this.pieces[i].posX*1.30);
                    this.pieces[i].display();
                this.popMatrix();
            }
        }
    this.popMatrix();
};

Scene.prototype.update = function(currTime) {

    if(this.cameraTransition) {
        if(!this.transitionBeg) this.transitionBeg = currTime;
        else
        {
            var time_since_start = currTime - this.transitionBeg;
            if(time_since_start>=this.transitionTime) {
                this.camera.setPosition(this.cameraDestination);
                this.transitionBeg=null;
                this.cameraTransition=false;
            }
            else {
                var time_perc = time_since_start / this.transitionTime;
                var new_pos = [this.cameraOrigin[0]+(this.transitionVec[0]*time_perc),
                this.cameraOrigin[1]+(this.transitionVec[1]*time_perc),
                this.cameraOrigin[2]+(this.transitionVec[2]*time_perc)];
                this.camera.setPosition(new_pos);
            }
        }
    }
    else
    {

    }
};

Scene.prototype.cameraTopWhite = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [0.01,27.5,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
}

Scene.prototype.cameraTopBlack = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [-0.01,27.5,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
}

Scene.prototype.cameraWhite = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [20,10,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
}

Scene.prototype.cameraBlack = function() {

    if(!this.cameraTransition) {
        this.cameraOrigin=[this.camera.position[0], this.camera.position[1], this.camera.position[2]];
        this.cameraDestination = [-20,10,0];
        if(!arraysEqual(this.cameraDestination, this.cameraOrigin)) this.calcTransition();
    }
}

Scene.prototype.calcTransition = function() {
    this.transitionVec = [this.cameraDestination[0]-this.cameraOrigin[0],
            this.cameraDestination[1]-this.cameraOrigin[1],
            this.cameraDestination[2]-this.cameraOrigin[2]];

    this.cameraTransition = true;
}

Scene.prototype.logPicking = function () {
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i=0; i< this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj)
                {
                    var customId = this.pickResults[i][1];              
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                    if(obj instanceof MyRectangle) //Cells
                    {
                        console.log("\tCell [" + (Math.floor((customId-1)/8)+1) + "," + ((customId-1)%8+1) + "] picked");
                    }
                    else if (obj instanceof Piece) //Pieces
                    {
                        console.log("\tPiece at [" + obj.posX + "," + obj.posY + "] picked");
                    }
                }
            }
            this.pickResults.splice(0,this.pickResults.length);
        }       
    }
}

Scene.prototype.alt_skin = function () {
    if(this.skin==1)
    {
        this.skin=2;
        this.board.setMatWOOD(this.matWOODDARK);
    }
    else
    {
        this.skin=1;
        this.board.setMatWOOD(this.matWOOD);
    }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}