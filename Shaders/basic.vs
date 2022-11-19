precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

uniform float aspect;

void main()
{
	fragColor = vertColor;


	vertPosition.x /= aspect;


	gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}