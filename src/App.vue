<template>
    <div id="app">
        <h1>Nanowrimo Continuation</h1>

        <ul class="nav nav-tabs nav-justified" role="tablist">
            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Accueil</a></li>
            <li role="presentation"><a href="#awards" aria-controls="awards" role="tab" data-toggle="tab">Récompenses</a></li>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
                <div class='row'>
                    <div class='col-md-9'>
                        <words-graph v-bind:words=words></words-graph>
                    </div>
                    <div class='col-md-3'>
                        <div class="row">
                            <words-input v-bind:lastEntry=lastEntry v-bind:objectives=objectives v-bind:beforeLastEntry=beforeLastEntry v-on:addWordCount=addWordCount></words-input>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="awards">
                <awards v-bind:points=points v-bind:awards=awards v-on:consumePoints=consumePoints></awards>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import WordsInput from './components/WordsInput';
import WordsGraph from './components/WordsGraph';
import Awards from './components/Awards';

const Vue = require('vue');
const VueFire = require('vuefire');
const firebase = require('firebase');
const Config = require('./config');
const Objectives = require('./data/Objectives');

Vue.use(VueFire);

const db = firebase.initializeApp(Config).database();
const wordsRef = db.ref('words');
const pointsRef = db.ref('points');
const awardsRef = db.ref('awards');

export default {
  name: 'app',
  components: {
    WordsInput,
    WordsGraph,
    Awards,
  },
  firebase: {
    words: wordsRef.orderByChild('date').limitToLast(30),
    pointsSource: {
      source: pointsRef,
      asObject: true,
    },
    awards: awardsRef.orderByChild('cost'),
  },
  computed: {
    lastEntry() {
      return this.words[this.words.length - 1];
    },
    beforeLastEntry() {
      return this.words[this.words.length - 2];
    },
    objectives() {
      return Objectives;
    },
    points() {
      if (this.pointsSource) {
        return this.pointsSource['.value'];
      }
      return 0;
    },
  },
  methods: {
    addWordCount(wordCount) {
      const lastElement = this.lastEntry;
      const currentDate = moment(new Date()).format('YYYY-MM-DD');
      this.addPoints(wordCount);
      if (currentDate === lastElement.date) {
        wordsRef.child(lastElement['.key']).child('wordsCount').set(wordCount);
      } else {
        this.fillBlanks(lastElement);
        wordsRef.push({
          date: moment(new Date()).format('YYYY-MM-DD'),
          wordsCount: wordCount,
        },
        );
      }
    },
    fillBlanks(lastElement) {
      const distanceBetweenInputs = moment(new Date()).diff(moment(lastElement.date), 'days');
      if (distanceBetweenInputs > 1) {
        for (let i = 1; i < distanceBetweenInputs; i += 1) {
          const tempDate = moment(lastElement.date).add(i, 'days');
          wordsRef.push({
            date: tempDate.format('YYYY-MM-DD'),
            wordsCount: lastElement.wordsCount,
          });
        }
      }
    },
    consumePoints(cost) {
      this.pointsSource['.value'] = this.pointsSource['.value'] - cost;
      pointsRef.set(this.pointsSource['.value']);
    },
    addPoints(wordCount) {
      this.objectives.forEach((objective) => {
        if (objective.isValid(this.lastEntry, wordCount, this.beforeLastEntry)) {
          this.pointsSource['.value'] = this.pointsSource['.value'] + objective.points;
          pointsRef.set(this.pointsSource['.value']);
        }
      });
    },
  },
};
</script>