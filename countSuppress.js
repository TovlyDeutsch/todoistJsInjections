// This script hides the task counts next to filters (like "Next 7 days" and favorite projects) to relieve stress.
// It leaves the count for the "today" filter so you can focus on just what you need to get done today.
// It also leaves the count for a custom filter I call "Undated non-stretch," that is tasks without a date that are not
// labeled with the "stretch" (i.e. stretch goal) label. The todoist query for that filter is "no date & !@stretch".

allCounters = Array.from(document.querySelectorAll(".item_counter"))
today_counter = document.querySelector("#filter_today > span.item_content > small")
inbox_counter = document.querySelector("#filter_inbox > span.item_content > small")
// This data-id needs to be changed for your setup by grabbing the correct one 
// for the filter you want to preserve via "inspect element"
undatedNonstretch = document.querySelector('li[data-id="2261219719"] > span.item_content > small')

if (today_counter && inbox_counter && undatedNonstretch) {
	filterCountsToKeep = new Set([today_counter, inbox_counter, undatedNonstretch])
	filtersToChange = new Set(allCounters.filter(x => !filterCountsToKeep.has(x)))
	filtersToChange.forEach(x => x.style.display = 'none')
	console.log('Hid filter counts')
}
else {
	console.warn('Failed to find today, inbox, undated filter')
}
