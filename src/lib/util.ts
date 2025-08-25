export function makeRandoms(max:number,times=1){
    if(max < 2) return [0];
    if(times < 1) return [0];
    const numbers : number[] = [];
    for(let i = 0; i < times; i++){
        numbers.push(Math.floor(Math.random() * (max+1)))
    }
    return numbers;
}