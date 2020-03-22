// This script hides the task counts next to filters (like "Next 7 days" and favorite projects) to relieve stress.
// It leaves the count for the "today" filter so you can focus on just what you need to get done today.
// It also leaves the count for a custom filter I call "Undated non-stretch," that is tasks without a date that are not
// labeled with the "stretch" (i.e. stretch goal) label. The Todoist query for that filter is "no date & !@stretch".

// This function is async so as not to block the main thread (e.g. Todoist rendering)
async function hideCounter() {
  let allCounters = Array.from(document.querySelectorAll(".item_counter"));
  const maxAttempts = 10;
  let attempts = 0;
  const delayBetweenAttempts = 100;

  // This checking every delayBetweenAttempts is a bit hacky but I don't think
  // I can plug into Todoist's React lifecycle externally from here to check when
  // the task counters are rendered.
  while (allCounters.length === 0 && attempts < maxAttempts) {
    allCounters = Array.from(document.querySelectorAll(".item_counter"));
    attempts++;
    await new Promise(resolve => {
      setTimeout(resolve, delayBetweenAttempts);
    });
  }

  if (allCounters.length !== 0) {
    let today_counter = document.querySelector(
      "#filter_today > span.item_content > small"
    );
    let inbox_counter = document.querySelector(
      "#filter_inbox > span.item_content > small"
    );
    // This data-id needs to be changed for your setup by grabbing the correct one
    // for the filter you want to preserve via "inspect element"
    let undatedNonstretch = document.querySelector(
      'li[data-id="2261219719"] > span.item_content > small'
    );

    filterCountsToKeep = new Set([
      today_counter,
      inbox_counter,
      undatedNonstretch
    ]);
    filtersToChange = new Set(
      allCounters.filter(x => !filterCountsToKeep.has(x))
    );
    filtersToChange.forEach(x => (x.style.display = "none"));
  }
}

hideCounter();
