export function generateArray(start:number, end:number):number[] {
    if (start > end) {
        return[];
    }
    const arr = [];
    while(start < end) {
        arr.push(start);
        start ++;
    }
   return  arr.sort();
}