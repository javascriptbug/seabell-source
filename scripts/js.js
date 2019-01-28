var lang=["en","zh"];
hexo.extend.generator.register('aaa',function(locals) {
var pages = lang.reduce(function(result1,lang){
    var base = lang.toString() + '/';
    var lang_pages = locals.data[lang].reduce(function(result2, o) {
        if (o.id > 1) {
            o.prev = locals.data[lang][o.id-2];
        }
        if (o.id < locals.data[lang].length) {
            o.next = locals.data[lang][o.id];
        }
        var data = {
            path: base+o.path+"/",
            layout: ['page'],
            data: {
                imgs:o.pages,
                title:o.path,
                prev:o.prev,
                next:o.next,
                lang:lang,
                layout:"page"
            }
        }
    
        return result2.concat(data);
      }, []);
      return result1.concat(lang_pages);
    },[]);

    return pages;
    
})


hexo.extend.generator.register('index',function(locals) {
    return  {
                path: '',
                layout: ['index'],
                data: {
                    cate:locals.data.en
                }
            }
})
hexo.extend.generator.register('index_zh',function(locals) {
    return  {
                path: '/zh/index.html',
                layout: ['index'],
                data: {
                    cate:locals.data.zh
                }
            }
})

hexo.extend.helper.register('url_for_lang', function(path) {
    var lang = this.page.lang;
    var url = this.url_for(path);
    if (path!="") url = '/' + lang + url;  
    if (path=="zh") url = '/zh';  
    return url;
  });