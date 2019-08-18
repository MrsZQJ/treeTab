;
(function ($, window, document, undefined) {
    $.fn.ZQJ = function (obj) {
        var treeTab = new Tree(obj)
        this.html(treeTab.init())
        treeTab.bindClick()
    }

    function Tree(obj) {
        this.defaults = {
            'noCheck': 'glyphicon glyphicon-chevron-down',
            'checked': 'glyphicon glyphicon-chevron-right',
            'cols': [],
            'datas': [],
            'disposeData': [],
            'marginLeft': 35,
            'textAlign': 'center',
            'baseId': 'deptId'
        }
        this.idx = 0
        this.options = $.extend({}, this.defaults, obj)
        this.data = NaN
    }
    Tree.prototype.init = function () {
        this.disposeDate(this.options['datas'], this.idx)
        return this.template()

    }
    Tree.prototype.disposeDate = function (data, i, num = 0) {
        var disposeData = this.options['disposeData'],
            indexGroup = [],
            that = this
        i += 1
        this.idx = i

        $.each(data, function (index, list) {
            indexGroup.push(list)
        })
        $.each(indexGroup, function (index, list) {
            list.zqjId = i
            list.fatherId = num
            disposeData.push(list)
            if (list.children.length > 0) {
                that.disposeDate(list.children, i, list[that.options['baseId']])
            } else {
                list.endArr = true;
            }
        })
        this.data = disposeData
    }
    Tree.prototype.disposeDate = function (data, i, num = 0) {
        var disposeData = this.options['disposeData'],
            indexGroup = [],
            that = this

        function forfor(){
            
        }
    }
    Tree.prototype.template = function () {
        var that = this,
            cols = this.options['cols'],
            data = this.data,
            headTr = '',
            bodyTr = '',
            td = '',
            keyGroup = [],
            tableStr = NaN,
            marginLeft = this.options['marginLeft'],
            noCheck = this.options['noCheck']
        $.each(cols, function (index, item) {
            // td += '<th>' + item.title + '</th>'
            td += `<th style="text-align:${that.options['textAlign']}">${item.title}</th>`
            keyGroup.push(item.key)
        })
        headTr += '<tr>' + td + '</tr>'
        td = ''

        $.each(data, function (index, item) {
            $.each(keyGroup, function (idx, value) {
                if (item.endArr && idx == 0) {
                    td += `<td data-num="${item[that.options['baseId']]}" class="bind" data-id="${item.fatherId}" style="padding-left:${item.zqjId*marginLeft+'px'};text-align:left;">${item[value]}</td>`
                } else if (idx == 0) {
                    td += `<td data-num="${item[that.options['baseId']]}" class="bind" data-id="${item.fatherId}" style="padding-left:${item.zqjId*marginLeft+'px'};text-align:left;"><i class="${noCheck}"></i>${item[value]}</td>`
                } else {
                    td += `<td>${item[value]}</td>`
                }
            })
            // if (item.zqjId > 1) {
            bodyTr += '<tr style="diplay:none">' + td + '</tr>'
            // } else {
            //     bodyTr += '<tr>' + td + '</tr>'
            // }
            td = ''

        })
        tableStr = `<thead>${headTr}</thead><tbody class="zqjClick" style="text-align:${that.options['textAlign']}">${bodyTr}</tbody>`
        return tableStr
    }
    Tree.prototype.bindClick = function () {
        var that = this,
            data = this.data,
            numArr = [],
            cla = ' '
        $('.zqjClick').on('click', '.bind', function () {
            var begin = $(this).children().eq(0).attr('class') == that.options['noCheck'] ? that.options['checked'] : that.options['noCheck'],
                num = $(this).attr('data-num'),
                fatherId = $(this).attr('data-id')
            $(this).children().eq(0).attr('class', begin)
            if ($(this).children('i').eq(0).attr('class') == that.options['noCheck']) {
                cla = undefined
            } else {
                cla = 'none'
            }
            asd(data)

            function asd(data) {
                var item = false
                $.each(data, function (idx, item) {
                    if (item.fatherId == num) {
                        console.log(item);

                        numArr.push(item[that.options['baseId']])
                        if (!item.endArr) {
                            num = item[that.options['baseId']]
                        }
                        if (item.children.length > 0) {
                            item = true
                        } else {
                            item = false
                        }
                    }
                })
                if (item) {
                    return asd(item.children)
                }
            }
            $.each(numArr, function (idx, item) {
                $.each($('.bind'), function (index, value) {
                    if ($(value).attr('data-num') == item) {
                        if (cla == 'none') {
                            $(value).parents('tr').css('display', cla)
                        } else {
                            $(value).parents('tr').css('display', '')
                        }
                    }
                })
            })
            console.log(numArr);

            numArr = []
        })
    }
})(jQuery, window, document)