<template>
    <div>
        <h2>Statistiques</h2>
        <div class="row" v-for="objective in objectives">
            <div class="col-md-6">{{objective.name}}</div>
            <div class="col-md-1"><i class="fa fa-check text-success" v-if=valid(objective)></i></div>
            <div class="col-md-5 text-success" v-if=valid(objective)>+{{objective.points}} Points</div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['nbrWords', 'objectives', 'lastEntry', 'beforeLastEntry'],
    methods: {
      valid(objective) {
        return objective.isValid(this.lastEntry, this.nbrWords, this.beforeLastEntry);
      },
    },
  };
</script>
