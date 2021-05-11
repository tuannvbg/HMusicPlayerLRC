/**
 * Created by cm-pc-lsa on 2016/5/3.
 */
(function($, window){

    /* 加载动画 */
    function loading()
    {
        var content = '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
        return content;
    }

    /* 图片预加载 */
    function loadImage(src, success, error)
    {
        var img = new Image();
        img.onload = function()
        {
            if( typeof(success) == 'function' )
                success( img );
        };

        img.onerror = function()
        {
            if( typeof(error) == 'function' )
                error( img );
        };

        img.src = src;
    }

    /* HStorage - Ziiber */
    var HStorage = {
        setItem:function(key, data){
            localStorage.setItem(key, data);
        },
        getItem:function( key ){
            var value = localStorage.getItem( key );
            return value;
        },
        setJson:function(key, data){
            localStorage.setItem(key, JSON.stringify(data));
        },
        getJson:function( key ){
            var value = window.localStorage.getItem( key );
            return JSON.parse( value );
        },
        clear:function( key ){
            if( key )
                window.localStorage.removeItem( key );
            else
                window.localStorage.clear();
        },
        has:function( key ){
            return window.localStorage.hasOwnProperty( key );
        },
        removeKeys:function( key ){
            // 删除前缀为 key 的键
            var list = [];
            for( var i = 0; i < localStorage.length; i++ )
            {
                var str = localStorage.key(i).substr( 0, key.length );
                if( str == key )
                    list.push( localStorage.key(i) );
            }

            for( var i=0; i<list.length; i++ )
            {
                localStorage.removeItem( list[i] );
            }
        }
    };

    // 消息系统
    var HMsg = function()
    {
        this.MessageQueu = {};
        this.MessageNo = 0;

        // 监听消息
        this.listenMsg = function(event, func)
        {
            if( !this.MessageQueu[event] )
                this.MessageQueu[event] = [];

            if( typeof(func) == 'function' )
            {
                var MessageNo = this.MessageNo++;
                this.MessageQueu[event].push({no:MessageNo, func:func});
                return MessageNo;
            }
            else
                return false;
        };

        // 投递消息
        this.postMsg = function(event, args)
        {
            var args = args || {},
                selfMsg = this;

            if( !this.MessageQueu[event] || (this.MessageQueu[event].length < 1))
                return false;
            setTimeout(function()
            {
                var len = selfMsg.MessageQueu[event].length;

                for(var i=0; i<len; i++)
                {
                    if( typeof(selfMsg.MessageQueu[event][i].func) == 'function' )
                    {
                        // 是否应用父对象
                        if( typeof(args.parent) != 'undefined'){
                            selfMsg.MessageQueu[event][i].func.apply(args.parent, args.params);
                        }else{
                            selfMsg.MessageQueu[event][i].func(event, args);
                        }
                    }else
                        delete(selfMsg.MessageQueu[event][i]);
                }
            }, 0);

            return true;
        };

        // 清空消息队列
        this.clearMsg = function(){
            this.MessageQueu = [];
            this.MessageNo = 0;
        };

        // 消息是否存在监听函数
        this.hasEvent = function(event)
        {
            if( this.MessageQueu[event] ){
                return true;
            }else{
                return false;
            }
        };
    };

    var HPlayer = function(self)
    {
        this.set = [];

        // 解析歌词
        this.analysisLrc = function(lrc, ms)
        {
            var lrcLine = []; // 行数组
            var lineSum = 0; // 总行数
            var regexpLineTime    = /\[(\d{2})\:(\d{0,2})([\:|\.](\d{0,5})){0,1}\]/gi; // 匹配行时间
            var regexpLineTimeArr = /\[(\d{2})\:(\d{0,2})([\:|\.](\d{0,5}))?\]/; // 匹配时间子元素

            var regexpLineText = /\](?!\[)(.*)/; // 匹配歌词
            var lrcLineTimeArr = [], lrcLineTime = [], lrcLineText = '';

            var lrcObj = {
                ti:'',      // 歌曲名
                ar:'',      // 演唱
                al:'',      // 专辑
                by:'',      // 编辑
                list:[],    // 歌词列表
                offset:0    // 时间补偿值 其单位是毫秒
            };

            // 分割歌词行
            lrcLine = lrc.split(/(.*)\n/g);
            lineNumber = lrcLine.length;

            for( var i=0; i<lineNumber; i++ )
            {
                /* 循环一次 一条歌词 */
                lrcLineTime = [];
                lrcLineText = '';
                var time = 0;

                lrcLineTime = lrcLine[i].match(regexpLineTime);
                lrcLineText = lrcLine[i].match(regexpLineText);

                if( lrcLineTime != null )
                {
                    var number = lrcLineTime.length;

                    for( var a=0; a<number; a++ )
                    {
                        lrcLineTimeArr = lrcLineTime[a].match(regexpLineTimeArr);

                        if( typeof(lrcLineTimeArr[4]) != 'undefined')
                        {
                            if(ms)
                                time = Number(lrcLineTimeArr[1])*60 + Number(lrcLineTimeArr[2]) + Number(lrcLineTimeArr[4])/1000;
                            else
                                time = Number(lrcLineTimeArr[1])*60 + Number(lrcLineTimeArr[2]);
                        }
                        else
                            time = Number(lrcLineTimeArr[1])*60 + Number(lrcLineTimeArr[2]);

                        time += (lrcObj.offset/1000);   // 时间补偿值

                        lrcObj.list.push( { "time":time, "text":lrcLineText[1] } ); // 添加到歌词列表
                    }
                }
                else
                {
                    if( lrcLine[i].length > 4 )
                    {
                        /* 收集歌词信息 */
                        var ti      = /\[ti\:(.*)\]/;
                        var ar      = /\[ar\:(.*)\]/;
                        var al      = /\[al\:(.*)\]/;
                        var by      = /\[by\:(.*)\]/;
                        var offset  = /\[offset\:(.*)\]/;

                        if( ti.test(lrcLine[i]) )
                            lrcObj.ti = lrcLine[i].match(ti)[1];            // 歌名
                        else if( ar.test(lrcLine[i]) )
                            lrcObj.ar = lrcLine[i].match(ar)[1];            // 演唱
                        else if( al.test(lrcLine[i]) )
                            lrcObj.al = lrcLine[i].match(al)[1];            // 专辑
                        else if( by.test(lrcLine[i]) )
                            lrcObj.by = lrcLine[i].match(by)[1];            // lrc制作者
                        else if( offset.test(lrcLine[i]) )
                            lrcObj.offset = lrcLine[i].match(offset)[1];    // 时间补偿值
                    }
                }
            }
            // 歌词时间排序
            lrcObj.list.sort( function(e, x){ return (e.time-x.time); } );

            // console.log(lrcObj);
            return lrcObj;
        };
        
        // 加载歌词
        this.loadLrc = function(list)
        {
            if( typeof(list == 'object') && list.length > 1 )
            {
                var li = [];
                li.push( '<ul>' );
                for(var i = 0; i < list.length; i++)
                {
                    if( list[i].text.length > 2 )
                        li.push( '<li class="base">' + list[i].text + '</li>' );
                    else
                        li.push( '<li class="base">...</li>' );
                }
                li.push( '</ul>' );

                $('#HMusic-lrc').html( li.join('') );
                $('#HMusic-lrc ul li').eq(0).addClass('current');

                self.runtime.lrc = list;
                // HMusicTips( '歌词加载成功..' );
            }
            else
            {
                self.runtime.lrc = false;
                // $.HMusicTips( '歌词加载失败..' );
            }
        };
        
        this.play = function(){
            if( typeof(src) != 'undefined')
                self.audio.src = src;

            if( self.audio.src.length > 0 ){
                self.audio.play();
            }
        };
        this.pause = function(){
            if( !self.audio.paused ){
                self.audio.pause();
            }
        };
        this.src = function(src){
            if( typeof(src) != 'undefined')
                self.audio.src = src;
            return self.audio.src;
        };
        this.prev = function()
        {
            self.find('#HMusic #cover>img').remove();

            if( self.config.playMode == 1 ) // 列表循环
            {
                var albumActive = self.runtime.album.active,
                    musicActive = self.runtime.music.active,
                    conf_MusicList = self.config.dataFormat.album.musicList;

                // 判断专辑是否存在
                if( albumActive > -1 )
                {
                    // 判断歌曲列表是否存在
                    if( (this.set[albumActive][conf_MusicList] instanceof Array) )
                    {
                        // 判断歌曲列表是否有歌曲
                        var musicTotal = this.set[albumActive][conf_MusicList].length;
                        if( musicTotal > 0 )
                        {
                            var index = musicActive - 1;

                            self.runtime.album.last = albumActive; // 最后一次专辑
                            self.runtime.music.last = musicActive; // 最后一次播放的歌曲索引

                            if( index > -1 ) // 上一首歌是否存在，不存在就返回到最后一首
                                self.runtime.music.active = index;
                            else
                                self.runtime.music.active = --musicTotal;

                            this.flushData(); // 刷新列表状态
                            return true;
                        }
                    }
                }
            }

            // 单曲循环 随机播放
            this.randomMusic();
            return true;
        };
        this.next = function()
        {
            self.find('#HMusic .cover>img').remove();

            if( self.config.playMode == 1 ) // 列表循环
            {
                var albumActive = self.runtime.album.active,
                    musicActive = self.runtime.music.active,
                    conf_MusicList = self.config.dataFormat.album.musicList;

                // 判断专辑是否存在
                if(typeof(albumActive) == 'string' && albumActive.length > 0)
                {
                    // 判断歌曲列表是否存在
                    if( (this.set[albumActive][conf_MusicList] instanceof Array) )
                    {
                        // 判断歌曲列表是否有歌曲
                        var musicTotal = this.set[albumActive][conf_MusicList].length;
                        if( musicTotal > 0 )
                        {
                            var index = musicActive + 1;

                            self.runtime.album.last = albumActive; // 最后一次专辑
                            self.runtime.music.last = musicActive; // 最后一次播放的歌曲索引

                            if( index < musicTotal ) // 下一首歌是否存在，不存在就返回到第一首歌
                                self.runtime.music.active = index;
                            else
                                self.runtime.music.active = 0;

                            this.flushData(); // 刷新列表状态
                            return true;
                        }
                    }
                }
            }

            // 单曲循环 随机播放
            this.randomMusic();
            return true;
        };
        this.reload = function(){
            self.audio.load();
        };
        this.randomMusic = function(attr)
        {
            // attr： 指定随机的专辑索引
            var albumIndex = (attr !== undefined) || -1,
                albumTotal = this.set.length,
                conf_MusicList = self.config.dataFormat.album.musicList,
                conf_AlbumActive = self.config.dataFormat.album.active;

            if( albumTotal > 0 )
            {
                if(albumIndex < 0)
                {
                    // 排除不存在歌曲的专辑
                    var property = [];
                    for(var n in this.set)
                    {
                        if( (this.set[n][conf_MusicList] instanceof Array) && (this.set[n][conf_MusicList].length > 0) )
                        {
                            property.push(n);
                        }
                    }

                    var albumIndex = property[Math.floor(Math.random() * property.length)]; // 专辑索引
                }

                // 设置当前的专辑索引
                self.runtime.album.last = self.runtime.album.active;
                self.runtime.album.active = albumIndex;

                // 随机获取一首歌
                if( (this.set[albumIndex][conf_MusicList] instanceof Array) && (this.set[albumIndex][conf_MusicList].length > 1) )
                {
                    // 防止随机到相同歌曲，但是歌曲数必须大于1
                    do {
                        var musicIndex = Math.floor(Math.random() * this.set[albumIndex][conf_MusicList].length);
                    } while(musicIndex==self.runtime.music.active);
                }else{
                    var musicIndex = 0;
                }

                self.runtime.music.last = self.runtime.music.active;
                self.runtime.music.active = musicIndex;

                this.flushData();
                return true;
            }

            return false;
        };

        this.listenEvent = function(type, e)
        {
            /*
             loadstart       //客户端开始请求数据
             progress        //客户端正在请求数据
             suspend         //延迟下载
             abort           //客户端主动终止下载（不是因为错误引起），
             error           //请求数据时遇到错误
             stalled         //网速失速
             play            //play()和autoplay开始播放时触发
             pause           //pause()触发
             loadedmetadata  //成功获取资源长度
             loadeddata      //
             waiting         //等待数据，并非错误
             playing         //开始回放
             canplay         //可以播放，但中途可能因为加载而暂停
             canplaythrough  //可以播放，歌曲全部加载完毕
             seeking         //寻找中
             seeked          //寻找完毕
             timeupdate      //播放时间改变
             ended           //播放结束
             ratechange      //播放速率改变
             durationchange  //资源长度改变
             volumechange    //音量改变
             */
            if( typeof(e) == 'function' )
            {
                if( window.addEventListener )
                    self.audio.addEventListener(type, e);
                else
                    self.audio.attachEvent(type, e);
            }
        };

        // 刷新数据的状态
        this.flushData = function()
        {
            var lastAlbum   = self.runtime.album.last,      // 最后一次播放的专辑索引
                activeAlbum = self.runtime.album.active,    // 当前播放的专辑索引
                lastMusic   = self.runtime.music.last,      // 最后一次播放的歌曲索引
                activeMusic = self.runtime.music.active,    // 当前播放的歌曲索引
                conf_MusicList = self.config.dataFormat.album.musicList,
                conf_AlbumActive = self.config.dataFormat.album.active,
                conf_MusicActive = self.config.dataFormat.music.active,
                conf_MusicSrc = self.config.dataFormat.music.src;
            var albumCompare = (lastAlbum != activeAlbum);

            // 取消上次播放专辑歌曲列表的状态
            if( albumCompare && (lastAlbum > -1) )
            {
                this.set[lastAlbum][conf_AlbumActive] = 0; // 取消专辑选中状态
                if( lastMusic > -1 ){
                    this.set[lastAlbum][conf_MusicList][lastMusic][conf_MusicActive] = 0; // 取消歌曲选中状态
                }

                // 去除歌词
                self.runtime.lrc = false;
                // HStorage.setJson('HMusic_' + lastNo, self.player.set[lastNo]);
            }

            if( !albumCompare && (lastMusic != activeMusic) ){
                this.set[lastAlbum][conf_MusicList][lastMusic][conf_MusicActive] = 0; // 取消歌曲选中状态
            }

            // 判断专辑是否存在
            if( typeof(this.set[activeAlbum]) != 'undefined' )
            {
                // 单曲循环则跳过
                if( (lastMusic != activeMusic) || albumCompare )
                {
                    this.set[activeAlbum][conf_AlbumActive] = 1;
                    this.set[activeAlbum][conf_MusicList][activeMusic][conf_MusicActive] = 1;

                    if( activeMusic > -1 )
                    {
                        if(lastMusic != activeMusic){
                            // 去除歌词
                            self.runtime.lrc = false;
                        }
                    }else{
                        // 去除歌词
                        self.runtime.lrc = false;
                    }

                    // 设置播放器歌曲地址
                    var musicInfo = this.set[activeAlbum][conf_MusicList][activeMusic];
                    try{
                        if( musicInfo[conf_MusicSrc] !== null && musicInfo[conf_MusicSrc] !== undefined && musicInfo[conf_MusicSrc].length > 5){
                            this.src(musicInfo[conf_MusicSrc]); // 歌曲地址
                        }else{
                            throw 'music src not exist';
                        }
                    }catch(err){
                        throw err;
                    }

                    self.HMsg.postMsg('lrc_load', {parent:self,params:[musicInfo]}); // 加载歌词
                    self.HMsg.postMsg('updateview', {parent:self,params:[musicInfo]}); // 更新视图
                }
            }
        };

        /**
         * 添加音乐
         * @param pid 专辑索引
         * @param item 音乐信息 {name:'音乐名'}
         * @returns {boolean} 返回 true|false
         */
        this.addMusic = function(pid, item)
        {
            if( pid > -1 )
            {
                var musicList = self.config.dataFormat.album.musicList;

                if( !(this.set[pid][musicList] instanceof Array) ){
                    this.set[pid][musicList] = [];
                }

                if(item instanceof Array){
                    this.set[pid][musicList].concat(item);
                }else{
                    this.set[pid][musicList].push(item);
                }

                return true;
            }

            return false;
        };

        /**
         * 添加专辑
         * @param unique 专辑唯一标识
         * @param album 专辑信息 {name:'专辑名'}
         */
        this.addAlbum = function(album, isUpdate)
        {
            if(typeof(album) == 'object')
            {
                var musicList = self.config.dataFormat.album.musicList,
                    isUpdate = (isUpdate === undefined) || true;

                if( !(album[musicList] instanceof Array) ){
                    album[musicList] = [];
                }

                var total = this.set.push(album);
                if( isUpdate )
                {
                    // 投递专辑添加消息
                    self.HMsg.postMsg('paint_album', {parent:self,params:[]});
                }

                return total;
            }

            return false;
        }
    };

    var HView = function(self)
    {
        var view = self;
        /* UI设置 - 禁止选中 */
        view[0].onselectstart = function(){ return false; };

        this.paintList = function(type)
        {
            // type 1=歌曲  2=专辑
            var li = [],
                list = [],
                active = '',
                content = '',
                type = type ? type : 1,
                activeAlbum = self.runtime.album.active,
                activeMusic = self.runtime.music.active,
                config = self.config.dataFormat;

            switch(type)
            {
                case 1:
                    var conf_MusicList = config.album.musicList,
                        title = config.music.name,      // 标题属性名称
                        author = config.music.author,   // 作者属性名称
                        album = config.music.album,     // 专辑属性名称

                        active = config.music.active;

                    list = self.player.set[activeAlbum][conf_MusicList];
                    break;
                case 2:
                    var title = config.album.title,     // 专辑属性名称
                        description = config.album.description,

                        active = config.album.active;

                    list = self.player.set;
                    break;
            }

            if( list.length > 0 )
            {
                $.each(list, function( key, value )
                {
                    var item = '';
                    if( value[active] )
                        item = '<li class="active">';
                    else
                        item = '<li>';

                    if( type == 2 )
                        item += '<i class="fa fa-angle-right"></i>';

                    item += '<span class="list-taxis">' + (key+1) + '</span>';

                    if( type == 2 )
                        item += '<span class="status"></span>';

                    if( type == 2 )
                    {
                        if( value[description] )
                            item += '<span class="list-name">' + value[title] + ' - ' + value[description] + '</span>';
                        else
                            item += '<span class="list-name">' + value[title] + '</span>';
                    }
                    else
                    {
                        if( value[author] )
                            item += '<span class="list-name">' + value[title] + ' - ' + value[author] + '</span>';
                        else
                            item += '<span class="list-name">' + value[title] + '</span>';
                    }

                    item += '</li>';
                    li.push(item);
                });

                content = '<ul>' + li.join('') + '</ul>';

                if( type == 2 )
                {
                    // 修改专辑数量
                    view.find('#list-album .number').text( self.player.set.length );
                    view.find('#list-album .block-content').html( content );
                    view.find('#list-album .block-content').mCustomScrollbar({mouseWheelPixels:200});
                }
                else
                {
                    view.find('#list-music .block-content').html( content );
                    view.find('#list-music .block-content').mCustomScrollbar({mouseWheelPixels:200});
                }
            }
            else
                view.find('#list-music .block-content').html('');
        };

        var viewEvent = {
            btn_side:function()
            {
                // 侧边栏按钮
                var eleI = $(this).find('i');
                if( eleI.hasClass('active') )
                {
                    // 收缩
                    eleI.removeClass('active');
                    view.removeClass('active');
                    self.HMsg.postMsg('side', {parent:self, params:[0]});
                }else{
                    // 伸展
                    eleI.addClass('active');
                    view.addClass('active');
                    self.HMsg.postMsg('side', {parent:self, params:[1]});
                }
            },
            control_loop:function()
            {
                switch(self.config.playMode)
                {
                    case 1:
                        self.config.playMode = 2;
                        $(this).removeClass('fa-exchange').addClass('fa-random');
                        view.find('#arguments_type>i').removeClass('fa-exchange').addClass('fa-random');
                        view.find('#arguments_type>span').text('随机播放');
                        break;
                    case 2:
                        self.config.playMode = 3;
                        $(this).removeClass('fa-random').addClass('fa-retweet');
                        view.find('#arguments_type>i').removeClass('fa-random').addClass('fa-retweet');
                        view.find('#arguments_type>span').text('单曲循环');
                        break;
                    case 3:
                        self.config.playMode = 1;
                        $(this).removeClass('fa-retweet').addClass('fa-exchange');
                        view.find('#arguments_type>i').removeClass('fa-retweet').addClass('fa-exchange');
                        view.find('#arguments_type>span').text('列表循环');
                        break;
                }

                self.HMsg.postMsg('playmode', {parent:self, params:[self.config.playMode]});
            },
            control_status:function()
            {
                if( self.audio.paused )
                    self.player.play();
                else
                    self.player.pause();
            },
            control_prev:function(){
                self.player.prev();
                self.player.play();
            },
            control_next:function(){
                self.player.next();
                self.player.play();
            },
            control_heart:function(){
                $(this).toggleClass('active');
            },
            FunBtnList:function()
            {
                // 功能按钮
                var has = $(this).hasClass('active');
                if( has )
                {
                    $(this).removeClass('active');
                    view.find('.an-list').removeClass('active');
                    // $('.an-list .list-block').removeClass('active');
                }else{
                    $(this).addClass('active');
                    view.find('.an-list').addClass('active');
                    // $('.an-list .list-block').addClass('active');
                }
            },
            FunBtnLrc:function()
            {
                // 功能按钮 - 歌词开关
                var has = $(this).hasClass('active');
                if( has )
                {
                    self.config.openLrc = 0;
                    $(this).removeClass('fa-toggle-on').removeClass('active').addClass('fa-toggle-off');
                    view.find('.arguments-lrc').text('歌词关闭');
                    $('#HMusic-lrc').removeClass('active');
                }else{
                    self.config.openLrc = 1;
                    $(this).removeClass('fa-toggle-off').addClass('fa-toggle-on').addClass('active');
                    view.find('.arguments-lrc').text('歌词开启');
                    $('#HMusic-lrc').addClass('active');
                }
            },
            ProgressBar:function(e)
            {
                var nowlong = self.audio.duration / 365 * e.offsetX;
                if( self.audio.src )
                    self.audio.currentTime = nowlong;
            },
            VolumeBar:function(evt)
            {
                var offset_left = $(this).offset().left;
                var left = evt.pageX - offset_left;
                var width = $('#VolumeBar').width();
                self.audio.volume = (left/width).toFixed(2);
            }
        };
        
        // 绑定事件
        for(var key in viewEvent){
            view.find('#' + key).on('click', viewEvent[key]);
        }

        var eventCallBack = {
            play:function()
            {
                view.find('.control-status>i').addClass('active');
                view.find('#cover').addClass('animation-roate');
                view.find('.flat').addClass('active');

                // 修改专辑显示状态
                // if(self.runtime.album.active != self.runtime.album.last)
                {
                    view.find('#list-album li.active>.status').html('').removeClass('active');
                    view.find('#list-album li').eq(self.runtime.album.active).addClass('active');
                    view.find('#list-album .active>.status').html('正在播放 &gt; ');
                }

                self.HMsg.postMsg('play', {parent:self, params:[]}); // 投递播放消息
            },
            pause:function(no)
            {
                view.find('#control_status>i').removeClass('active');
                view.find('#cover').removeClass('animation-roate');
                view.find('.flat').removeClass('active');
                if( self.runtime.album.active > -1 )
                    view.find('#list-album .active>.status').html('暂停播放 &gt; ');

                self.HMsg.postMsg('pause', {parent:self, params:[]}); // 投递暂停消息
            },
            ended:function(no)
            {
                /* 播放结束 */
                view.find('#control_status>i').removeClass('active');
                view.find('#cover').removeClass('animation-roate');

                // 去除歌词
                self.runtime.lrc = false;
                $('#HMusic-lrc').html('<ul><li class="base">HMusic 音乐播放器</li></ul>');

                view.find('.arguments-time').text('00:00');
                view.find('.progress-bar .active').width(0);

                switch(self.config.playMode)
                {
                    case 1: // 列表
                        self.player.next();
                        break;
                    case 2: // 随机
                        self.player.random();
                        break;
                    case 3: // 单曲
                        self.runtime.album.last = self.runtime.album.active;
                        self.runtime.music.last = self.runtime.music.active;
                        self.player.flushData();
                        break;
                }
                self.player.play();

                self.HMsg.postMsg('ended', {parent:self, params:[]}); // 投递播放停止消息
            },
            timeupdate:function(no)
            {
                /* 播放时间改变 */
                var childTime = view.find('.arguments-time'),
                    childActive = view.find('.progress-bar .active'),
                    currentTime = self.audio.currentTime,
                    duration = self.audio.duration;

                if( self.audio.currentTime < self.audio.duration )
                {
                    /* 播放进度条 */
                    var nowBar = currentTime / duration * 100;
                    childTime.text( HMusic.prototype.time_s2m( Math.floor(currentTime) ) );
                    childActive.width( nowBar.toFixed(2) + '%' );
                }

                //  歌词开关
                if( self.config.openLrc )
                    self.view.updateLrc();

                self.HMsg.postMsg('timeupdate', {parent:self, params:[currentTime, duration]}); // 播放时间改变消息
            },
            loadstart:function(no)
            {
                // 开始请求数据消息
                self.HMsg.postMsg('loadstart', {parent:self, params:[]});
            },
            loadedmetadata:function(no)
            {
                // 获取到资源长度
                var time = HMusic.prototype.time_s2m(Math.floor(self.audio.duration));
                view.find('.arguments-total').text(time);

                self.HMsg.postMsg('loadedmetadata', {parent:self, params:[self.audio.duration]});
            },
            loadeddata:function(no)
            {
                // 数据加载完成
                self.HMsg.postMsg('loadeddata', {parent:self, params:[]})
            },
            progress:function(no)
            {
                // 客户端正在请求数据
                self.HMsg.postMsg('progress', {parent:self, params:[]}); // 开始请求数据消息
            },
            canplay:function(no)
            {
                // 可以播放，但中途可能因为加载而暂停
                self.HMsg.postMsg('canplay', {parent:self, params:[]})
            },
            canplaythrough:function(no)
            {
                // 可以播放，歌曲全部加载完毕
                self.HMsg.postMsg('canplaythrough', {parent:self, params:[]})
            },
            durationchange:function(no)
            {
                // 资源长度改变
                self.HMsg.postMsg('durationchange', {parent:self, params:[]})
            },
            volumechange:function(no)
            {
                // 音量改变
                var width = view.find('#VolumeBar').width();
                var volume = self.audio.volume;

                if( (volume > 0) && (volume < 1) )
                {
                    var left = volume * width;
                    view.find('#VolumeBar>.progress-bg').width( left );

                    if( view.find('.btn-trumpet').hasClass('fa-volume-off') )
                        view.find('.btn-trumpet').removeClass('fa-volume-off');

                    if( left > (width / 2) ){
                        view.find('.btn-trumpet').removeClass('fa-volume-down').addClass('fa-volume-up');
                    }else{
                        view.find('.btn-trumpet').removeClass('fa-volume-up').addClass('fa-volume-down');
                    }
                }
                else if( volume <= 0 )
                {
                    view.find('#VolumeBar>.progress-bg').width(0);
                    view.find('.btn-trumpet').removeClass('fa-volume-up').removeClass('fa-volume-down').addClass('fa-volume-off');
                }
                else if( volume >= 1 ){
                    view.find('#VolumeBar>.progress-bg').width(width);
                }

                self.HMsg.postMsg('volumechange', {parent:self, params:[]});
            },
            seeking:function(no)
            {
                self.HMsg.postMsg('seeking', {parent:self, params:[]});
            },
            ratechange:function(no)
            {
                // 播放速率改变
                self.HMsg.postMsg('ratechange', {parent:self, params:[]});
            },
            error:function(no)
            {
                // 请求数据时遇到错误
                var networkState = self.audio.networkState; // 0.此元素未初始化  1.正常但没有使用网络  2.正在下载数据  3.没有找到资源
                var errorCode = self.audio.error.code; // 1.用户终止 2.网络错误 3.解码错误 4.URL无效
                self.HMsg.postMsg('error', {parent:self, params:[errorCode]});
            }
        };

        for(var k in eventCallBack){
            self.player.listenEvent(k, eventCallBack[k]);
        }

        /* 底部 - 拖到音量按钮 - 按下 */
        view.find('#VolumeBar .drag').mousedown(function()
        {
            var dragEnter = false;
            var me = $(this);
            var volumeBarWidth = view.find('#VolumeBar').width();

            $(document).on( 'mousemove', function(evt){
                dragEnter = true;
                me.addClass('active');
                document.onselectstart = function(){event.returnValue=false;};

                var offset_left = view.find('#VolumeBar').offset().left;
                var left = evt.pageX - offset_left;
                if( (left > -1) && (left <= volumeBarWidth) )
                {
                    self.audio.volume = left/volumeBarWidth;
                }
                else if( left <= 0 ){
                    self.audio.volume = 0;
                }
                else{
                    self.audio.volume = 1;
                }
            });

            $(document).mouseup(function(){
                if( dragEnter == true )
                {
                    dragEnter = false;
                    me.removeClass('active');
                    $(document).off( 'mousemove' );
                    document.onselectstart = function(){ return true; };
                    view[0].onselectstart = function(){ return false; };
                }
            });
        });

        /* 列表 - 点击专辑 */
        view.find('#list-album').on('click', 'li', function()
        {
            view.find('#list-album').removeClass('active');
            view.find('#list-music').addClass('active');

            var index = $(this).index();
            self.runtime.album.current = index;

            $('#list-music .block-content').html( loading() );
            console.log(self.player.set[index][self.config.dataFormat.album.title]);
            view.find('#list-music .block-title>span').text( self.player.set[index][self.config.dataFormat.album.title] );
            
            // 生成歌曲列表
            self.HMsg.postMsg('paint_music', {parent:self, params:[]});
        });

        /* 歌曲列表 - 播放 */
        view.find('#list-music').on('click', 'li', function(evt)
        {
            var index = $(this).index();

            self.runtime.album.last = self.runtime.album.active;
            self.runtime.album.active = self.runtime.album.current;
            
            self.runtime.music.last = self.runtime.music.active;
            self.runtime.music.active = index;

            self.player.flushData();
            self.player.play();
        });

        /* 歌曲列表 - 返回 */
        view.find('#list-music>.block-title').click( function()
        {
            view.find('#list-music').removeClass('active');
            view.find('#list-album').addClass('active');
        });

        // 视图更新
        self.HMsg.listenMsg('updateview', function(musicInfo)
        {
            var view = this,
                dataFormat = this.config.dataFormat;
            view.find('#arguments_name>span').text( musicInfo[dataFormat.music.name] ); // 歌曲名称
            view.find('#arguments_author>span').text( musicInfo[dataFormat.music.author] ); // 歌曲演唱
            view.find('#arguments_special>span').text( musicInfo[dataFormat.music.album] ); // 专辑
            view.find('#cover').addClass('changing'); // 封面图

            // 歌曲时间重置
            if( (this.runtime.album.last != this.runtime.album.active) ||
                ((this.runtime.music.active != this.runtime.music.last) && (this.runtime.album.last != this.runtime.album.active))
            ){
                view.find('.arguments-total').text('00:00');
            }

            if( musicInfo.cover && musicInfo.cover.length > 5 )
            {
                loadImage( musicInfo.cover, function( obj ){
                    view.find('#cover').html( obj );
                    setTimeout(function(){ view.find('#cover').removeClass('changing'); }, 100);
                }, function( obj ){
                    console.log('图片加载失败..');
                });
            }

            // 设置歌曲列表的 UI显示
            if((this.runtime.album.current > -1) && (this.runtime.album.active == this.runtime.album.current))
            {
                view.find('#list-music li').removeClass('active');
                view.find('#list-music li').eq(this.runtime.music.active).addClass('active');
            }
            console.log( 'HMusic - 当前播放：' + musicInfo[dataFormat.music.name] + ' - ' + musicInfo[dataFormat.music.author] );
            // $.HmusicTips( '歌曲加载成功..' );
        });

        // 专辑列表更新
        self.HMsg.listenMsg('paint_album', function(){
            this.view.paintList(2);
        });

        // 歌曲列表更新
        self.HMsg.listenMsg('paint_music', function(){
            this.view.paintList(1);
        });

        // 更新歌词显示
        this.updateLrc = function()
        {
            if( self.runtime.lrc && (self.runtime.lrc instanceof Array) && self.runtime.lrc.length > 0 )
            {
                var $HMusic = $('#HMusic-lrc');

                var length = self.runtime.lrc.length,
                    currentTime = self.audio.currentTime;
                line = $HMusic.find('.current').index();

                for( var i=0; i<length; i++ )
                {
                    if( currentTime > self.runtime.lrc[i].time && ( typeof(self.runtime.lrc[i+1]) == 'undefined' || currentTime < self.runtime.lrc[i+1].time) )
                    {
                        if( line != i )
                        {
                            var top = i * 50;
                            $HMusic.find('ul').css( { top: '-' + top + 'px' } );
                            $HMusic.find('.current').removeClass( 'current' );
                            $HMusic.find('li').eq( i ).addClass( 'current' );
                        }
                    }
                }
            }
        };
    };

    var HMusic = function( setting )
    {
        var self = this;
        self.audio = new Audio(); // 核心

        // 配置类
        self.config = $.extend({}, HMusic.prototype.default, setting);

        // initialize
        self.addClass('HMusic-base');
        var content = [];
        content.push('<div class="an-panel"><div class="parameter"><div class="parameter-other"><div id="arguments_name" class="left"><i class="fa fa-music"></i><span class="arguments-name">加载...</span></div><div class="right"><i class="fa fa-clock-o"></i><span class="arguments-time">00:00</span> /<span class="arguments-total">00:00</span></div></div><div class="parameter-other"><div id="arguments_author" class="left"><i class="fa fa-user"></i><span class="arguments-author">加载...</span></div><div class="right" id="arguments_type"><i class="fa fa-exchange"></i><span class="arguments-type">列表循环</span></div></div><div class="parameter-other"><div id="arguments_special" class="left"><i class="fa fa-folder"></i><span class="arguments-special">加载...</span></div><div class="right"><i class="fa fa-check-circle"></i><span class="arguments-lrc">歌词开启</span></div></div></div><div id="cover" class="cover"><img src="image/avatar.jpg"></div><div class="control"><i id="control_loop" class="control-loop fa fa-exchange" title="列表循环"></i><i id="control_prev" class="control-prev fa fa-backward" title="上一首"></i><div id="control_status" class="control-status"><i class="control-play fa fa-play" title="播放"></i><i class="control-pause fa fa-pause" title="暂停"></i></div><i id="control_next" class="control-next fa fa-forward" title="下一首"></i><i id="control_heart" class="control-heart fa fa-heart" title="收藏"></i></div><div id="ProgressBar" class="progress-bar"><div class="bar"><div class="active"></div></div></div><div class="bottom"><div class="bottom-left"><i class="btn-trumpet fa fa-volume-up"></i><div id="VolumeBar" class="volume-bar"><div class="progress-bg"><div class="volume-on ts5"><div class="drag" title="音量"></div></div></div></div></div><div class="bottom-right"><div class="btn-list"><i class="fa fa-bars" id="FunBtnList" title="播放列表"></i></div><div class="btn-list"><i class="fa fa-toggle-on active" id="FunBtnLrc" title="歌词开关"></i></div></div></div></div><div class="an-list"><div id="list-album" class="list-block list-album active"><div class="block-title"><span class="title">HMusic Music Player-Album List</span>                (<span class="number">0</span>)</div><div class="block-content"></div></div><div id="list-music" class="list-block list-music"><div class="block-title"><i class="fa fa-angle-left"></i><span>Ziiber List of songs</span></div><div class="block-content"></div></div></div><div class="an-side" id="btn_side"><i class="fa fa-angle-right"></i></div><div class="flat"><i class="fa fa-music"></i><i class="fa fa-music"></i><i class="fa fa-music"></i><i class="fa fa-music"></i><i class="fa fa-music"></i><i class="fa fa-music"></i></div>');
        content.push( '<div class="HMusic-lrc active" id="HMusic-lrc"><ul><li class="base current">' + self.config.musicTitle + '</li></ul></div>' );
        content.push('<div id="HMusicTips" class="HMusicTips"></div>');
        self.append( content.join('') );

        // 运行时 - 存放播放器运行时的状态
        self.runtime = {
            album:{
                active:-1, // 当前播放的专辑
                current:-1, // 当前选择的专辑
                last:-1 // 上次播放的专辑
            },
            music:{
                active:-1,
                last:-1
            },
            lrc:false
        };

        // HPlayer.apply(self);
        // HView.apply(self);

        // 消息事件
        self.HMsg = new HMsg();

        // 核心播放类
        self.player = new HPlayer(self);

        // 提示插件
        self.HMusicTips = function(content, time)
        {
            var self = $('#HMusicTips');
            var time = time ? time:3000;

            if( self.hasClass('active') )
                clearTimeout( $.Htips_hwnd );

            self.text(content);
            self.addClass('active');
            $.Htips_hwnd = setTimeout( function(){ self.removeClass('active'); }, time );
        };

        // 视图控制类
        self.view = new HView(self);

        self.audio.volume = self.config.volume; // 音量
        self.audio.autoplay = self.config.autoPlay; // 自动播放, 设置或返回是否在就绪（加载完成）后随即播放音频。
        self.audio.controls = false; // 是否显示控件
        self.audio.defaultMuted = false; // 设置或返回音频默认是否静音
        // self.audio.defaultPlaybackRate // 设置或返回音频的默认播放速度。

        // 返回整个封装的对象 插件内的this为jQuery对象
        return self;
    };

    // 默认配置
    HMusic.prototype.default = {
        autoPlay:true, // 自动播放
        autoSide:1, // 开启侧边栏
        openLrc:true, // 开启歌词
        playMode:1, // 播放模式 1.列表 2.随机 3.单曲
        preLoad:'metadata', // 预加载 auto – 当页面加载后载入整个音频，metadata – 当页面加载后只载入元数据，none – 当页面加载后不载入音频
        volume:1, // 音量
        dataFormat:{
            album:{
                title:'name',
                description:'description',
                musicList:'musicList',
                active:'active'
            },
            music:{
                name:'name',
                author:'author',
                album:'album',
                src:'src',
                cover:'cover',
                lrc:'lrc',
                active:'active'
            }
        },
        musicTitle:'HMusic music player'
    };
    
    HMusic.prototype.time_s2m = function(s, c, hour){
        c = c ? c : ':'; // 连接符号
        // 计算
        var h = 0, i = 0, arr = [];
        if(s > 60)
        {
            i = parseInt( s / 60 );
            s = parseInt( s % 60 );
            if( i > 60 ){
                h = parseInt(i/60);
                i = parseInt(i%60);
            }
        }
        // 补零
        var zero = function(v){
            return ( v>>0 ) < 10 ? "0"+v:v;
        };

        if( hour )
            arr = [zero(h),zero(i),zero(s)];
        else
            arr = [zero(i),zero(s)];
        return arr.join(c);
    };

    // 挂载到jQuery
    $.fn.HMusic = HMusic;

})(jQuery, window);