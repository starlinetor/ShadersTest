#ifdef GL_ES
precision mediump float;
#endif

void drawFragColor (vec4 color){
    gl_FragColor = color;
}

float sum (float n1, float n2){
    return n1 + n2;
}

void main(){

    float color = sum(0.5,0.5);

    drawFragColor(vec4(color));
}