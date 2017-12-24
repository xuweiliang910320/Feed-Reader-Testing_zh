/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */
'use strict'
var varOnload = 0;
/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
		it('urls are not null', function() {
			for(var i=0;i<allFeeds.length;i++ ){
				console.log(allFeeds[i].url);
				expect(allFeeds[i].url).not.toBe(null);
			}
		});

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
		it('names are not null', function() {
			for(var i=0;i<allFeeds.length;i++ ){
				console.log(allFeeds[i].name);
				expect(allFeeds[i].name).not.toBe(null);
			}
		});
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
	describe('The menu', function() {
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
		
		it('menu-hidden by default',function() {
			
			if(0 === varOnload){
				var tag1 = document.getElementsByClassName('menu-hidden');
				//expect(tag1[0]).not.toBe(null);	
				if(tag1[0] === undefined){
					varOnload = 1;//fail
				}
				else
				{
					varOnload = 2;
				}
				
			}

			expect(varOnload).toBe(2);
				
		});
		
         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */

		it('menu-hidden is able to toggle', function(){//点击测试这个 每次似乎都是完全重新加载?课程好像没讲怎么处理?
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBeFalsy();//此时显示
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBeTruthy();//此时隐藏
		});
	});
    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
	describe("Initial Entries", function(){
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
		beforeEach(function(done){
			for(var i=0; i<allFeeds.length; i++){
				loadFeed(i ,function(){
					done();
				});
			}
		});
		
		it('.feed should have at least 1 .entry element',function(done){
			expect($('.feed').find('.entry')).toBeDefined();
			console.log($('.feed').find('.entry'));
			done();
		}); 
	});
    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
	describe("New Feed Selection", function(){
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */
/*		 var content=[],content2=0;
		 beforeEach(function(done){
			 
			 for(var i=0; i<allFeeds.length; i++){
				loadFeed(i , done);
				 //console.log($('.feed'));
			 }
			
			done();
			//loadFeed(2 , done);
			//content2 = $('.feed').children('.entry-link');//[0].children('.entry')[0];
		});
		
		it('new feed should be different from last one', function(done){
			//content2 = $('.feed');
			//expect(content2).not.toBe(content);
			content = $('.feed').children('.entry');//.children('a')[0].children('article')[0];//[0].children('.entry')[0];
			console.log(content);
			expect(content2).not.toBe(content);
			done();
		});
		 */ 
		 var content = [];//,content1;
		  beforeEach(function(done) {// （必要条件二）测试异步调用时 done 是jasmine内置的函数，测试异步调用时该参数必传
			  
			  loadFeed(0, function(){
				content[0] = $('.feed').html();
				console.log(content[0]);
				//done();
			  });
			  loadFeed(1, function(){
				content[1] = $('.feed').html();
				console.log(content[1]);
				//done();
			  });
			  
			  loadFeed(2, function(){
				content[2] = $('.feed').html();
				console.log(content[2]);
				//done();
			  });
			  
			  //for(var i = allFeeds.length -1; i >=0; i-- ) {
				loadFeed(3, function(){
					content[3] = $('.feed').html();
					console.log(content[3]);
					done();
				});// （必要条件三）异步函数loadFeed在请求成功的回调函数里调用done函数
			  //}        
		  });
        /* 
        * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
        * 记住，loadFeed() 函数是异步的。
        */
        it('content in container with class feed should be changed when function loadFeed works',function(done) {
            var j=0;
			for(var i = allFeeds.length -1; i >=0; i-- ) {
				j = i-1;
				if(i = 0)
					j = 3;
				expect(content[i]).not.toBe(content[j]);
			}
            done(); // （必要条件四）此处必须调用该函数
        }); 
	});
}());
