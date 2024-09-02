#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

mat4 matrix; 


void main(){

    

    for(int i = 0; i < 4; i++) {
        matrix[i] = vec4 (1);
    }

    gl_Position = vec4(0.1373, 0.8706, 0.1255, 0.0) * matrix;
}