export default class Instruments {
    constructor() {

    }

    shuffleArray(arr){
        var j, temp;
        for(var i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getTime() {
        let date = new Date();
        let time = '';
        (date.getHours() < 10) ? time += '0' + date.getHours() : time += date.getHours();
        time += ':';
        (date.getMinutes() < 10) ? time += '0' + date.getMinutes() : time += date.getMinutes();
        time += ':';
        (date.getSeconds() < 10) ? time += '0' + date.getSeconds() : time += date.getSeconds();
        return time;
    }
}