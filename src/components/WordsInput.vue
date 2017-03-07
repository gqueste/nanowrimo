<template>
    <div>
        <h2>Nouvelle entrée</h2>
        <div>
            <form v-on:submit.prevent="addWordCount">
                <div class="form-group">
                    <label for="wordsInput">Nombre de Mots Atteints</label>
                    <input class="form-control" type="number" placeholder="Nombre de mots atteints" id="wordsInput" min="1" v-model="nbrWords">
                </div>
                <div class="form-group" v-if="nbrWords > lastNtry()">
                    <span class="text-success">+ {{ nbrWords - lastNtry() }} mots ! Good job !</span>
                </div>
                <button type="submit" class="btn btn-block btn-primary">Enregistrer</button>
            </form>
        </div>
        <words-stats v-bind:nbrWords=nbrWords v-bind:objectives=objectives v-bind:lastEntry=lastEntry v-bind:beforeLastEntry=beforeLastEntry></words-stats>
    </div>
</template>

<script>
  import WordsStats from './WordsStats';

  export default{
    props: ['lastEntry', 'objectives', 'beforeLastEntry'],
    components: {
      WordsStats,
    },
    data() {
      return {
        nbrWords: undefined,
      };
    },
    methods: {
      addWordCount() {
        this.$emit('addWordCount', this.nbrWords);
      },
      lastNtry() {
        if (this.lastEntry) {
          return this.lastEntry.wordsCount;
        }
        return 0;
      },
    },
  };
</script>
