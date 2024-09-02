#ifdef GL_ES
precision mediump float;
#endif

struct polygon {
    int radius;
    int sides; 
};

void main(){
    polygon square = polygon(1,4);
    gl_FragColor = vec4(1);
}