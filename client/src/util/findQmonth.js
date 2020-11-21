export function findQmonth(str){
   switch(str){
    case 'January':
        return 'Q1 - January, February, March';
    case 'February':
        return 'Q1 - January, February, March';
    case 'March':
        return 'Q1 - January, February, March'; 
    case 'April':
        return 'Q2 - April, May, June';   
    case 'May':
        return 'Q2 - April, May, June'; 
    case 'June':
        return 'Q2 - April, May, June'; 
    case 'July':
        return 'Q3 - July, August, September'; 
    case 'August':
        return 'Q3 - July, August, September';
    case 'September':
        return 'Q3 - July, August, September'; 
    case 'October':
        return 'Q4 - October, November, December'; 
    case 'November':
        return 'Q4 - October, November, December'; 
    case 'December':
        return 'Q4 - October, November, December'; 
   
    default:
         return 'Not Found'
   }
  
}