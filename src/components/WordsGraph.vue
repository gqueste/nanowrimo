<script>
  import VueCharts from 'vue-chartjs';

  export default VueCharts.Line.extend({
    mixins: [VueCharts.mixins.reactiveData],
    props: ['words'],
    data() {
      return {
        chartData: '',
      };
    },
    created() {
      this.fillData();
    },
    mounted() {
      // Overwriting base render method with actual data.
      this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
      setInterval(() => {
        this.fillData();
      }, 2000);
    },
    methods: {
      fillData() {
        let tmpData = [];
        let tmpLabels = [];
        if (this.words) {
          tmpData = this.words.map(word => word.wordsCount);
          tmpLabels = this.words.map(word => word.date);
        }
        this.chartData = {
          labels: tmpLabels,
          datasets: [
            {
              label: 'Nombre de Mots',
              backgroundColor: '#f87979',
              data: tmpData,
            },
          ],
        };
      },
    },
  });
</script>
