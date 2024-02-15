const calendar = document.getElementById('calendar');
const dateDisplay = document.getElementById('date-display');
const monthYearDisplay = document.getElementById('month-year-display');

function createCalendar(year, month){

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const today = currentDate.getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    let html = '<table>';
    let day = 1;

    //曜日（ヘッダー）部分
    html += '<tr>';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'thu', 'Fri', 'Sat'];
    for (let i = 0; i < daysOfWeek.length; i++){
        html += '<td>' + daysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    //カレンダーの日付部分
    for(let i = 0; i < 6; i++){
        html += '<tr>';
        for(let j = 0; j < 7; j++){
            if (i === 0 && j < startingDay){
                //先月の日
                const prevDay = lastDayOfPrevMonth - startingDay + j + 1;
                html += '<td class="prev-month">' + prevDay + '</td>';
            }else if (day > totalDays) {
                //来月の日
                let nextDay = day - totalDays;
                html += '<td class="next-month">' + nextDay + '</td>';
                day++;
            }else{
                //現在の月日
                let className = '';
                if(year === currentYear && month === currentMonth && day ===today){
                    className = 'today';
                }else if (j ===6){;
                    className = 'saturday';
                }else if (j === 0){;
                    className = 'sunday';
                };
                html += '<td class="' + className + '">' + day + '</td>';
                day++;
            }
        }
    }
    html += '</table>';

    calendar.innerHTML = html;

    //表示されている年月日を更新
    const formattedDate = `${currentYear}/${currentMonth + 1}/${today}`;
    dateDisplay.textContent = formattedDate;

    //月の名称を更新
    const monthName = ['Janualy', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septenber', 'October', 'November', 'December'];
    monthYearDisplay.textContent = monthName;

    //年と月を更新
    const formattedMonthYear = `${year} ${monthName[month]}`;
    monthYearDisplay.textContent = formattedMonthYear;
}

//現在の年月日を取得
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

//初期カレンダーを表示
createCalendar(currentYear, currentMonth);

//「次の月を表示」ボタンの処理
document.getElementById('next-month-btn').addEventListener('click' ,
function(){
    currentMonth++;
    if(currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
});

//「前の月を表示」ボタンの処理
document.getElementById('pre-month-btn').addEventListener('click' ,
function(){
    currentMonth--;
    if(currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentYear, currentMonth);
});