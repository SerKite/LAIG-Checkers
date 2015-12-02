/**
 * Piece
 * @constructor
 */
function Piece(scene, stacks, slices) {
 	CGFobject.call(this,scene);
	
	this.stacks = stacks;
	this.slices = slices;
	this.scene = scene;

	this.circle = new MyCircle(scene, slices);
	this.cylinder = new MyCylinder(scene,0.5,0.5,0.5,stacks,slices);
};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function() {

 	this.scene.pushMatrix();
 		this.scene.rotate(-90*degToRad,1,0,0);
 		this.cylinder.display();
 		this.scene.pushMatrix();
 			this.scene.translate(0,0,0.5);
 			this.circle.display();
 		this.scene.popMatrix();
 		this.scene.pushMatrix();
 			this.scene.rotate(180*degToRad,0,1,0);
 			this.circle.display();
 		this.scene.popMatrix();
 	this.scene.popMatrix();

};