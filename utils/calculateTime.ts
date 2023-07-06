import moment from 'moment';

const calcTimeDuration = (startDate: string) => {
  const now = moment();
  const duration = moment.duration(now.diff(startDate));
  return duration;
};

const formatTimeSince = (duration: moment.Duration) => {
  let timeSince;

  if (duration.asDays() < 30) {
    timeSince = `${duration.asDays()} days`;
  } else if (duration.asYears() < 1) {
    const months = Math.floor(duration.asMonths());
    const days = Math.floor(duration.asDays() % 30);

    timeSince = `${months} months, ${days} days`;
  } else {
    const years = Math.floor(duration.asYears());
    const months = Math.floor(duration.asMonths() % 12);
    const days = Math.floor(duration.asDays() % 30);

    timeSince = `${years} year${years > 1 ? 's' : ''}, ${months} month${
      months > 1 ? 's' : ''
    }, ${days} day${days > 1 ? 's' : ''}`;
  }
  return timeSince;
};

export {calcTimeDuration, formatTimeSince}
