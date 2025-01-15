export function extractTime(dateString){
    const date = new Date(dateString);
    console.log(date.getHours());
    let hours = padZero(date.getHours());
    let minutes = padZero(date.getMinutes());
    if(hours>12){
        hours-=12;
        minutes+=' pm';
    }else{
        minutes+=' am';
    }
    return `${hours}:${minutes}`;
}

function padZero(number){
    return number.toString().padStart(2,"0");
}