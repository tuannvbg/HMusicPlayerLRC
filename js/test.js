$(document).ready(function(){

	my = $('#HMusic').HMusic();

    my.HMsg.listenMsg('lrc_load', function(music)
    {
        var lrc = '[00:00.00]Chào mừng bạn đến với player HTML5 nghe nhạc\n[00:05.00]Player hỗ trợ chơi playlist\n[00:10.00]\n[00:25.02]Chưa hỗ trợ tốt lời LRC\n[00:15.27]Sẽ cố gắng để player hỗ trợ lời bài hát cho từng bài\n[00:20.94]Chúc các bạn nghe nhạc vui vẻ\n[00:28.18]Liên hệ: tuannvbg@gmail.com\n[00:35.19]';
        var lrcList = this.player.analysisLrc(lrc);
        this.player.loadLrc(lrcList.list);
    });
	
    var album = {
        name:'Việt Nam Tuyển Chọn',
        description:'V.A',
		active:'active',
        musicList:[
            {
                name:'Mỹ Nhân',
                author:'Đinh Đại Vũ',
                album:'The Best Of Dinh Dai Vu',
                src:'https://archive.org/download/dinh.-dai.-vu-my.-nhan/Dinh.Dai.Vu-My.Nhan.mp3',
                cover:'https://avatar-nct.nixcdn.com/singer/avatar/2018/03/27/3/f/5/f/1522142059144.jpg',
                lrc:'[00:00.00]Bài hát: Mỹ Nhân\n[00:02.00]Ca sĩ: Đinh Đại Vũ\n[00:04.00]\n[00:25.02]Lướt qua ngày tháng\n[00:26.27]Mãi trôi theo hình dung kia\n[00:29.94]Nụ cười xinh bờ môi cong\n[00:32.18]Dáng em yêu kiều\n[00:35.19]Chọn bông hoa sắc hương này\n[00:36.81]Giữ mãi cho riêng mình em thôi\n[00:41.12]Lời yêu thương\n[00:42.51]Có đơn phương với em không!\n[00:47.30]Trái tim này đã lỡ yêu em từ bao lâu\n[00:51.96]Người con gái dịu dàng\n[00:54.22]Như những cánh hoa hồng\n[00:57.27]Liệu rằng anh viết thư tình\n[00:59.08]Muốn nói nhớ em được không em\n[01:03.15]Chờ hồi âm dẫu bao lâu cũng không sao\n[01:07.62]\n[01:08.94]Mỹ nhân ơi xinh đẹp tuyệt vời\n[01:14.57]Muốn theo em đi đến chân trời\n[01:20.06]Lắng nghe tim bồi hồi\n[01:22.57]Ngày đêm nhớ thương em\n[01:26.38]Đến nơi nào anh sẽ gặp nàng\n[01:31.31]Mỹ nhân ơi xinh đẹp tuyệt vời\n[01:36.89]Trái tim anh muốn nói bao lời\n[01:42.44]Giấc mơ kia nồng nàn\n[01:44.93]Cùng em mãi sánh đôi\n[01:48.06]Anh sẽ giữ mãi em không rời\n[01:53.21]Từ ngày anh gặp được em\n[01:54.78]Mỹ nhân ở trên trần gian ngã ngũ\n[01:56.70]Bao lầm than khốn khổ\n[01:57.96]Vì dư tình tan đã cũ\n[01:59.34]Gặp nhau là thiên duyên tiền định\n[02:00.78]Đã làm hai ta vấn vương\n[02:02.21]Nào biết nàng\n[02:02.96]Biết ta biết làm tim ta chấn thương\n[02:04.96]Vì trót thương trót nhớ\n[02:06.21]Nên muốn theo nàng mãi về sau\n[02:07.77]Nụ cười cả ánh mắt\n[02:09.02]Khiến ta lại càng muốn kề nhau\n[02:10.72]Dẫu mai sau có bao nàng mỹ nữ\n[02:12.41]Sắc hoa gọi mời thì nàng ơi\n[02:14.24]Ta sẽ luôn ở bên em trọn đời, vì\n[02:16.70]Trái tim này đã lỡ yêu em từ bao lâu\n[02:21.36]Người con gái dịu dàng\n[02:23.62]Như những cánh hoa hồng\n[02:26.67]Liệu rằng anh viết thư tình\n[02:28.48]Muốn nói nhớ em được không em\n[02:32.55]Chờ hồi âm dẫu bao lâu cũng không sao\n[02:37.02]\n[02:38.34]Mỹ nhân ơi xinh đẹp tuyệt vời\n[02:43.97]Muốn theo em đi đến chân trời\n[02:49.46]Lắng nghe tim bồi hồi\n[02:51.97]Ngày đêm nhớ thương em\n[02:55.78]Đến nơi nào anh sẽ gặp nàng\n[03:00.71]Mỹ nhân ơi xinh đẹp tuyệt vời\n[03:06.29]Trái tim anh muốn nói bao lời\n[03:11.84]Giấc mơ kia nồng nàn\n[03:14.33]Cùng em mãi sánh đôi\n[03:17.46]Anh sẽ giữ mãi em không rời\n[03:22.82]Mỹ nhân ơi xinh đẹp tuyệt vời\n[03:28.51]Muốn theo em đi đến chân trời\n[03:33.96]Lắng nghe tim bồi hồi\n[03:36.82]Ngày đêm nhớ thương em\n[03:40.35]Đến nơi nào anh sẽ gặp nàng\n[03:45.22]Mỹ nhân ơi xinh đẹp tuyệt vời\n[03:50.90]Trái tim anh muốn nói bao lời\n[03:56.40]Giấc mơ kia nồng nàn\n[03:59.23]Cùng em mãi sánh đôi\n[04:02.47]Anh sẽ giữ mãi em không rời\n[04:07.47]',
				active:'active'
            },
            {
                name:'T\u00ecnh S\u1ea7u Thi\u00ean Thu Mu\u00f4n L\u1ed1i',
                author:'Do\u00e3n Hi\u1ebfu',
                album:'Tuy\u1ec3n ch\u1ecdn nh\u1ea1c Vi\u1ec7t Nam 2021',
                src:'https://archive.org/download/doan.-hieu-tinh.-sau.-thien.-thu.-muon.-loi/Doan.Hieu-Tinh.Sau.Thien.Thu.Muon.Loi.mp3',
                cover:'https://ia801405.us.archive.org/9/items/doan.-hieu.-avatar-2/Doan.Hieu.Avatar2.jpg',
                lrc:'[ar: Doãn Hiếu]\n[ti: Tình Sầu Thiên Thu Muôn Lối]\n[length: 04:23]\n[00:00.00]Bài hát: Tình Sầu Thiên Thu Muôn Lối\n[00:02.00]Ca sĩ: Doãn Hiếu\n[00:04.00]\n[00:19.97]Giờ người nơi đâu em hỡi\n[00:22.60]Chắc em đã đi rồi\n[00:24.80]Chỉ còn anh nơi đây một mình\n[00:26.86]Phải uống cho quên mà thôi\n[00:29.49]Chuyện đời đâu ai biết trước\n[00:32.11]Lúc ta yêu điên cuồng\n[00:34.37]Tưởng rằng sẽ mãi thiên thu\n[00:36.11]Lòng chẳng đổi thay hết yêu là buông\n[00:39.40]Na Na Na\n[00:44.06]Nhiều lần con tim lênh đênh\n[00:45.81]Ở lại một chút thôi mà\n[00:48.75]Tình sầu thiên thu muôn lối\n[00:51.25]Nỗi nhớ mang theo một đời\n[00:53.46]Để lại bao nhiêu kí ức\n[00:55.33]Cùng ngàn nỗi đau ở đây em hỡi\n[00:58.26]Biển rộng trời cao tăm tối\n[01:00.76]Bởi em đi mất rồi\n[01:03.20]Để lại anh bơ vơ một mình\n[01:05.51]Giữa chốn đông người\n[01:07.97]Người làm tim anh nhức nhối\n[01:10.40]Giá như em ở lại\n[01:12.77]Kể từ khi em ra đi\n[01:14.53]Lòng này nát tan chẳng yêu một ai\n[01:17.52]Để lòng tương tư em mãi\n[01:20.22]Những cơn mê u hoài\n[01:22.40]Chuyện tình yêu luôn lênh đênh\n[01:24.15]Theo anh những tháng năm dài\n[01:27.21]Huh Oh Huh\n[01:36.79]Huh Oh Huh..\n[01:44.26]Yeah Eh\n[01:46.45]\n[02:07.97]Giờ người nơi đâu em hỡi\n[02:10.34]Chắc em đã đi rồi\n[02:12.78]Chỉ còn anh nơi đây một mình\n[02:14.91]Phải uống cho quên mà thôi\n[02:17.60]Chuyện đời đâu ai biết trước\n[02:20.28]Lúc ta yêu điên cuồng\n[02:22.34]Tưởng rằng sẽ mãi thiên thu\n[02:24.15]Lòng chẳng đổi thay, hết yêu cũng buông\n[02:27.47]Na Na\n[02:31.94]Nhiều lần con tim lênh đênh\n[02:33.93]Ở lại một chút thôi mà\n[02:36.73]Tình sầu thiên thu muôn lối\n[02:39.23]Nỗi nhớ mang theo một đời\n[02:41.46]Để lại bao nhiêu kí ức\n[02:43.33]Cùng ngàn nỗi đau ở đây em hỡi\n[02:46.26]Biển rộng trời cao tăm tối\n[02:48.76]Bởi em đi mất rồi\n[02:51.20]Để lại anh bơ vơ một mình\n[02:53.51]Giữa chốn đông người\n[02:55.97]Người làm tim anh nhức nhối\n[02:58.40]Giá như em ở lại\n[03:00.77]Kể từ khi em ra đi\n[03:02.53]Lòng này nát tan chẳng yêu một ai\n[03:05.52]Để lòng tương tư em mãi\n[03:08.22]Những cơn mê u hoài\n[03:10.40]Chuyện tình yêu luôn lênh đênh\n[03:12.15]Theo anh những tháng năm dài\n[03:15.21]Tình gian dối, hằn in suốt bao năm trời\n[03:19.78]Thôi là thôi hỡi em ơi\n[03:22.15]Bàn tay đã buông lơi\n[03:24.78]Phận thì không tới\n[03:27.09]Người đi cũng đã đi rồi\n[03:29.22]Bèo dạt thì mây trôi\n[03:31.66]Có tiếc nuối có nhớ đến mấy cũng đành thôi\n[03:35.14]\n[03:55.75]Tình sầu thiên thu muôn lối\n[03:58.44]Nỗi nhớ mang theo một đời\n[04:00.81]Để lại bao nhiêu kí ức\n[04:02.50]Cùng ngàn nỗi đau ở đây em hỡi\n[04:05.50]Biển rộng trời cao tăm tối\n[04:07.94]Bởi em đi mất rồi\n[04:10.33]Để lại anh bơ vơ một mình\n[04:12.70]Giữa chốn đông người\n[04:15.10]'
            },
			{
                name:'Tình Anh',
                author:'Đình Dũng',
                album:'The Best Of Đình Dũng',
                src:'https://dl.dropboxusercontent.com/s/irsnlq9i7kngod0/Dinh.Dung-Tinh.Anh.mp3',
                cover:'https://dl.dropboxusercontent.com/s/06h55qv3ljsi1ct/Dinh.Dung-Tinh.Anh.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/nx1ihgzx3nz88ir/Dinh.Dung-Tinh.Anh.lrc',
				active:'active'
            },
            {
                name:'Sai Lầm Của Anh',
                author:'Đình Dũng',
                album:'The Best Of Đình Dũng',
                src:'https://dl.dropboxusercontent.com/s/09if0qezbrues7v/Dinh.Dung-Sai.Lam.Cua.Anh.mp3',
                cover:'https://dl.dropboxusercontent.com/s/o821dzm5efu04vu/Dinh.Dung-Sai.Lam.Cua.Anh.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/r3evpg942fojbof/Dinh.Dung-Sai.Lam.Cua.Anh.lrc'
            },
            {
                name:'Anh Không Tha Thứ',
                author:'Đình Dũng',
                album:'The Best Of Đình Dũng',
                src:'https://dl.dropboxusercontent.com/s/1ezhi99a35b79kn/Dinh.Dung-Anh.Khong.Tha.Thu.mp3',
                cover:'https://dl.dropboxusercontent.com/s/9pot4fdfgenxeo2/Dinh.Dung-Anh.Khong.Tha.Thu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/hf9i9tfj8xxg4uh/Dinh.Dung-Anh.Khong.Tha.Thu.lrc'
            },
			{
                name:'Liên Khúc Ai Cho Tôi Tình Yêu',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/mjjchykr8wyy7qo/Tuan.Vu-Lien.Khuc.Ai.Cho.Toi.Tinh.Yeu.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/gtky197zz4prcmv/Tuan.Vu-Lien.Khuc.Ai.Cho.Toi.Tinh.Yeu.lrc',
				active:'active'
            },
            {
                name:'Liên Khúc Ngày Xưa Anh Nói',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/95e7852glfgtis4/Tuan.Vu-Lien.Khuc.Ngay.Xua.Anh.Noi.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/i61nvjdifl5rla1/Tuan.Vu-Lien.Khuc.Ngay.Xua.Anh.Noi.lrc'
            },
            {
                name:'Liên Khúc Thành Phố Buồn',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/fquzc4pyyfaqeod/Tuan.Vu-Lien.Khuc.Thanh.Pho.Buon.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/pr4h81whptutjio/Tuan.Vu-Lien.Khuc.Thanh.Pho.Buon.lrc'
            },
            {
                name:'Liên Khúc Bông Cỏ May',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/vjeeyj5jpbdhzsp/Tuan.Vu-Lien.Khuc.Tuan.Vu.1-Phan.2.Bong.Co.May.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/w48tipailtynr3v/Tuan.Vu-Lien.Khuc.Bong.Co.May.lrc'
            },
            {
                name:'Liên Khúc Chuyện Tình Lan Và Điệp',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/vjeeyj5jpbdhzsp/Tuan.Vu-Lien.Khuc.Tuan.Vu.1-Phan.2.Bong.Co.May.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/kop62xfsu8e5x5s/Tuan.Vu.-Lien.Khuc.Chuyen.Tinh.Lan.Va.Diep.lrc'
            }
        ]
    };
	var album2 = {
        name:'The Best Of Đình Dũng',
        description:'Đình Dũng',
		active:'active',
        musicList:[
            {
                name:'Tình Anh',
                author:'Đình Dũng',
                album:'The Best Of Đình Dũng',
                src:'https://dl.dropboxusercontent.com/s/irsnlq9i7kngod0/Dinh.Dung-Tinh.Anh.mp3',
                cover:'https://dl.dropboxusercontent.com/s/06h55qv3ljsi1ct/Dinh.Dung-Tinh.Anh.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/nx1ihgzx3nz88ir/Dinh.Dung-Tinh.Anh.lrc',
				active:'active'
            },
            {
                name:'Sai Lầm Của Anh',
                author:'Đình Dũng',
                album:'The Best Of Đình Dũng',
                src:'https://dl.dropboxusercontent.com/s/09if0qezbrues7v/Dinh.Dung-Sai.Lam.Cua.Anh.mp3',
                cover:'https://dl.dropboxusercontent.com/s/o821dzm5efu04vu/Dinh.Dung-Sai.Lam.Cua.Anh.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/r3evpg942fojbof/Dinh.Dung-Sai.Lam.Cua.Anh.lrc'
            },
            {
                name:'Anh Không Tha Thứ',
                author:'Đình Dũng',
                album:'The Best Of Đình Dũng',
                src:'https://dl.dropboxusercontent.com/s/1ezhi99a35b79kn/Dinh.Dung-Anh.Khong.Tha.Thu.mp3',
                cover:'https://dl.dropboxusercontent.com/s/9pot4fdfgenxeo2/Dinh.Dung-Anh.Khong.Tha.Thu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/hf9i9tfj8xxg4uh/Dinh.Dung-Anh.Khong.Tha.Thu.lrc'
            }
        ]
    };
	var album3 = {
        name:'The Best Of Tuấn Vũ',
        description:'Tuấn Vũ',
		active:'active',
        musicList:[
            {
                name:'Liên Khúc Ai Cho Tôi Tình Yêu',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/mjjchykr8wyy7qo/Tuan.Vu-Lien.Khuc.Ai.Cho.Toi.Tinh.Yeu.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/gtky197zz4prcmv/Tuan.Vu-Lien.Khuc.Ai.Cho.Toi.Tinh.Yeu.lrc',
				active:'active'
            },
            {
                name:'Liên Khúc Ngày Xưa Anh Nói',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/95e7852glfgtis4/Tuan.Vu-Lien.Khuc.Ngay.Xua.Anh.Noi.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/i61nvjdifl5rla1/Tuan.Vu-Lien.Khuc.Ngay.Xua.Anh.Noi.lrc'
            },
            {
                name:'Liên Khúc Thành Phố Buồn',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/fquzc4pyyfaqeod/Tuan.Vu-Lien.Khuc.Thanh.Pho.Buon.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/pr4h81whptutjio/Tuan.Vu-Lien.Khuc.Thanh.Pho.Buon.lrc'
            },
            {
                name:'Liên Khúc Bông Cỏ May',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/vjeeyj5jpbdhzsp/Tuan.Vu-Lien.Khuc.Tuan.Vu.1-Phan.2.Bong.Co.May.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/w48tipailtynr3v/Tuan.Vu-Lien.Khuc.Bong.Co.May.lrc'
            },
            {
                name:'Liên Khúc Chuyện Tình Lan Và Điệp',
                author:'Tuấn Vũ',
                album:'The Best Of Tuấn Vũ',
                src:'https://dl.dropboxusercontent.com/s/vjeeyj5jpbdhzsp/Tuan.Vu-Lien.Khuc.Tuan.Vu.1-Phan.2.Bong.Co.May.mp3',
                cover:'https://dl.dropboxusercontent.com/s/2pn3efl9kpd7cfw/Tuan.Vu.Avatar.jpg',
                lrc:'https://dl.dropboxusercontent.com/s/kop62xfsu8e5x5s/Tuan.Vu.-Lien.Khuc.Chuyen.Tinh.Lan.Va.Diep.lrc'
            }
        ]
    };
	my.player.addAlbum(album);
	//my.player.addAlbum(album2);
	//my.player.addAlbum(album3);
    my.player.randomMusic();

});