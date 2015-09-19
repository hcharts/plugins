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

    if (value.length < app.pageSize * app.pageNum) {
        app.pageNum = Math.ceil(value.length / app.pageSize);
    }

    var newValue = [];
    // 确定当前页内容
    _.each(value, function(v, i) {
        if (i >= app.pageSize * (app.pageNum - 1) && i <= app.pageSize * (app.pageNum)) {
            newValue.push(v);
        }
    });

    // 计算总椰树
    app.totalPage = Math.ceil(app.plugins.length / app.pageSize);


    // 如果不存在搜索内容，直接返回结果
    if (search === null || search === "") {
        app.msg = null;
        return newValue;

    } else {

    	// 根据搜索内容过滤
        _.each(value, function(v, i) {
            if (v.name.indexOf(search) !== -1 || v.description.indexOf(search) !== -1 || v.author.name.indexOf(search) !== -1) {
                newValue.push(v);
            }
        });

        if (newValue.length > 0) {
            app.msg = '共搜索到 ' + newValue.length + ' 条记录';
            // Todo 搜索结果进行分页处理
            return newValue;
        } else {
            app.msg = '无搜索结果，请重新输入';
            app.totalPage = 0;
            return [];
        }
    }
});


// Get the data and set to app.plugins
$.getJSON('manifest.json', function(data) {
    app.plugins = data;
});