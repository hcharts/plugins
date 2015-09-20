/**
 * 解析 URL 参数
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}


var app = new Vue({
    el: '#plugin',
    data: {
        plugin: null
    }
});

var name = getQueryString('name');

if (name === null) {
    window.location.href = "index.html";
}

$.getJSON('manifest.json', function(data) {
    var plugin = _.find(data, function(d, i) {
        return d.name === name;
    });

    // 处理 maintainers
    if (plugin.maintainers) {
        _.each(plugin.maintainers, function(m) {
            if (!m.url) {
                if (m.email) {
                    m.url = 'mailto:' + m.email;
                } else {
                    m.url = null;
                }
            }
        });
    } else {
        plugin.maintainers = null;
    }

    if (!plugin.home) {
        plugin.home = plugin.author.url;
    }

    if (!plugin.bugs) {
        plugin.bugs = plugin.author.url + "/issues";
    }

    if (!plugin.docs) {
        plugin.docs = plugin.author.url + "/docs";
    }

    if (!plugin.download) {
        plugin.download = plugin.author.url + "/archive/master.zip";
    }

    // 处理 License
    if (!plugin.licenses) plugin.licenses = null;

    app.plugin = plugin;
});