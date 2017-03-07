<template>
    <div>
        <h2 class="row text-center ">Récompenses</h2>
        <div v-bind:class='pointsAvailableClass' class="row text-center"><strong>Vous avez {{ points }} points à dépenser.</strong></div>
        <div class="row">
            <div class="col-md-3 panel panel-default" v-for="award in awards">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ award.name }}<span class="badge pull-right">{{ award.cost }}</span></h3>
                </div>
                <div class="panel-body">
                    <button class="btn btn-block" v-on:click="consume(award.cost)" v-bind:class="{ disabled: points < award.cost, 'btn-primary': points >= award.cost, 'btn-danger': points < award.cost }">Acheter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['points', 'awards'],
    computed: {
      pointsAvailableClass() {
        return {
          'text-success': this.points > 0,
          'text-danger': this.points <= 0,
        };
      },
    },
    methods: {
      consume(cost) {
        if (cost <= this.points) {
          this.$emit('consumePoints', cost);
        }
      },
    },
  };
</script>
