import moment from 'moment';

const objectives = [
  {
    name: 'Ecriture',
    isValid(lastEntry, wordCount, beforeLastEntry) {
      if (lastEntry && beforeLastEntry) {
        return wordCount > 0 && moment(lastEntry.date).diff(moment(new Date()), 'days') !== 0;
      }
      return false;
    },
    points: 10,
  },
  {
    name: '650 Mots',
    isValid(lastEntry, wordCount, beforeLastEntry) {
      if (lastEntry && beforeLastEntry) {
        if (moment(lastEntry.date).diff(moment(new Date()), 'days') === 0) { // 2nde entrée le même jour
          if (lastEntry.wordsCount >= beforeLastEntry.wordsCount + 650) {
            return false;  // Bonus déjà attribué
          }
          return wordCount >= (beforeLastEntry.wordsCount + 650);
        }
        return wordCount >= (lastEntry.wordsCount + 650);
      }
      return false;
    },
    points: 10,
  },
  {
    name: 'Writing Streak',
    isValid(lastEntry, wordCount) {
      if (lastEntry && wordCount > 0) {
        return moment(new Date()).diff(moment(lastEntry.date), 'days') === 1;
      }
      return false;
    },
    points: 10,
  },
];

module.exports = objectives;
