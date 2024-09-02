#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

uniform vec2 u_resolution;

const float pi = 3.142;

float delta = 0.1; 

vec3 color; 

//1 0 0 - 0 || R   b
//1 1 0 - 1 ||   G b
//0 1 0 - 2 || r G 
//0 1 1 - 3 || r   B
//0 0 1 - 4 ||   g B
//1 0 1 - 5 || R g 



float straightSin(float time){

    time = float(mod(time, 1.0));

    if((0.0<=time && time<=0.166)|| (0.833<time && time<=1.0)){
        return 1.0;
    }else if(0.166<time && time<=0.333){
        return -5.988*time+1.994;
    }else if(0.333<time && time<=0.666){
        return 0.0;
    }else{
        return 5.988 * time -3.988;
    }
}


vec3 rainbow(float time){

    return vec3 (
        straightSin(time*delta),
        straightSin(time*delta + 0.333),
        straightSin(time*delta + 0.666));

}

vec3 rainbow_1(float time){
        return vec3 (
        abs(cos(time*delta*pi)),
        abs(cos(time*delta*pi + 1.045)),
        abs(cos(time*delta*pi + 2.094)));
}

void main(){

    float normalizedX = gl_FragCoord.x / u_resolution.x;

    if(normalizedX <0.5) {
        color = rainbow(u_time);
    }else{
        color = rainbow_1(u_time);
    }

    gl_FragColor = vec4(color, 1);

}

