function dft(x){
    let X = [];
    const N = x.length;
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;
        for (let n = 0; n <N; n++) {
            let theta = (TWO_PI * k* n)/N;
            re += x[n] * cos(theta);
            im -= x[n] * sin(theta);
        }
        re =  re/N;
        im = im/N;

        let freq = k;
        let amp=sqrt(re*re+im*im);
        let phase= atan2(im,re);
        X[k]={re,im,freq,amp,phase };
        
    }
    return X
}