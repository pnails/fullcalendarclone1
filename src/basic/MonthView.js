
fcViews.month = MonthView;

function MonthView(element, calendar) {
	var t = this;
	
	
	// exports
	t.render = render;
	
	
	// imports
	BasicView.call(t, element, calendar, 'month');
	var opt = t.opt;
	var option = calendar.option;
	var renderBasic = t.renderBasic;
	var formatDate = calendar.formatDate;
	
	
	
	function render(date, delta) {
		if (delta) {
			addMonths(date, delta);
			date.setDate(1);
		}
		var start = cloneDate(date, true);
		start.setDate(1);
		var end = addMonths(cloneDate(start), 1);
		var visStart = cloneDate(start);
		var visEnd = cloneDate(end);
		var firstDay = opt('firstDay');
		var nwe = opt('weekends') ? 0 : 1;
		var weekendDays = option('weekendDays');
		var firstDayDelta;
		if (nwe) {
			skipWeekend(visStart, weekendDays);
			skipWeekend(visEnd, weekendDays, -1, true);
			// phurni: Really uggly, refactor one day...
			var wd = weekendDays.slice();
			wd.sort()
			if (wd[wd.length-1] == 6) wd.pop();
			firstDayDelta = wd[wd.length-1]+1;
		}
		else {
		  firstDayDelta = firstDay;
		}
		addDays(visStart, -((visStart.getDay() - firstDayDelta + 7) % 7) );
		addDays(visEnd, (7 - visEnd.getDay() + firstDayDelta) % 7 );
		var rowCnt = Math.round((visEnd - visStart) / (DAY_MS * 7));
		if (opt('weekMode') == 'fixed') {
			addDays(visEnd, (6 - rowCnt) * 7);
			rowCnt = 6;
		}
		t.title = formatDate(start, opt('titleFormat'));
		t.start = start;
		t.end = end;
		t.visStart = visStart;
		t.visEnd = visEnd;
		renderBasic(6, rowCnt, nwe ? 7-option('weekendDays').length : 7, true);
	}
	
	
}
