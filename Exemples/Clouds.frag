
#ifdef GL_ES
precision mediump float;
#endif


#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 color3 = vec3(61, 101, 145);
vec3 color4 = vec3(90, 128, 151);
vec2 sp;

float noiseSpeed = 10.0;
float fmbSpeed = 30.0;

float RGBRange = 255.0;
float pixelSize = 5.0;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(11.9898,78.233)))*
    434248.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
    (c - a)* u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

    #define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.1;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}


void main() {
    //    making the game pixelized
    sp.x = mod(gl_FragCoord.x , pixelSize);
    sp.y = mod(gl_FragCoord.y , pixelSize);

    sp.x = floor(pixelSize / 2.0) - sp.x;
    sp.y = floor(pixelSize / 2.0) - sp.y;

    sp.x = gl_FragCoord.x + sp.x;
    sp.y = gl_FragCoord.y + sp.y;

    vec2 st = sp.xy/u_resolution;

    //  THE PART THAT REALLY MATTERS
    float clouds = smoothstep(0.4, 1.0, st.y) * 0.8;
    vec2 cp = st + vec2(u_time / noiseSpeed, 0.0);
    float rnd = noise(cp * 7.5);
    float fbm = fbm((st + vec2(u_time / fmbSpeed, 0.0)) * 6.0);


    vec3 color = (vec3(rnd) * clouds * fbm) + mix(color3 / RGBRange, color4 / RGBRange, st.y);
    gl_FragColor = vec4(color, 1.0);
}