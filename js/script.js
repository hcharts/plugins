var app = new Vue({
    el: '#plugins-list',
    data: {
        plugins: null,
        search: null,
        msg: null,
        pageSize: 10,
        pageNum: 1,
        totalPage: 0,
        pageSizeOptions: [{
            value: 2,
            text: '2'
        }, {
            value: 5,
            text: '5'
        }, {
            value: 10,
            text: '10'
        }, {
            value: 20,
            text: '20'
        }]
    },
    methods: {
        changePage: function(page) {
            if (page > this.totalPage) {
                return;
            }
            this.pageNum = page;
            jQuery('body').scrollTop(0);
        }
    }
});


Vue.filter('searchFilter', function(value, search) {

    var newValue = [];
    var totalElements = app.plugins.length;

    if (search === null | search === "") {
        app.msg = null;
        newValue = value;
    } else {
        // 根据搜索内容过滤
        _.each(value, function(v, i) {
            if (v.name.indexOf(search) !== -1 || v.description.indexOf(search) !== -1 || v.author.name.indexOf(search) !== -1) {
                newValue.push(v);
            }
        });

        totalElements = newValue.length;

        if (totalElements > 0) {
            app.msg = '共搜索到 ' + totalElements + ' 条记录';
        } else {
            app.msg = '无搜索结果，请重新输入';
            app.totalPage = 0;
            return [];
        }
    }

    // 确定当前页内容
    var pageVlue = [];
    _.each(newValue, function(v, i) {
        if (i >= app.pageSize * (app.pageNum - 1) && i < app.pageSize * (app.pageNum)) {
            pageVlue.push(v);
        }
    });

    // 计算总页数
    app.totalPage = Math.ceil(totalElements / app.pageSize);

    // 如果页码超过总页数，则调到最后一页
    if (totalElements < app.pageSize * app.pageNum) {
        app.pageNum = app.totalPage;
    }

    return pageVlue;

});


// Get the data and set to app.plugins
$.getJSON('manifest.json', function(data) {
    app.plugins = data;
});