var app = new Vue({
    el: '#manifest',
    data: {
      url: null,
      url2: null,
      json: null
    },
    methods: {
        byUrl: function() {
          $.post('http://www.highcharts.com/plugin-registry/validate', {
              repository: this.url
          }, function(data) {
            console.log(data);
          });
        },
        byJson: function() {

        }
    }
});