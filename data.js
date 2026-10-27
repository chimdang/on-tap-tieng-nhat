/*
  DỮ LIỆU ÔN TẬP — Chương 1 ~ 13 (trích từ tài liệu trong thư mục JAPAN và japannguphap)
  -----------------------------------------------------------------
  vocab   : mỗi dòng "Kanji|Cách đọc|Nghĩa|Loại từ|Phần". Không có kanji thì để trống phần đầu.
            Loại từ: n danh từ · v1/v2/v3 động từ nhóm I/II/III · i tính từ い · na tính từ な · adv phó từ
                     suf hậu tố/trợ số từ · exp cụm từ, giao tiếp · oth khác. Ghép bằng dấu + (vd n+v3).
  grammar : [mẫu câu, ý nghĩa, giải thích (các ý cách nhau bằng " ｜ "), ví dụ 1, ví dụ 2, ...]
  quiz    : [câu hỏi, ĐÁP ÁN ĐÚNG, sai 1, sai 2, sai 3, giải thích]
            (thứ tự đáp án được trộn tự động; "(  )" là chỗ trống)
*/
const CHAPTERS = [
{
  id: 1, title: "Chương 1",
  vocab: `
|ベトナム|Việt Nam|n|A
日本|にほん|Nhật Bản|n|A
中国|ちゅうごく|Trung Quốc|n|A
韓国|かんこく|Hàn Quốc|n|A
|タイ|Thái Lan|n|A
～人|～じん|người ～ (Cách nói quốc tịch: Tên quốc gia + じん)|suf|A
ベトナム人|ベトナムじん|người Việt Nam|n|A
日本人|にほんじん|người Nhật|n|A
中国人|ちゅうごくじん|người Trung Quốc|n|A
韓国人|かんこくじん|người Hàn Quốc|n|A
タイ人|タイじん|người Thái|n|A
私|わたし|tôi|n|A
医者|いしゃ|bác sĩ|n|A
教師|きょうし|giáo viên, giảng viên|n|A
先生|せんせい|thầy/ cô giáo|n|A
銀行員|ぎんこういん|nhân viên ngân hàng|n|A
会社員|かいしゃいん|nhân viên công ty|n|A
学生|がくせい|học sinh, sinh viên|n|A
お名前|おなまえ|tên, họ tên  ［cũng đọc: なまえ］|n|A
料理|りょうり|món ăn, việc nấu ăn|n|A
ベトナム料理|ベトナムりょうり|món ăn Việt Nam|n|A
日本料理|にほんりょうり|món ăn Nhật Bản|n|A
|ビール|bia|n|A
|コーヒー|cà phê|n|A
|ジュース|nước hoa quả|n|A
|これ、それ、あれ|cái này, cái đó, cái kia (tham khảo phần 補足, trang 21)|n|A
|こちら、そちら、あちら|đây, đó, kia (phía này, phía đó, phía kia)|n|A
|はい|vâng/ có|exp|A
|いいえ|không (ý nghĩa phủ định đơn thuần)|exp|A
|いえいえ|không sao/ không có gì (lời đáp khiêm tốn khi được xin lỗi, cảm ơn hoặc khen ngợi)|exp|A
|おはようございます|chào buổi sáng|exp|A
|こんにちは|chào buổi trưa/ chiều|exp|A
|こんばんは|chào buổi tối|exp|A
|すみません|① xin lỗi ② cảm ơn (do cảm thấy áy náy khi phiền người khác giúp đỡ mình)|exp|A
|はじめまして|rất vui được gặp anh/ chị (lời chào khi lần đầu gặp ai đó)|exp|A
よろしくお願いします|よろしくおねがいします|rất mong được anh/ chị giúp đỡ|exp|A
|そうです|đúng vậy|exp|A
|そうですか|vậy à, thế à?|exp|A
失礼しました|しつれいしました|xin lỗi (được dùng khi một người trót nói hoặc làm điều gì đó thất lễ với người nghe)|exp|A
大丈夫です|だいじょうぶです|không sao đâu|exp|A
|ええと|ờ, ờm... (được sử dụng khi người nói đang suy nghĩ tiếp theo sẽ nói gì)|exp|A
|あっ|A! (được dùng khi người nói ngạc nhiên, xúc động về một điều gì đó)|exp|A
今|いま|bây giờ|n+adv|B
朝|あさ|sáng sớm, buổi sáng|n+adv|B
夜|よる|buổi tối|n+adv|B
午前|ごぜん|A.M / sáng|n+adv|B
午後|ごご|P.M / chiều|n+adv|B
今日|きょう|hôm nay|n+adv|B
明日|あした|ngày mai|n+adv|B
明後日|あさって|ngày kia|n+adv|B
休み|やすみ|nghỉ, không làm việc|n|B
仕事|しごと|công việc (khi hỏi về công việc của đối phương thì sẽ dùng お仕事)  ［cũng đọc: おしごと］|n|B
学校|がっこう|trường học|n|B
図書館|としょかん|thư viện|n|B
郵便局|ゆうびんきょく|bưu điện|n|B
病院|びょういん|bệnh viện|n|B
銀行|ぎんこう|ngân hàng|n|B
会社|かいしゃ|công ty|n|B
漢字|かんじ|chữ Hán|n|B
|ひらがな|chữ hiragana|n|B
|カタカナ|chữ katakana|n|B
|レストラン|nhà hàng|n|B
|スーパー|siêu thị|n|B
|フランス|nước Pháp|n|B
～語|～ご|tiếng ～ (Ngôn ngữ = Tên quốc gia + ご)|suf|B
日本語|にほんご|tiếng Nhật|n|B
中国語|ちゅうごくご|tiếng Trung|n|B
韓国語|かんこくご|tiếng Hàn|n|B
英語|えいご|tiếng Anh (trường hợp ngoại lệ)|n|B
タイ語|タイご|tiếng Thái|n|B
ベトナム語|ベトナムご|tiếng Việt|n|B
フランス語|フランスご|tiếng Pháp|n|B
～時|～じ|～giờ|suf|B
何時|なんじ|mấy giờ|n|B
～分|～ふん|～phút  ［cũng đọc: ～ぷん］|suf|B
何分|なんぷん|mấy phút|n|B
|あの|xin lỗi, xin hỏi… (Lời đánh tiếng khi gọi hoặc bắt chuyện với ai đó, khác với từ chỉ thị 「あの」sẽ học ở bài 2B)  ［cũng đọc: あのー］|exp|B
違います|ちがいます|nhầm rồi, sai rồi, không phải|exp|B
|ありがとうございます|cảm ơn|exp|B
|もしもし|alo|exp|B
辞書|じしょ|từ điển|n|C
|かばん|cặp, túi|n|C
手帳|てちょう|sổ tay|n|C
電子辞書|でんしじしょ|kim từ điển|n|C
市役所|しやくしょ|toà thị chính|n|C
交番|こうばん|đồn cảnh sát|n|C
大使館|たいしかん|đại sứ quán|n|C
電話番号|でんわばんごう|số điện thoại|n|C
月曜日|げつようび|thứ Hai|n|C
火曜日|かようび|thứ Ba|n|C
水曜日|すいようび|thứ Tư|n|C
木曜日|もくようび|thứ Năm|n|C
金曜日|きんようび|thứ Sáu|n|C
土曜日|どようび|thứ Bảy|n|C
日曜日|にちようび|Chủ nhật|n|C
何曜日|なんようび|thứ mấy|n|C
何|なん|cái gì|n|C
|いくら|bao nhiêu tiền|n|C
～円|～えん|yên (đơn vị tiền tệ của Nhật)|suf|C
|～ドン|đồng (đơn vị tiền tệ của Việt Nam)|suf|C
本当だ|ほんとうだ|Đúng thật/ Thật này. (Dùng khi nhận ra lời của đối phương đúng với sự thật)|exp|C
|じゃ|Vậy thì, thế thì ...|exp|C
|えっ|Ô! (tiếng ngạc nhiên)|exp|C
|ああ|(thán từ thể hiện sự ngại ngùng, bối rối, xấu hổ...)|exp|C
`,
  gsec: "AAABBBCCCC", qsec: "AAABBBBBBCC",
  grammar: [
    ["(N1 は) N2 です","N1 là N2","Câu khẳng định có vị ngữ là danh từ, ở thì phi quá khứ. ｜ Dùng để giới thiệu chủng loại, thời gian, địa điểm, tên tuổi, giới tính. ｜ Trợ từ は đứng sau chủ đề câu, đọc là “wa”. ｜ 「N1 は」 có thể được lược bỏ.","鈴木です。","ナムさんは ベトナム人です。","かなえさんは 学生です。","これは フォーです。"],
    ["(N1 は) N2 ですか","N1 có phải là N2 không?","Câu nghi vấn có vị ngữ là danh từ. ｜ Trả lời: はい、そうです／(N1 は) N2 です = Phải, đúng vậy. ｜ いいえ、(N1 は) N3 です = Không phải, mà là N3.","A：田中さんですか。\nB：はい、そうです。","A：会社員ですか。\nB：いいえ、学生です。","これは フォーですか。→ いいえ、これは ブンです。"],
    ["N も ～","N cũng ～","Trợ từ も = “cũng”. ｜ Khi trả lời phủ định cho câu hỏi dùng も, trợ từ không còn là も nữa mà trở về は.","これは ベトナム料理です。それも ベトナム料理です。","ランさんは 日本人ですか。→ いいえ、ランさんは ベトナム人です。"],
    ["(N1 は) N2 じゃないです / じゃありません / ではありません","N1 không phải N2","Dạng phủ định của 「N1 は N2 です」.","田中さんは 銀行員じゃないです。","A：これは 日本語ですか。\nB：いいえ、違います。日本語じゃないです。中国語です。"],
    ["Cách nói giờ, phút: ～時 ～分","Giờ: Số đếm + 時 (何時 = mấy giờ) ｜ Phút: Số đếm + 分 (何分 = mấy phút)","1時 いちじ, 2時 にじ, 3時 さんじ, 4時 よじ, 5時 ごじ, 6時 ろくじ, 7時 しちじ, 8時 はちじ, 9時 くじ, 10時 じゅうじ, 11時 じゅういちじ, 12時 じゅうにじ. ｜ ～時半 = ～ giờ rưỡi; 午前 (AM) / 午後 (PM) đặt trước giờ. ｜ Phút: 1分 いっぷん, 2分 にふん, 3分 さんぷん, 4分 よんぷん, 5分 ごふん, 6分 ろっぷん, 7分 ななふん, 8分 はちふん/はっぷん, 9分 きゅうふん, 10分 じゅっぷん/じっぷん, 30分 さんじゅっぷん/さんじっぷん. ｜ Khi hỏi giờ, người Nhật thường không dùng は trừ khi nhấn mạnh thời điểm hỏi.","今 何時ですか。→ 今 4時です。","今 何時 何分ですか。→ 今 4時15分です。","10時半：10 giờ rưỡi"],
    ["N は 何時から 何時までですか","N từ mấy giờ đến mấy giờ?","Trả lời: ～から ～までです = Từ ～ giờ đến ～ giờ. ｜ Hỏi và trả lời về thời gian bắt đầu - kết thúc của một tổ chức, cơ quan, chương trình, sự kiện. ｜ から và まで có thể dùng riêng, độc lập.","図書館は ９時からです。","図書館は ６時までです。","A：郵便局は 何時から 何時までですか。\nB：午前9時半から 午後４時半までです。"],
    ["(N は) いくらですか","N bao nhiêu tiền?","Trả lời: (N は) số tiền です.","A：これは いくらですか。\nB：そちらは 500円です。"],
    ["(N1 は) 何ですか","N1 là cái gì?","Mẫu câu dùng để hỏi về đồ vật. ｜ 「何」 là từ để hỏi đồ vật: cái gì? ｜ Trả lời: (N1 は) N2 です.","A：これは 何ですか。\nB：カメラです。"],
    ["～ね","nhỉ?","Đặt cuối câu để xác nhận lại thông tin từ đối phương.","A：電話番号は 080-1234-5678です。\nB：080-1234-5678ですね。"],
    ["～よね / ～よ","(đúng không) nhỉ? / đấy, cơ","「よね」 = ～ (đúng không) nhỉ: đặt cuối câu để xác nhận hoặc tìm kiếm sự đồng tình. ｜ 「よ」 = ～ đấy/ cơ: đặt cuối câu để nói cho đối phương một thông tin mà người đó chưa biết.","A：今日は ３日ですよね。\nB：はい。そうです。","A：明日は 土曜日ですよね。\nB：いいえ、明日は 日曜日ですよ。"]
  ],
  quiz: [
    ["ナムさん(  ) ベトナム人です。","は","を","に","の","Trợ từ は đứng sau chủ đề câu (đọc là “wa”): N1 は N2 です."],
    ["ランさんは 日本人です。ミンさん(  ) 日本人です。(Minh cũng là người Nhật)","も","は","の","を","Trợ từ も = “cũng”."],
    ["A：ランさんも 日本人ですか。 B：いいえ、ランさん(  ) ベトナム人です。","は","も","を","で","Khi trả lời phủ định cho câu hỏi dùng も, trợ từ trở về は."],
    ["Câu nào có nghĩa 「Anh Tanaka không phải là nhân viên ngân hàng」?","田中さんは 銀行員じゃないです。","田中さんは 銀行員です。","田中さんも 銀行員ですか。","田中さんは 銀行員じゃですか。","Phủ định danh từ: N1 は N2 じゃないです."],
    ["「4時」đọc là gì?","よじ","しじ","よんじ","よっじ","4時 = よじ."],
    ["「9時」đọc là gì?","くじ","きゅうじ","ここのじ","なんじ","9時 = くじ."],
    ["「7時」đọc là gì?","しちじ","ななじ","ひちじ","なのじ","7時 = しちじ."],
    ["「10分」đọc là gì?","じゅっぷん","じゅうふん","じゅっふん","じゅうぷん","10分 = じゅっぷん (hoặc じっぷん)."],
    ["郵便局は (  )から (  )までですか。(Bưu điện làm việc từ mấy giờ đến mấy giờ?)","何時 … 何時","どこ … どこ","いくら … いくら","何 … 何","Hỏi thời gian: 何時から 何時までですか."],
    ["A：これは (  )ですか。 B：500円です。","いくら","何","何時","どこ","Hỏi giá tiền dùng いくら."],
    ["A：明日は 土曜日ですよね。 B：いいえ、明日は 日曜日(  )。(nói cho đối phương thông tin họ chưa biết)","ですよ","ですか","ですも","でした","「よ」 = ～ đấy/ cơ: nói cho đối phương một thông tin họ chưa biết."]
  ]
},
{
  id: 2, title: "Chương 2",
  vocab: `
昨日|きのう|hôm qua|adv|A
一昨日|おととい|hôm kia|n+adv|A
今朝|けさ|sáng nay|n+adv|A
先週|せんしゅう|tuần trước|n+adv|A
今週|こんしゅう|tuần này|n+adv|A
来週|らいしゅう|tuần sau|n+adv|A
誕生日|たんじょうび|sinh nhật|n|A
指輪|ゆびわ|nhẫn|n|A
|うち|nhà (Ngoài ra còn có nghĩa là "tôi, tớ" hay "chúng tôi")|n|A
雨|あめ|mưa|n|A
晴れ|はれ|nắng|n|A
曇り|くもり|âm u, nhiều mây|n|A
|アルバイト|việc làm thêm|n|A
|ゴールデンウィーク|tuần lễ vàng|n|A
|プレゼント|quà tặng|n|A
|ずっと|suốt|adv|A
一日|ついたち|ngày mùng 1|n|A
二日|ふつか|ngày mùng 2|n|A
三日|みっか|ngày mùng 3|n|A
四日|よっか|ngày mùng 4|n|A
五日|いつか|ngày mùng 5|n|A
六日|むいか|ngày mùng 6|n|A
七日|なのか|ngày mùng 7|n|A
八日|ようか|ngày mùng 8|n|A
九日|ここのか|ngày mùng 9|n|A
十日|とおか|ngày mùng 10|n|A
～日|～にち|ngày ～ (Ngoại trừ một số trường hợp đặc biệt, từ ngày 11 ta có cách nói: Số đếm + にち)|suf|A
十四日|じゅうよっか|ngày 14|n|A
二十日|はつか|ngày 20|n|A
|どうでしたか|... thế nào? ( Hỏi về cảm nhận của đối phương về một sự vật, sự việc trong quá khứ )|exp|A
誰|だれ|ai|n|B
|どなた|ai (cách nói lịch sự của 誰)|n|B
人|ひと|người|n|B
本|ほん|sách|n|B
家|いえ|nhà|n|B
鍵|かぎ|chìa khóa|n|B
傘|かさ|cái ô|n|B
車|くるま|xe ô tô|n|B
お菓子|おかし|bánh kẹo|n|B
豆|まめ|đậu|n|B
米|こめ|gạo|n|B
お酒|おさけ|rượu|n|B
|ぶどう|nho|n|B
|りんご|táo|n|B
|シーディー|CD|n|B
|スマホ|điện thoại (thông minh)|n|B
|テレビ|tivi|n|B
|パン|bánh mì|n|B
|ケーキ|bánh kem|n|B
|ワイン|rượu vang|n|B
|バイク|xe máy (từ thường dùng trong cuộc sống)|n|B
|オートバイ|xe máy (từ thường dùng trong tin tức, báo chí ...)|n|B
|カメラ|máy ảnh|n|B
|チョコレート|socola|n|B
|この|(cái bánh) này|oth|B
|その|(chiếc xe ô tô) đó|oth|B
|あの|(ngôi nhà) kia ( đứng trước và bổ nghĩa cho danh từ)|oth|B
国|くに|đất nước, quê hương|n|C
社員|しゃいん|nhân viên|n|C
職員|しょくいん|nhân viên, công chức, viên chức|n|C
作家|さっか|nhà văn, tác giả|n|C
運転手|うんてんしゅ|tài xế|n|C
大学|だいがく|trường đại học|n|C
昔|むかし|ngày xưa|n+adv|C
|エンジニア|kĩ sư|n|C
|カンパニー|công ty (thường đi sau tên riêng của 1 công ty)|n|C
|ええ|vâng|exp|C
|へえ|ồ (từ cảm thán, thể hiện sự ngạc nhiên hoặc trầm trồ)|exp|C
|よかったら|nếu được thì...|exp|C
|どうぞ|xin mời|exp|C
`,
  gsec: "AABBBBCC", qsec: "AABBBCCB",
  grammar: [
    ["(N1 は) N2 でした","N1 (đã) là N2","Câu khẳng định trong quá khứ có vị ngữ là danh từ. ｜ Muốn tạo câu nghi vấn thì thêm 「か」 ở cuối câu, giống thì phi quá khứ.","昨日は 休みでした。","5日は 誕生日でした。","これは 1,000円でした。"],
    ["(N1 は) N2 じゃなかったです / じゃありませんでした / ではありませんでした","N1 (đã) không phải là N2","Câu phủ định trong quá khứ có vị ngữ là danh từ.","昨日は 仕事じゃなかったです。","A：昨日は 仕事でしたか。\nB：いいえ、仕事じゃなかったです。休みでした。"],
    ["誰の N2ですか → N1 (chủ sở hữu) の N2 です","N2 của ai? → N2 của N1","の là trợ từ nối giữa 2 danh từ, nghĩa là “của”.","A：この かばんは 誰の かばんですか。\nB：ナムさんの かばんです。","A：これ、誰の スマホですか。\nB：あ、私のです。"],
    ["何の N2ですか → N1 (nội dung) の N2 です","N2 về cái gì? → N2 về N1","Khi trả lời không bỏ N2 sau の: ×「料理のです」 ○「料理の 本です」.","日本語の 本","ベトナム語の 先生","A：これ、何の 鍵ですか。\nB：車の 鍵です。"],
    ["どこの N2ですか → N1 (xuất xứ) の N2 です","N2 có nguồn gốc, xuất xứ ở đâu? → N2 của/ từ N1","","A：ナムさんの バイクは どこの バイクですか。\nB：韓国の バイクです。","A：田中さんの 車は どこの 車ですか。\nB：日本の 車です。"],
    ["何の N2ですか → N1 (nguyên liệu) の N2 です","N2 được làm từ gì? → N2 được làm từ N1","Khi trả lời không bỏ N2: ×「豆のです」 ○「豆の お菓子です」.","A：それは 何の お菓子ですか。\nB：豆の お菓子です。","A：日本酒は 何の お酒ですか。\nB：米の お酒です。"],
    ["N1 (nơi sở thuộc) の N2","N2 của/ thuộc (cơ quan, tổ chức) N1","","田中さんは ABCカンパニーの 社員です。","私は、大学の 職員です。"],
    ["(N1 は) N2 で N3 です","N1 là N2 và là N3","Cách nói liệt kê cho 2 danh từ trở lên đứng liền kề nhau. ｜ Trợ từ 「で」 nối trực tiếp giữa các danh từ.","田中さんは 日本人で ABCカンパニーの 社員です。","アインさんは 会社員で エンジニアです。"]
  ],
  quiz: [
    ["昨日は 休み(  )。(Hôm qua là ngày nghỉ)","でした","です","でしたか","じゃありません","Câu danh từ khẳng định quá khứ: N でした."],
    ["昨日は 仕事(  )。(Hôm qua không phải đi làm)","じゃなかったです","じゃないです","じゃなかったですか","でした","Phủ định quá khứ: N じゃなかったです / じゃありませんでした."],
    ["この かばんは (  ) かばんですか。…ナムさんの かばんです。","誰の","何の","どこの","いつの","Hỏi chủ sở hữu: 誰の N ですか."],
    ["その 本は (  ) 本ですか。…日本語の 本です。","何の","誰の","どこの","誰が","Hỏi nội dung: 何の N ですか."],
    ["ナムさんの バイクは (  ) バイクですか。…韓国の バイクです。","どこの","何の","誰の","どこで","Hỏi xuất xứ: どこの N ですか."],
    ["田中さんは 日本人(  ) ABCカンパニーの 社員です。","で","と","の","を","Liệt kê 2 danh từ cho cùng 1 người: N2 で N3 です (không dùng と)."],
    ["私は 大学(  ) 職員です。(Tôi là nhân viên của trường đại học)","の","で","と","は","N1 (nơi sở thuộc) の N2."],
    ["A：それは 何の お菓子ですか。 B：(  )。","豆の お菓子です","豆のです","豆お菓子です","豆で お菓子です","Không được bỏ N2 khi trả lời: ○「豆の お菓子です」 ×「豆のです」."]
  ]
},
{
  id: 3, title: "Chương 3",
  vocab: `
店|みせ|cửa hàng|n|A
店員|てんいん|nhân viên cửa hàng|n|A
部屋|へや|căn phòng|n|A
東京|とうきょう|Tokyo|n|A
町|まち|thành phố, thị trấn|n|A
駅|えき|nhà ga|n|A
|こっち・そっち・あっち|chỗ này, chỗ đó, chỗ kia (cách nói thân mật)|n|A
地下鉄|ちかてつ|tàu điện ngầm|n|A
毎日|まいにち|hàng ngày, ngày nào cũng|n+adv|A
最近|さいきん|gần đây|n+adv|A
|ラーメン|mì ramen|n|A
|アパート|chung cư (thấp tầng, thường có giá bình dân)|n|A
|おいしい|ngon|i|A
高い|たかい|cao, đắt|i|A
安い|やすい|rẻ|i|A
|いい|tốt, hay|i|A
悪い|わるい|xấu, dở|i|A
広い|ひろい|rộng|i|A
狭い|せまい|chật, hẹp|i|A
暑い|あつい|nóng|i|A
寒い|さむい|lạnh|i|A
古い|ふるい|cũ|i|A
新しい|あたらしい|mới|i|A
忙しい|いそがしい|bận|i|A
|きれい|sạch, đẹp|na|A
|にぎやか|náo nhiệt, nhộn nhịp|na|A
静か|しずか|yên tĩnh|na|A
暇|ひま|rảnh rỗi|na|A
便利|べんり|tiện lợi|na|A
複雑|ふくざつ|phức tạp|na|A
簡単|かんたん|đơn giản|na|A
元気|げんき|khỏe mạnh|na|A
有名|ゆうめい|nổi tiếng|na|A
丁寧|ていねい|lịch sự, cẩn thận, chỉn chu|na|A
|ハンサム|đẹp trai|na|A
|すごく|rất|adv|A
|とても|rất|adv|A
|まあまあ|tàm tạm|adv|A
|ちょっと|một chút|adv|A
少し|すこし|một chút|adv|A
|あまり|không ～ lắm|adv|A
全然|ぜんぜん|hoàn toàn (không)|adv|A
|そんなに|đến thế, đến mức như thế|adv|A
本当に|ほんとうに|thật sự|adv|A
|それに|hơn nữa|oth|A
|でも|nhưng|oth|A
|じゃ、また|hẹn gặp lại (câu chào khi tạm biệt; cũng có trường hợp nói 「じゃあ、また」, khi đó chữ 「あ」 sẽ xuống giọng)|exp|A
失礼します|しつれいします|tôi xin phép nhé. (một cách chào lịch sự khi ra về, đi vào/ rời khỏi nơi nào đó)|exp|A
|ええっ|hả? gì? (từ cảm thán, thể hiện sự giật mình ngạc nhiên, kinh ngạc)|exp|A
一人暮らし|ひとりぐらし|sống 1 mình|n|B
生活|せいかつ|cuộc sống|n|B
授業|じゅぎょう|giờ học|n|B
楽しい|たのしい|vui|i|B
寂しい|さびしい|cô đơn|i|B
小さい|ちいさい|nhỏ, bé|i|B
大きい|おおきい|to, lớn|i|B
|かわいい|đáng yêu|i|B
辛い|からい|cay|i|B
面白い|おもしろい|thú vị|i|B
多い|おおい|nhiều|i|B
明るい|あかるい|sáng sủa (tính chất sự vật); tươi sáng, lạc quan (tính cách)|i|B
難しい|むずかしい|khó|i|B
素敵|すてき|đẹp, trang nhã|na|B
親切|しんせつ|thân thiện, tốt bụng|na|B
不思議|ふしぎ|kì lạ|na|B
大変|たいへん|vất vả|na|B
頭がいい|あたまがいい|thông minh|i|B
人が多い|ひとがおおい|đông người|i|B
肉|にく|thịt|n|C
所|ところ|nơi, chỗ|n|C
|バーベキュー|nướng thịt ngoài trời/ nướng BBQ|n|C
バーベキュー場|バーベキューじょう|khu vực nướng BBQ|n|C
|パーティー|bữa tiệc|n|C
|テスト|bài kiểm tra|n|C
残念|ざんねん|tiếc, đáng tiếc|na|C
|どんな|～như thế nào (luôn đứng trước danh từ)|oth|C
|そういえば|nói mới nhớ|exp|C
山|やま|núi|n|D
富士山|ふじさん|núi Phú Sĩ|n|D
建物|たてもの|tòa nhà|n|D
歌手|かしゅ|ca sĩ|n|D
一年|いちねん|1 năm|n+adv|D
|ほう|phía ～|n|D
|どれ|cái nào|n|D
|どこ|chỗ nào; ở đâu|n|D
何|なに|cái gì|n|D
|スカート|chân váy|n|D
|パンツ|quần lót quần dài|n|D
|ズボン|quần dài|n|D
赤い|あかい|màu đỏ|i|D
黒い|くろい|màu đen|i|D
一番|いちばん|nhất, số một|adv|D
多分|たぶん|có lẽ|adv|D
|いつ|khi nào|n|D
|どちら|phía nào|n|D
|どっち|phía nào|n|D
～月|～がつ|tháng ～|suf|D
四月|しがつ|tháng 4|n|D
七月|しちがつ|tháng 7|n|D
九月|くがつ|tháng 9|n|D
何月|なんがつ|tháng mấy|n|D
|そのなか|trong số đó|exp|D
`,
  gsec: "AAAAABBBBCCCDDD", qsec: "AABBACCBDDDCC",
  grammar: [
    ["(N は) Aい です","N (có tính chất, đặc điểm) Aい","Tiếng Nhật có 2 loại tính từ: tính từ đuôi い (Aい) và tính từ đuôi な (Aな). ｜ Phó từ chỉ mức độ đặt trước Aい: ちょっと (một chút), すこし (hơi hơi), まあまあ (bình thường, tàm tạm), とても (rất), 本当に (thật sự).","今日は 暑いです。","ベトナム料理は とても おいしいです。","この 店は 本当に 安いですね。"],
    ["(N は) Aいくないです","N không có (tính chất, đặc điểm) Aい","Dạng phủ định của Aい: bỏ い + くない. ｜ Trường hợp đặc biệt: いい → よくない. ｜ Phó từ thường đi kèm: あまり (không ～ lắm), 全然 (hoàn toàn không), そんなに (không ～ đến mức đó).","今日は 暑くないです。","この 学校は あまり 新しくないです。"],
    ["(N は) Aな です","N (có tính chất, đặc điểm) Aな","Một số tính từ kết thúc bằng い nhưng thuộc nhóm Aな: きれい、ていねい、ゆうめい、きらい.","あの 人、すごく ハンサムですね。","この レストランは とても 有名です。"],
    ["(N は) Aな じゃないです / じゃありません","N không có (tính chất, đặc điểm) Aな","Dạng phủ định giống với danh từ.","この 駅は あまり 便利じゃないです。","私の会社は ぜんぜん ゆうめいじゃないです。"],
    ["(N は) Aい / Aな ですか","Câu hỏi có vị ngữ là tính từ","","A：ベトナムは 今、暑いですか。\nB：ええ、とても 暑いですよ。","A：ハノイは 賑やかですか。\nB：はい、賑やかですよ。"],
    ["(N は) Aいくて + Aい / Aな です","Nối Aい với một tính từ khác","Aい đứng trước đổi sang dạng 「Aい + くて」 (いい → よくて). ｜ Hai tính từ phải cùng chiều đánh giá: cùng tích cực hoặc cùng tiêu cực.","安くて おいしいです。","新しくて 広いです。","この 店は、新しくて きれいですね。"],
    ["(N は) Aなで + Aい / Aな です","Nối Aな với một tính từ khác","Aな đứng trước đổi sang dạng 「Aな + で」.","静かで きれいです。","この 町は、便利で にぎやかです。"],
    ["(N は) どうですか","N thì thế nào?","","A：学校は どうですか。\nB：楽しいです。","A：その 料理、どうですか。\nB：ちょっと 辛いです。"],
    ["(N は) ～が ～","N thì ～ nhưng ～","Nối 2 mệnh đề đánh giá trái ngược, tương phản nhau: A です が B です.","この 店は 美味しいですが、安くないです。","仕事は 忙しいですが、面白いです。"],
    ["(N は) Aいかったです / Aいくなかったです","N đã / đã không (có tính chất, đặc điểm) Aい","Aい → Aいかった; Aくない → Aくなかった. ｜ いい → よかった (+), よくなかった (－).","バーベキューは 楽しかったです。","昨日は 忙しくなかったです。"],
    ["(N は) Aなでした / Aなじゃなかったです","N đã / đã không (có tính chất, đặc điểm) Aな","Aなです → Aなでした; Aなじゃないです → Aなじゃなかったです.","昨日の パーティーは にぎやかでした。","この 町は 昔 便利じゃなかったです。"],
    ["どんな N ですか → Aい N / Aな N です","Tính từ bổ nghĩa cho danh từ","Aい + N; Aな + な + N. ｜ Khi bổ nghĩa cho danh từ không chia tính từ về quá khứ mà đưa danh từ về quá khứ: 「Aい/Aな + N でした」. ｜ 「どう」 có thể đi trực tiếp với 「ですか」, còn 「どんな」 luôn phải đi cùng một danh từ.","A：山田さんは、どんな 人ですか。\nB：とても 親切な 人ですよ。","A：Bさんの 部屋は どんな 部屋ですか。\nB：広くて 明るい 部屋です。","この 町は 昔、小さくて 不便な町でした。"],
    ["(N1 で) N2 が 一番 A です","Trong phạm vi N1 thì N2 A nhất","「～で」 đứng sau phạm vi hoặc địa điểm so sánh. ｜ 「～が」 đứng sau đối tượng được đánh giá có mức độ cao nhất. ｜ Từ để hỏi theo nhóm đối tượng: Người (だれ), Vật (なに/どれ), Địa điểm (どこ), Thời gian (いつ、なんがつ…).","A：クラスで、誰が 一番 ハンサムですか。\nB：ズン先生が 一番 ハンサムです。","A：日本で、どこが 一番 寒いですか。\nB：北海道が 一番 寒いです。"],
    ["N1 と N2 (と)、どっち/どちらが A ですか → N1 (N2) の ほうが A です","N1 và N2 thì cái nào hơn? → N1/ N2 hơn","Luôn dùng từ để hỏi 「どちら」 hoặc 「どっち」 dù N1, N2 là người, vật hay địa điểm. ｜ Muốn nói cả hai đều như nhau thì dùng 「どちらも/ どっちも」.","A：この 店と あの 店と どちらが おいしいですか。\nB：あの 店の ほうが おいしいですよ。","A：フォーと バインミー、どちらが 有名ですか。\nB：どちらも 有名です。"],
    ["N1 (は) N2 より A です","N1 A hơn N2","Câu so sánh hơn: N1 được đưa ra so sánh với N2.","フォーは バインミーより 有名です。","ベトナムは 日本より 暑いです。"]
  ],
  quiz: [
    ["今日は 暑(  )。(Hôm nay không nóng)","くないです","じゃないです","いくないです","ではありません","Phủ định của Aい: bỏ い + くないです."],
    ["この 学校は (  ) 新しくないです。(không ～ lắm)","あまり","とても","ちょっと","まあまあ","あまり + phủ định = không ～ lắm."],
    ["この 町は 便利(  ) にぎやかです。(tiện lợi và náo nhiệt)","で","くて","な","と","Nối Aな: Aな + で."],
    ["この 店は 安(  ) おいしいです。(rẻ và ngon)","くて","で","いくて","な","Nối Aい: bỏ い + くて."],
    ["この 店は (  )。(Cửa hàng này không tốt)","よくないです","いくないです","いいくないです","よいじゃないです","いい → よくない (trường hợp đặc biệt)."],
    ["あの 人は (  ) 人ですか。…とても 親切な 人です。","どんな","どう","だれ","どこ","どんな + danh từ; どう đi trực tiếp với ですか."],
    ["山田さんは 親切(  ) 人です。","な","で","の","い","Aな + な + N."],
    ["この 店は 美味しいです(  )、安くないです。(ngon nhưng không rẻ)","が","と","を","も","「が」 nối 2 mệnh đề trái ngược nhau: nhưng."],
    ["クラスで、誰(  ) 一番 ハンサムですか。","が","は","を","と","N1 で N2 が 一番 A: 「が」 đứng sau đối tượng được đánh giá cao nhất."],
    ["この 店と あの 店と (  ) おいしいですか。(Cửa hàng nào ngon hơn?)","どちらが","どれが","だれが","なにが","So sánh hai đối tượng: どちら / どっち."],
    ["フォーは バインミー(  ) 有名です。(Phở nổi tiếng hơn bánh mì)","より","から","まで","だけ","N1 は N2 より A: N1 A hơn N2."],
    ["昨日は 忙し(  )。(Hôm qua không bận)","くなかったです","くないでした","じゃなかったです","くないです","Aい quá khứ phủ định: bỏ い + くなかったです."],
    ["昨日の パーティーは にぎやか(  )。(đã náo nhiệt)","でした","かったです","でしたか","じゃなかったです","Aな quá khứ: Aな + でした."]
  ]
},
{
  id: 4, title: "Chương 4",
  vocab: `
女の人|おんなのひと|phụ nữ, con gái|n|A
男の人|おとこのひと|đàn ông, con trai|n|A
女優|じょゆう|nữ diễn viên|n|A
子ども|こども|con, trẻ con|n|A
恋人|こいびと|người yêu|n|A
妹|いもうと|em gái của mình|n|A
妹さん|いもうとさん|em gái của người khác|n|A
試験|しけん|kỳ thi, bài thi|n|A
お祭り|おまつり|lễ hội|n|A
本当|ほんとう|thật, sự thật|n|A
今晩|こんばん|tối nay|n+adv|A
|スマホケース|ốp điện thoại|n|A
|デザイン|thiết kế|n|A
|おとなしい|điềm tĩnh, ít nói|i|A
|おしゃべり|hay chuyện, nói nhiều|na|A
|あんまり|không ～lắm|adv|A
|うん|ừ, ừm (cách nói suồng sã của 「はい」. Có nhiều trường hợp phát âm bằng âm mũi 「んん」)|exp|A
|ううん|không (cách nói thân mật, suồng sã của 「いいえ」. Có nhiều trường hợp phát âm bằng âm mũi 「んんん」và lên giọng ở chữ「ん」cuối cùng.)|exp|A
よく見て|よくみて|hãy nhìn kĩ|exp|A
違う（よ）|ちがうよ|khác, không phải|exp|A
|～かな（あ）|có phải ～ không nhỉ? (được dùng trong hội thoại thân mật)|exp|A
恋人かな|こいびとかな|có phải người yêu không nhỉ?|exp|A
本当かな|ほんとうかな|có thật không nhỉ?|exp|A
|うーん|Hmmm (lời ậm ừ khi phân vân, suy nghĩ)|exp|A
外国|がいこく|nước ngoài|n|B
外国人|がいこくじん|người nước ngoài|n|B
外国語|がいこくご|ngoại ngữ|n|B
外国語大学|がいこくごだいがく|đại học Ngoại ngữ|n|B
髪型|かみがた|kiểu tóc|n|B
美容院|びよういん|tiệm làm tóc, salon|n|B
飲み会|のみかい|buổi nhậu, buổi liên hoan|n|B
駅前|えきまえ|trước nhà ga|n|B
勉強|べんきょう|việc học|n|B
全部|ぜんぶ|toàn bộ, tất cả|n+adv|B
全部で|ぜんぶで|tổng cộng là|n+adv|B
|サークル|câu lạc bộ|n|B
|よかったね|hay nhỉ, tốt rồi nhỉ!|exp|B
|～けど|nhưng mà (cách nói suồng sã, thân mật của 「～が」)|exp|B
`,
  gsec: "AAAAABB", qsec: "AAAABABBB",
  grammar: [
    ["Thể thường (suồng sã) của câu danh từ / Aな","Dùng với người thân, bạn bè","Thể lịch sự → thể thường: ですか → bỏ か, lên giọng; はい → うん; いいえ → ううん. ｜ N2/Aな です → N2/Aな だ; じゃないです/じゃありません → じゃない; でした → だった; じゃなかったです → じゃなかった.","これは 何ですか。→ これ（は）何？","A：明日は 仕事ですか。→ 明日（は）仕事？"],
    ["(N1 は) N2/Aな です(よ/ね/よね) → (N1 は) N2/Aな (だよ/だね/だよね)","Thể thường của です + よ/ね/よね","「です」 → 「だ」 (thường được lược bỏ). ｜ 「だ」 giữ nguyên trong 2 trường hợp: khi sau 「だ」 có 「よ、ね、よね」; khi nói về điều mình mới biết hay mới phát hiện ra.","ベトナム人です。→ ベトナム人。","ベトナム人ですよ。→ ベトナム人だよ。","田中さんは とても 親切ですよ。→ 田中さんは とても 親切だよ。"],
    ["(N1 は) N2/Aな じゃないですか → じゃない？","Chẳng phải ～ hay sao?","Dùng để xác nhận ý kiến đối phương, lên giọng ở cuối câu. ｜ 「じゃないですか/じゃありませんか」 → 「じゃない」; 「ではないですか/ではありませんか」 → 「ではない」. ｜ Còn câu phủ định bình thường 「じゃない」 thì xuống giọng.","ベトナム料理じゃないですか？→ ベトナム料理じゃない？","ベトナム料理じゃないです。→ ベトナム料理じゃない。"],
    ["(N1 は) N2/Aな でしたか → N2/Aな だった？","Thể thường quá khứ của N / Aな","「でしたか」 → 「だった?」; 「でした」 → 「だった」.","昨日は 雨でした。→ 昨日は 雨だった。","A：テスト、どうでしたか。→ テスト、どうだった？\nB：簡単でした。→ 簡単だった。"],
    ["(N1 は) N2/Aな じゃなかったです → じゃなかった","Phủ định quá khứ thể thường","「じゃなかったです/じゃありませんでした」 → 「じゃなかった」.","あの人、マイさんじゃなかった。","昨日、暇じゃなかった。"],
    ["Thể thường của tính từ đuôi い","Aい です → Aい; Aいくないです → Aいくない; Aいですか → Aい？","Phi quá khứ: Aいです → Aい; Aいくないです → Aいくない; Aいですか → Aい？ (bỏ ですか, lên giọng). ｜ Quá khứ: Aいかったです → Aいかった; Aいくなかったです → Aいくなかった; Aいかったですか → Aいかった？ ｜ Không dùng だ sau Aい: ×おいしいだね → ○おいしいね; ×おいしいだよ → ○おいしいよ.","これは おいしいですか。→ これ、おいしい？","ベトナム料理は おいしいです。→ ベトナム料理は おいしい。","日本語は 難しくないですね。→ 日本語は 難しくないね。","高かったです。→ 高かった。"],
    ["～が ～ → ～けど ～","nhưng ～","「けど」 là thể thường của 「が」. ｜ Từ đứng trước 「けど」 cũng đưa về thể thường: Aい → Aい けど; Aな/N → Aな/N だけど.","この 店は おいしいですが、高いですね。→ この 店、おいしいけど、高いね。","この 町は 便利ですが、きれいじゃないですね。→ この 町は 便利だけど、きれいじゃないね。"]
  ],
  quiz: [
    ["「学生ですか」の thể thường (hỏi, lên giọng) là?","学生？","学生だ？","学生です？","学生か？","Thể thường: bỏ 「ですか」 và lên giọng ở cuối câu."],
    ["A：明日、勉強する？ B：(  )、勉強する。","うん","ううん","はい","いいえ","Thể thường: はい → うん, いいえ → ううん."],
    ["A：明日も 仕事？ B：(  )、休みだよ。","ううん","うん","はい","ええ","Phủ định ở thể thường: ううん."],
    ["ベトナム人です。→ ベトナム人(  )。(thể thường, có よ ở cuối)","だよ","ですよ","よだ","だです","Giữ 「だ」 khi sau nó có よ / ね / よね."],
    ["「おいしいですね」 → thể thường đúng là?","おいしいね","おいしいだね","おいしいですね","おいしいなね","Sau Aい không dùng だ: ×おいしいだね → ○おいしいね."],
    ["昨日は 雨でした。→ 昨日は 雨(  )。","だった","でした","だ","かった","「でした」 → 「だった」."],
    ["この 店は おいしいですが、高いです。→ この 店は おいしい(  )、高い。","けど","が","だけど","ですけど","「けど」 là thể thường của 「が」; sau Aい đặt trực tiếp けど."],
    ["この 町は 便利(  )、きれいじゃないね。","だけど","けど","ですけど","いけど","Aな/N + だけど."],
    ["「高かったです」 → thể thường là?","高かった","高いだった","高くなかった","高かっただ","Aいかったです → Aいかった (bỏ です)."]
  ]
},
{
  id: 5, title: "Chương 5",
  vocab: `
本屋|ほんや|hiệu sách|n|A
庭|にわ|sân vườn|n|A
公園|こうえん|công viên|n|A
売り場|うりば|quầy bán hàng|n|A
ワイン売り場|ワインうりば|quầy rượu vang|n|A
お菓子売り場|おかしうりば|quầy bánh kẹo|n|A
肉売り場|にくうりば|quầy bán thịt|n|A
|はさみ|cái kéo|n|A
引き出し|ひきだし|ngăn kéo|n|A
机|つくえ|cái bàn|n|A
椅子|いす|ghế|n|A
本棚|ほんだな|giá sách|n|A
冷蔵庫|れいぞうこ|tủ lạnh|n|A
電子レンジ|でんしレンジ|lò vi sóng|n|A
台所|だいどころ|nhà bếp|n|A
財布|さいふ|ví tiền|n|A
自転車|じてんしゃ|xe đạp|n|A
箱|はこ|hộp|n|A
木|き|cây|n|A
前|まえ|trước đây, phía trước|n|A
後ろ|うしろ|phía sau|n|A
右|みぎ|bên phải|n|A
左|ひだり|bên trái|n|A
上|うえ|bên trên|n|A
下|した|bên dưới|n|A
中|なか|bên trong|n|A
外|そと|bên ngoài|n|A
間|あいだ|ở giữa|n|A
真ん中|まんなか|chính giữa|n|A
横|よこ|(ngang) bên cạnh, sát bên|n|A
隣|となり|gần bên, hàng xóm|n|A
近く|ちかく|gần, nơi lân cận|n|A
|ここ、そこ、あそこ|chỗ này, chỗ đó, chỗ kia|n|A
消しゴム|けしゴム|cục tẩy|n|A
|ホッチキス|dập ghim|n|A
|ノート|vở|n|A
|ソファ|ghế sô-pha|n|A
|ベッド|giường|n|A
|あります|có, ở|v1|A
|ない|không có|i|A
|それから|ngoài ra, và còn, sau đó|oth|A
|あと|ngoài ra, và còn|oth|A
～階|～かい|tầng ～|suf|A
１階|いっかい|tầng 1|n|A
２階|にかい|tầng 2|n|A
３階|さんがい|tầng 3|n|A
何階|なんがい|tầng mấy?|n|A
申し訳ありません|もうしわけありません|Tôi xin lỗi ạ. (Cách nói xin lỗi một cách lịch sự khi người nói thừa nhận về hành động của mình; hoặc được dùng để bày tỏ sự tiếc nuối, đáng tiếc với người nghe)|exp|A
申し訳ございません|もうしわけございません|Tôi xin lỗi ạ. (Cách nói lịch sự hơn của 「申し訳ありません」)|exp|A
映画|えいが|phim ảnh|n|B
教室|きょうしつ|lớp học|n|B
食堂|しょくどう|nhà ăn|n|B
事務所|じむしょ|văn phòng|n|B
休憩|きゅうけい|nghỉ giải lao|n|B
電話|でんわ|cuộc điện thoại, điện thoại|n|B
窓|まど|cửa sổ|n|B
社長|しゃちょう|giám đốc|n|B
部長|ぶちょう|trưởng bộ phận, trưởng ban|n|B
課長|かちょう|trưởng phòng|n|B
誰か|だれか|ai đó|n|B
猫|ねこ|con mèo|n|B
犬|いぬ|con chó|n|B
鳥|とり|con chim|n|B
怖い|こわい|sợ hãi, đáng sợ|i|B
|いらっしゃいます|có, ở (kính ngữ của 「います」,được sử dụng khi nói về sự tồn tại của người bề trên)|v1|B
|います|có, ở|v2|B
|なんだ|tưởng gì! (Sử dụng khi điều mình lo lắng không có gì to tát, hoặc có việc gì đó xảy ra ngoài mong đợi)|exp|B
お願いします|おねがいします|nhờ anh/chị.|exp|B
温泉|おんせん|suối nước nóng|n|C
袋|ふくろ|túi|n|C
皿|さら|đĩa  ［cũng đọc: おさら］|n|C
|いちご|dâu tây|n|C
|あめ|kẹo|n|C
|たまご|quả trứng|n|C
大人|おとな|người lớn, người trưởng thành|n|C
兄|あに|anh trai của mình|n|C
女の子|おんなのこ|bé gái|n|C
男の子|おとこのこ|bé trai|n|C
友達|ともだち|bạn bè|n|C
何歳|なんさい|mấy tuổi|n|C
|おいくつ|mấy tuổi (おいくつ là cách nói lịch sự hơn 何歳)  ［cũng đọc: いくつ］|n|C
|テーブル|cái bàn|n|C
|コップ|cốc|n|C
|たくさん|nhiều|n+adv|C
大勢|おおぜい|nhiều (chỉ dùng cho người)|n+adv|C
～歳|～さい|～tuổi (tham khảo thêm trang bên 169)|suf|C
～人|～にん|～người (tham khảo thêm trang 173)|suf|C
～匹|～ひき|～con (đếm động vật nhỏ - tham khảo thêm trang 173)|suf|C
|～つ|～cái/ chiếc (dùng chung cho các đồ vật- tham khảo thêm trang 173)|suf|C
|ええ|Ôi! Ối (tiếng kêu ngạc nhiên)|exp|C
1歳|いっさい|1 tuổi|n|C
2歳|にさい|2 tuổi|n|C
3歳|さんさい|3 tuổi|n|C
4歳|よんさい|4 tuổi|n|C
5歳|ごさい|5 tuổi|n|C
6歳|ろくさい|6 tuổi|n|C
7歳|ななさい|7 tuổi|n|C
8歳|はっさい|8 tuổi|n|C
9歳|きゅうさい|9 tuổi|n|C
10歳|じゅっさい|10 tuổi|n|C
11歳|じゅういっさい|11 tuổi|n|C
18歳|じゅうはっさい|18 tuổi|n|C
20歳|はたち|20 tuổi|n|C
30歳|さんじゅっさい|30 tuổi|n|C
`,
  gsec: "AAABBBCCCC", qsec: "ABAABBCCCCC",
  grammar: [
    ["N (đồ vật) (は) ありますか","Có N không?","Trả lời: はい、あります／いいえ、ないです・ありません. ｜ 「あります」 thể hiện sự tồn tại của đồ vật. ｜ Phủ định của 「あります」: 「ありません」 và 「ないです」. ｜ 「は」 có thể được lược đi. ｜ Thêm 「ね」 cuối câu để câu nói mềm mại hoặc khi bày tỏ cảm xúc đáng tiếc, áy náy.","A：あのー、MoriPhoneの スマホケース、ありますか。\nB：はい、あります。こちらです。","A：あのー、この ワインは ありますか。\nB：すみません、こちらの ワインは ありません（ね）。"],
    ["N1 は N2 (địa điểm) です / N2 (địa điểm) に あります","N1 có ở N2","「に」 đứng sau danh từ chỉ vị trí, địa điểm. ｜ Hỏi vị trí: ❶ N は どこですか ❷ N は どこに ありますか. ｜ Từ chỉ vị trí đứng sau 「の」: となり、横、上、下、中、近く. ｜ Giữa A và B: A と B の 間.","公園は 銀行の 隣です。","ノートは 机の 上に あります。","スマホは かばんの 中に あります。","銀行と 学校の 間"],
    ["N1 (địa điểm) に N2 (vật, địa điểm) が あります","Ở N1 có N2","Mẫu câu miêu tả vị trí tồn tại của đồ vật, tòa nhà, cây cối…","庭に オートバイが あります。","ベッドの 上に かばんが あります。","ここに 辞書が あります。"],
    ["N (người, động vật) (は) いますか","Có N (người, động vật) không?","Trả lời: はい、います／いいえ、いないです・いません. ｜ 「います」 thể hiện sự tồn tại của người và động vật.","A：すみません、山田さん（は）いますか。\nB：はい、いますよ。","A：あのー、田中さん（は）、いますか。\nB：あー、田中さんは、今 いないですよ。"],
    ["N1 (người, động vật) は N2 (địa điểm) です / N2 (địa điểm) に います","N1 có ở N2","Hỏi vị trí: ❶ N は どこですか ❷ N は どこに いますか. ｜ Khi nói về sự tồn tại của người bề trên (khách hàng, cấp trên…) người Nhật thường dùng 「いらっしゃいます」 thay cho 「います」.","鈴木さんは 部屋に います。","ミンさんは 教室に います。","ナム社長は 今、事務所に いらっしゃいます。"],
    ["N1 (địa điểm) に N2 (người, động vật) が います","Ở N1 (địa điểm) có N2 (người, động vật)","Hỏi sự tồn tại của ai đó dùng 誰; hỏi sự tồn tại của động vật dùng 何.","窓の 外に 誰が いますか。","公園に 犬が います。","A：誰が いますか。\nB：田中さんが います。"],
    ["N には / にも ～","Ở N có / cũng có","「に」: trợ từ biểu thị địa điểm tồn tại. ｜ 「は」 đứng sau 「に」, nhấn mạnh chủ đề của câu. ｜ 「も」 đứng sau 「に」 để thể hiện một chủ thể có ở địa điểm A và cũng có ở địa điểm B.","会社には 食堂が あります。学校にも 食堂が ありますか。","ミンさんの うちには 猫が います。ゆいさんの うちにも 猫が いますか。"],
    ["N1 と N2","N1 và N2","「と」: trợ từ nối hai danh từ cùng chủng loại. ｜ Không dùng 「と」 khi: ❶ nói về một người/vật vừa là N1 vừa là N2 (dùng 「で」); ❷ nối những từ không phải danh từ (dùng 「くて/で」).","部屋に 田中さんと ナムさんが います。","休みは 土曜日と 日曜日です。","×田中さんは ABCカンパニーの 社員と エンジニアです。→ ○社員で エンジニアです。"],
    ["Cách đếm người, động vật nhỏ, đồ vật","1人, 1匹, 1つ","Người: 1人 ひとり, 2人 ふたり, 3人 さんにん, 4人 よにん, 5人 ごにん, 6人 ろくにん, 7人 ななにん/しちにん, 8人 はちにん, 9人 きゅうにん/くにん, 10人 じゅうにん (何人 = mấy người). ｜ Động vật nhỏ: 1匹 いっぴき, 2匹 にひき, 3匹 さんびき, 4匹 よんひき, 5匹 ごひき, 6匹 ろっぴき, 7匹 ななひき, 8匹 はっぴき, 9匹 きゅうひき, 10匹 じゅっぴき (何匹 = mấy con). ｜ Đồ vật chung: ひとつ, ふたつ, みっつ, よっつ, いつつ, むっつ, ななつ, やっつ, ここのつ, とお (いくつ = mấy cái)."],
    ["Số đếm + います / あります","Có (số lượng) người / động vật / đồ vật","Không thêm 「が」 sau số lượng từ. ｜ 「います」 và 「あります」 còn dùng để diễn tả sự sở hữu, được biểu thị bởi 「に（は）」.","田中さんには 車が ありません。","私には 子供が 2人 います。","テーブルの 上に コップが 2つ あります。"]
  ],
  quiz: [
    ["机の 上に ノートが (  )。(Trên bàn có quyển vở)","あります","います","ありません","いません","Đồ vật tồn tại: あります."],
    ["公園に 犬が (  )。(Trong công viên có con chó)","います","あります","いません","ありません","Người và động vật tồn tại: います."],
    ["ノートは 机の 上(  ) あります。","に","で","を","と","Địa điểm tồn tại: に."],
    ["銀行(  ) 学校の 間に 公園が あります。(Giữa ngân hàng và trường học)","と","の","に","も","Giữa A và B: A と B の 間."],
    ["ミンさんは 病院(  ) います。","に","で","を","が","Địa điểm tồn tại của người: に います."],
    ["A：誰(  ) いますか。 B：田中さんが います。","が","を","に","の","Hỏi sự tồn tại của người: 誰が いますか."],
    ["会社(  ) 食堂が あります。学校にも 食堂が あります。","には","では","とは","へは","「に」 + 「は」 nhấn mạnh chủ đề; 「にも」 = cũng có ở."],
    ["「4人」đọc là gì?","よにん","よんにん","しにん","よっにん","4人 = よにん."],
    ["「3匹」đọc là gì?","さんびき","さんひき","さんぴき","みっぴき","3匹 = さんびき."],
    ["「8つ」đọc là gì?","やっつ","はちつ","ようつ","やつつ","8つ = やっつ."],
    ["田中さんは ABCカンパニーの 社員(  ) エンジニアです。","で","と","の","も","Một người vừa là N1 vừa là N2 thì dùng 「で」, không dùng 「と」."]
  ]
},
{
  id: 6, title: "Chương 6",
  vocab: `
天気|てんき|thời tiết|n|A
体調|たいちょう|tình trạng cơ thể|n|A
ご飯|ごはん|cơm, bữa cơm|n|A
毎朝|まいあさ|hàng sáng, sáng nào cũng|n+adv|A
毎晩|まいばん|hàng tối, tối nào cũng|n+adv|A
|スケジュール|lịch trình|n|A
|すごい|tuyệt vời, siêu, giỏi|i|A
働きます|はたらきます|làm việc|v1|A
歩きます|あるきます|đi bộ|v1|A
休みます|やすみます|nghỉ ngơi|v1|A
遊びます|あそびます|chơi|v1|A
寝ます|ねます|ngủ|v2|A
起きます|おきます|thức dậy|v2|A
疲れます|つかれます|mệt mỏi|v2|A
出かけます|でかけます|ra ngoài|v2|A
勉強|べんきょう|học|n+v3|A
|これから|từ giờ (trở đi)|n+adv|A
|いつも|lúc nào cũng|n+adv|A
|ときどき|thỉnh thoảng|adv|A
|ゆっくり|từ từ, thong thả|adv|A
～時間|～じかん|～ tiếng|suf|A
１時間|いちじかん|1 tiếng|n|A
２時間|にじかん|2 tiếng|n|A
３時間|さんじかん|3 tiếng|n|A
|～くらい|khoảng ～ (cũng nói ～ぐらい)  ［cũng đọc: ～ぐらい］|suf|A
１時くらい|いちじくらい|khoảng 1 giờ|n|A
２時くらい|にじくらい|khoảng 2 giờ|n|A
４時くらい|よじくらい|khoảng 4 giờ|n|A
気持ちがいい|きもちがいい|cảm thấy thoải mái, dễ chịu|exp|A
|さあ|nào (hô hào, thúc giục trước khi làm việc gì đó)|exp|A
問題ない|もんだいない|không vấn đề gì|exp|A
実家|じっか|nhà (bố mẹ đẻ)|n|B
寮|りょう|kí túc xá|n|B
写真|しゃしん|ảnh|n|B
お正月|おしょうがつ|Tết Dương lịch  ［cũng đọc: しょうがつ］|n|B
～年|～ねん|năm ～|n+adv|B
2020年|にせんにじゅうねん|năm 2020|n+adv|B
2021年|にせんにじゅういちねん|năm 2021|n+adv|B
毎年|まいとし|hằng năm|n+adv|B
毎月|まいつき|hàng tháng|n+adv|B
毎週|まいしゅう|hàng tuần|n+adv|B
今年|ことし|năm nay|n+adv|B
去年|きょねん|năm ngoái|n+adv|B
一昨年|おととし|năm kia|n+adv|B
来年|らいねん|năm sau|n+adv|B
再来年|さらいねん|năm sau nữa|n+adv|B
今月|こんげつ|tháng này|n+adv|B
先月|せんげつ|tháng trước|n+adv|B
来月|らいげつ|tháng sau|n+adv|B
楽しみ|たのしみ|mong đợi, mong chờ|n+na|B
|わかります|hiểu, biết|v1|B
行きます|いきます|đi  ［へ/ に］|v1|B
帰ります|かえります|về, trở về  ［へ/ に］|v1|B
来ます|きます|đến  ［へ/ に］|v3|B
買い物|かいもの|mua sắm|n+v3|B
|もうすぐ|sắp|adv|B
試合|しあい|trận đấu|n|C
|もの|đồ vật|n|C
水|みず|nước|n|C
魚|さかな|cá|n|C
紅茶|こうちゃ|hồng trà|n|C
|おにぎり|cơm nắm|n|C
寿司|すし|sushi  ［cũng đọc: おすし］|n|C
朝ご飯|あさごはん|cơm sáng/ bữa sáng|n|C
昼ご飯|ひるごはん|cơm trưa/ bữa trưa|n|C
晩ご飯|ばんごはん|cơm tối/ bữa tối|n|C
夕飯|ゆうはん|cơm tối/ bữa tối|n|C
お土産|おみやげ|quà (lưu niệm)|n|C
家族|かぞく|gia đình|n|C
音楽|おんがく|âm nhạc|n|C
雑誌|ざっし|tạp chí|n|C
靴|くつ|giày|n|C
|～たち|nhóm, bọn, các... (đi với danh từ biểu thị số nhiều; 「N + たち」 được sử dụng như một cụm danh từ)|suf|C
会社の人たち|かいしゃのひとたち|nhóm người trong công ty/ mọi người ở công ty|n|C
|ナムさんたち|nhóm Nam/ Nam với mấy bạn|n|C
田中さんたち|たなかさんたち|nhóm Tanaka/ Tanaka với mọi người|n|C
|デパート|trung tâm mua sắm|n|C
|サッカー|bóng đá|n|C
眠い|ねむい|buồn ngủ|i|C
一人で|ひとりで|một mình (được dùng như một phó từ)|adv|C
買います|かいます|mua  ［～を］|v1|C
読みます|よみます|đọc  ［～を］|v1|C
聞きます|ききます|①nghe ②hỏi  ［～を］|v1|C
飲みます|のみます|uống  ［～を］|v1|C
食べます|たべます|ăn  ［～を］|v2|C
見ます|みます|xem, nhìn  ［～を］|v2|C
旅行|りょこう|du lịch|v3|C
`,
  gsec: "AAAAABBBCCCC", qsec: "AAAABCCCCC",
  grammar: [
    ["V ます / V ました","Hiện tại - tương lai / quá khứ","「Vます」 dùng để nói về thói quen, hành động diễn ra ở hiện tại hoặc tương lai. ｜ 「Vました」 dùng để nói về hành động diễn ra trong quá khứ.","寝ます／寝ました","起きます／起きました","働きます／働きました"],
    ["～時に + V","V vào lúc ～ giờ","「に」: trợ từ đứng sau thời điểm xảy ra hành động. ｜ 「何時に Vか?」 = 「いつ Vか?」. ｜ Không dùng 「に」 với các trạng từ chỉ thời gian chung chung (昨日、今日、明日、先週…).","今朝 11時に 出かけました。","A：毎朝、何時に 起きますか。\nB：5時50分に 起きます。"],
    ["～時間 / 分 + V","V (trong) ～ tiếng / phút","Không thêm trợ từ vào sau lượng từ chỉ khoảng thời gian xảy ra hành động.","田中さんは 今朝 30分 歩きました。","私は 昨日 4時間くらい 勉強しました。","マイさんは 毎日 8時間 働きます。"],
    ["～から ～まで + V","V từ ～ đến ～","「から」 biểu thị thời điểm bắt đầu; 「まで」 biểu thị thời điểm kết thúc. ｜ Có thể dùng độc lập 「から」 hoặc 「まで」.","月曜日から、金曜日まで 働きます。","私は 毎日 9時から 6時まで 働きます。"],
    ["V ません / V ませんでした","Không V / Đã không V","「Vません」 là dạng phủ định của 「Vます」; 「Vませんでした」 là dạng phủ định của 「Vました」.","私は 土曜日と 日曜日 働きません。","A：（Bさんは）毎日、勉強しますか。\nB：いいえ、毎日、勉強しません。ときどき 勉強します。","田中さんは 昨日、働きませんでした。"],
    ["N (địa điểm) へ / に 帰ります","Về / trở về N","「へ」、「に」: trợ từ biểu thị phương hướng, địa điểm di chuyển.","今週の 金曜日（に）、実家へ 帰ります。","今日は 8時に うちに 帰ります。"],
    ["N (địa điểm) へ / に 行きます","Đi tới / đi đến N","Diễn tả việc di chuyển ra xa địa điểm của người nói, hoặc đối tượng di chuyển từ địa điểm này sang địa điểm khác.","A：日曜日は どこへ/に 行きますか。\nB：図書館へ/に 行きます。","田中さんは 昨日、郵便局へ/に 行きました。"],
    ["N (địa điểm) へ / に 来ます","Đến N","","私は いつも 8時50分に 会社に/へ 来ます。","私は 一昨年に 日本に 来ました。"],
    ["N を V","V tác động đến N","「を」: trợ từ đứng sau đối tượng chịu tác động, ảnh hưởng của hành động. ｜ Hỏi: 何を Vか.","昨日、本を 買いました。","A：今晩 何を 食べますか。\nB：すしと ラーメンを 食べます。"],
    ["N (địa điểm) で V","V ở / tại N","「へ」 biểu thị phương hướng và địa điểm di chuyển (có thể thay bằng 「に」). ｜ 「に」 biểu thị địa điểm tồn tại của người, vật. ｜ 「で」 biểu thị địa điểm xảy ra hành động. ｜ Hỏi: どこで Vか.","ベトナム料理の 店で フォーを 食べます。","A：いつも どこで 本を 読みますか。\nB：図書館で 読みます。"],
    ["N と V","V cùng với N","「と」 là trợ từ biểu thị đối tượng cùng thực hiện hành động. ｜ Hỏi: 誰と Vか. ｜ Làm gì một mình: 一人で + V.","友達と お酒を 飲みます。","妹と 日本に 来ました。","今朝 一人で 音楽を 聞きました。"],
    ["N1 とか N2 (とか) / N1 や N2 (など)","Nào là N1, nào là N2 / ví dụ như N1, N2…","「とか」 thường dùng trong văn nói, 「とか」 sau N2 có thể lược bỏ. ｜ 「や～など」 thường dùng trong văn viết, 「など」 có thể lược bỏ. ｜ Không tùy tiện kết hợp: ○ N1や N2など ○ N1とか N2とか ✕ N1や N2とか ✕ N1とか N2など.","東京で 本とか お菓子（とか）を 買いました。","家族と ハノイや ダナンに 行きます。"]
  ],
  quiz: [
    ["毎朝 5時50分(  ) 起きます。","に","を","で","と","Thời điểm cụ thể (giờ) + に."],
    ["Câu nào đúng: 「Sáng nay Tanaka đã đi bộ 30 phút」?","田中さんは 今朝 30分 歩きました。","田中さんは 今朝 30分に 歩きました。","田中さんは 今朝 30分を 歩きました。","田中さんは 今朝 30分が 歩きました。","Không thêm trợ từ sau lượng từ chỉ khoảng thời gian."],
    ["私は 毎日 9時(  ) 6時まで 働きます。","から","に","を","で","から = thời điểm bắt đầu, まで = thời điểm kết thúc."],
    ["昨日、働き(  )。(Hôm qua tôi đã không làm việc)","ませんでした","ません","ました","ないでした","Phủ định quá khứ: Vませんでした."],
    ["日曜日は どこ(  ) 行きますか。(trợ từ phương hướng, đọc là え)","へ","を","で","が","「へ」: trợ từ biểu thị phương hướng di chuyển."],
    ["昨日、本(  ) 買いました。","を","に","で","と","Đối tượng chịu tác động của hành động: を."],
    ["ベトナム料理の 店(  ) フォーを 食べます。","で","に","を","へ","Địa điểm xảy ra hành động: で."],
    ["友達(  ) お酒を 飲みます。(uống rượu cùng bạn)","と","に","を","で","Đối tượng cùng thực hiện hành động: と."],
    ["今朝 (  ) 音楽を 聞きました。(Sáng nay nghe nhạc một mình)","一人で","一人と","一人に","一人を","Làm gì một mình: 一人で + V."],
    ["Cách kết hợp nào đúng?","ハノイや ホーチミンなど","ハノイや ホーチミンとか","ハノイとか ホーチミンなど","ハノイと ホーチミンとか","Không kết hợp lẫn lộn: ○ N1や N2など, ○ N1とか N2とか; ✕ N1や N2とか, ✕ N1とか N2など."]
  ]
},
{
  id: 7, title: "Chương 7",
  vocab: `
夏休み|なつやすみ|kì nghỉ hè|n|A
お盆休み|おぼんやすみ|kỳ nghỉ lễ Obon|n|A
週末|しゅうまつ|cuối tuần|n|A
海|うみ|biển|n|A
喫茶店|きっさてん|quán nước, quán giải khát|n|A
|プール|bể bơi|n|A
|スキューバダイビング|lặn biển|n|A
|します|làm|v3|A
|とっても|rất (cách nói nhấn mạnh của とても, thường dùng trong văn nói suồng sã.)|adv|A
小説|しょうせつ|tiểu thuyết|n|B
服|ふく|quần áo|n|B
紙|かみ|giấy|n|B
|ワイシャツ|áo sơ mi dài tay|n|B
|プリン|bánh pudding|n|B
|スプーン|thìa|n|B
|ペン|bút|n|B
|バナナ|quả chuối|n|B
短い|みじかい|ngắn|i|B
|おすすめ|giới thiệu, đề xuất, gợi ý, khuyến nghị|n+v3|B
|どのくらい|bao lâu, bao nhiêu  ［cũng đọc: どのくらい］|adv|B
|どのぐらい|bao lâu, bao nhiêu  ［cũng đọc: どのぐらい］|adv|B
|よく|thường, hay|adv|B
|たまに|thi thoảng, đôi khi|adv|B
半年|はんとし|nửa năm|n|B
～年|～ねん|～năm|suf|B
～か月|～かげつ|～ tháng (tham khảo 補足, trang 234)|suf|B
～週間|～しゅうかん|～ tuần|suf|B
～冊|～さつ|～ quyển|suf|B
～枚|～まい|～ tờ, tấm, trang|suf|B
～杯|～はい|～ cốc  ［cũng đọc: ～ばい, ～ぱい］|suf|B
～個|～こ|～ cái|suf|B
|かしこまりました|tôi hiểu rồi ạ (dùng khi bề dưới nói với bề trên）|exp|B
お腹|おなか|bụng|n|C
昼|ひる|buổi trưa|n|C
今夜|こんや|tối nay, đêm nay|n|C
電動自転車|でんどうじてんしゃ|xe đạp điện|n|C
自動車|じどうしゃ|xe ô tô|n|C
電気自動車|でんきじどうしゃ|xe ô tô điện|n|C
時計|とけい|đồng hồ|n|C
ラーメン屋|ラーメンや|quán mì ramen|n|C
|シーエム|quảng cáo|n|C
|パソコン|máy tính, laptop|n|C
欲しい|ほしい|muốn|i|C
軽い|かるい|nhẹ|i|C
丈夫|じょうぶ|bền, chắc, khoẻ mạnh|na|C
一緒に|いっしょに|cùng nhau|adv|C
空きます|すきます|trống, trống rỗng|v1|C
お腹が空きます|おなかがすきます|đói bụng|exp|C
初めて|はじめて|lần đầu tiên|n+adv|D
映画館|えいがかん|rạp chiếu phim|n|D
冗談|じょうだん|nói đùa|n|D
野菜|やさい|rau|n|D
機械|きかい|máy móc|n|D
|ころ|hồi, lúc|n|D
小さいころ|ちいさいころ|lúc nhỏ|n|D
子供のころ|こどものころ|hồi bé|n|D
学生のころ|がくせいのころ|thời sinh viên|n|D
切符|きっぷ|vé (tàu, xe...)|n|D
|チケット|vé (xem phim, ca nhạc...)|n|D
アクション映画|アクションえいが|phim hành động|n|D
|トイレ|nhà vệ sinh|n|D
会います|あいます|gặp  ［人に］|v1|D
撮ります|とります|chụp (ảnh)|v1|D
説明|せつめい|giải thích|n+v3|D
散歩|さんぽ|đi dạo|n+v3|D
留学|りゅうがく|du học|n+v3|D
食事|しょくじ|dùng bữa|n+v3|D
|ぜひ|① nhất định ② rất muốn (khi đi với thể mong muốn V たい) (nhấn mạnh khi khuyến khích hay đưa ra nguyện vọng)|adv|D
`,
  gsec: "AABBBCDDDD", qsec: "AABBBBCDDDD",
  grammar: [
    ["どこ / だれ / 何 + か (trợ từ) + V か","Có V đâu đó / ai đó / cái gì đó không?","Thêm 「か」 vào sau từ để hỏi, để xác nhận phỏng đoán với người nghe. ｜ Khi thêm 「か」 sau từ nghi vấn thì 「へ」「を」「が」 có thể được lược bỏ, còn 「と」「で」 thì không. ｜ Trả lời: 「はい、～V ます/ V ました」 hoặc 「いいえ、từ để hỏi + も～V ません/ V ませんでした」.","何か（を）食べますか。","誰か（が）いますか。","A：昨日 どこかへ 行きましたか。\nB：はい、東京へ 行きました。"],
    ["どこ（へ）/ だれ（と）/ 何 + も + V ません","Không V đâu / với ai / cái gì cả","Từ để hỏi + も + động từ phủ định.","明日、どこ（へ）も 行きません。","誰とも 行きません。","今朝 何も 食べませんでした。","誰も いない。／何も ない。"],
    ["N を (số lượng từ) ください / お願いします","Hãy cho tôi (số lượng) N","Đơn vị đếm thường gặp: ～冊 (sách, vở, tạp chí), ～枚 (vật mỏng, dẹt: giấy, quần áo, CD), ～本 (vật thon dài: bút, ô, chai, lọ), ～杯 (vật đựng: cốc bia, bát cơm), ～個 / ～つ (vật nhỏ: quả trứng, cốc, bánh). ｜ Số từ thường đứng trước động từ. ｜ Khi liệt kê nhiều đồ vật, có thể thêm 「と」 ngay sau lượng từ của đồ vật trước đó.","ケーキを 1つ ください。(×1つ ケーキを)","すみません、ペンを 3本と 消しゴムを お願いします。","公園に 男の 子が 1人と 女の 子が 2人 います。"],
    ["(Khoảng thời gian + に) + tần suất / số lượng + V","V ～ lần (hoặc số lượng cụ thể khác)","Phó từ tần suất thường dùng: よく、ときどき、あまり… ｜ 「よく」 thường dùng trong câu nghi vấn để xác nhận đối phương có thường xuyên làm hành động nào đó không.","1か月に 1回、ラーメンを 食べます。","1週間に 4日、働きます。","A：田中さんは 本を よく 読みますか。\nB：よく 読みますよ。","映画を あまり 見ません。"],
    ["V ませんか / V ましょう / V ましょうか","Rủ rê, đề nghị","「Vませんか」: mời, rủ ai cùng làm. ｜ 「Vましょう」: đồng ý với lời mời hoặc cùng làm. ｜ 「Vましょうか」: đề nghị, hỏi ý kiến (dùng với 「～は どうですか」).","A：一緒に 行きませんか。\nB：いいですね。行きましょう。","A：どこで 見ましょうか。\nB：「サンライズシアター」は どうですか。"],
    ["N が 欲しいです","Muốn có N","「欲しい」 dùng khi nói về mong muốn của bản thân, hoặc dùng để hỏi về mong muốn của ai đó. ｜ Không dùng 「欲しい」 để nói về mong muốn của người khác.","時計が 欲しいです。","A：今、何が 一番 欲しいですか。\nB：スマホが 一番 欲しいです。"],
    ["(N1 へ/に) + N2 に 行きます / 来ます / 帰ります","Đi / đến / về địa điểm N1 để N2","「に」: trợ từ đứng sau N2, chỉ mục đích di chuyển. ｜ N2 là danh từ: 買い物、留学、食事、散歩、旅行… hoặc danh từ chỉ sự kiện như （パーティー）、（お祭り）、（コンサート）.","スーパーへ／に 買い物に 来ました。","東京へ／に コンサートに 行きました。"],
    ["(N へ/に) + V ますに 行きます / 来ます / 帰ります","Đi / đến / về địa điểm N để V","Bỏ ます của động từ rồi thêm 「に」.","ベトナム料理の 店へ／に フォーを 食べに 行きます。","国へ／に ベトナム料理を 食べに 帰ります。"],
    ["N が V ますたいです","Muốn V","Dùng 「が」 thay cho 「を」. ｜ Dạng phủ định: Vたい + くない. ｜ Giống 欲しい, không dùng khi chủ ngữ là người khác (nhưng dùng khi hỏi hay xác nhận lại mong muốn của người khác).","フォーが／を 食べたいです。","会社へ 行きたくないです。","A：日本で 何が 買いたいですか。\nB：CDが 買いたいです。"],
    ["V ます + 方","Cách V","Bỏ ます rồi thêm 「方」.","行き方、読み方、食べ方","電子辞書の 使い方","これは 漢字の 書き方の 説明です。"]
  ],
  quiz: [
    ["何(  ) 食べますか。(Bạn có ăn gì đó không?)","か","も","は","が","Từ để hỏi + か = “đó” (có ～ nào đó không?)."],
    ["今朝 何(  ) 食べませんでした。(Sáng nay tôi không ăn gì cả)","も","か","を","が","Từ để hỏi + も + phủ định = không ～ gì cả."],
    ["Câu nào đúng?","ケーキを 1つ ください。","1つ ケーキを ください。","ケーキを 1つで ください。","ケーキを 1つが ください。","Số lượng từ thường đứng trước động từ: ケーキを 1つ ください."],
    ["1か月(  ) 1回、ラーメンを 食べます。","に","を","で","が","Khoảng thời gian + に + tần suất."],
    ["A：一緒に 行き(  )。 B：いいですね。行きましょう。","ませんか","ましょう","ますか","ません","Rủ rê: Vませんか."],
    ["どこで 見(  )。(Xem ở đâu nhỉ? — đề nghị, hỏi ý kiến)","ましょうか","ませんか","ましたか","ませんでした","Vましょうか: đề nghị, hỏi ý kiến."],
    ["時計(  ) 欲しいです。","が","を","に","で","N が 欲しいです."],
    ["スーパーへ 買い物(  ) 来ました。","に","を","で","と","N2 に 行きます/来ます: đến để N2."],
    ["フォー(  ) 食べたいです。","が","に","で","と","Vたい: dùng 「が」 (hoặc を) thay cho 「を」."],
    ["会社へ 行き(  )。(Tôi không muốn đến công ty)","たくないです","たいくないです","たくないでした","たいないです","Phủ định: Vたい + くない → Vたくないです."],
    ["「行きます」+ 方 = (  ) (cách đi)","行き方","行く方","行って方","行きます方","V ます + 方: bỏ ます rồi thêm 方."]
  ]
},
{
  id: 8, title: "Chương 8",
  vocab: `
箸|はし|đũa|n|A
故郷|ふるさと|quê, quê hương  ［cũng đọc: こきょう］|n|A
電車|でんしゃ|tàu điện|n|A
銭湯|せんとう|nhà tắm công cộng|n|A
|こと|việc|n|A
楽器|がっき|nhạc cụ|n|A
新幹線|しんかんせん|tàu shinkansen (một loại tàu siêu tốc của Nhật Bản)|n|A
飛行機|ひこうき|máy bay|n|A
|バス|xe buýt|n|A
|タクシー|xe taxi|n|A
|ショッピングモール|trung tâm thương mại|n|A
|スポーツ|thể thao|n|A
|スポーツジム|phòng tập gym|n|A
|ピアノ|piano|n|A
|ギター|đàn ghi-ta|n|A
|パクチー|rau mùi|n|A
|カレー|cà ri|n|A
重い|おもい|nặng|i|A
色々|いろいろ|nhiều, đa dạng (về chủng loại)|na|A
泳ぎます|およぎます|bơi|v1|A
使います|つかいます|sử dụng  ［～を］|v1|A
運びます|はこびます|vận chuyển, bê, vác  ［～を］|v1|A
持ちます|もちます|có, cầm  ［～を］|v1|A
弾きます|ひきます|đánh, chơi (nhạc cụ)  ［～を］|v1|A
送ります|おくります|gửi  ［～を］|v1|A
話します|はなします|nói chuyện  ［～を］|v1|A
|かかります|mất, tốn (thời gian, tiền bạc)|v1|A
|やっぱり|quả nhiên|adv|A
|いっぱい|đầy|adv|A
色んな|いろんな|nhiều (về chủng loại, đứng trước danh từ)|oth|A
|～か～|～ hoặc ～ (ví dụ: 2 hoặc 3 cái)|oth|A
|そうなんですか|Vậy à?/ Vậy sao? (Sử dụng khi biết được điều gì đó mà từ trước đến nay mình chưa biết)|exp|A
|これくらい|Mức này, cỡ này. (Sử dụng khi nói về việc gì đó có mức độ thấp)|exp|A
|これぐらい|cỡ này, mức này (ví dụ: これぐらい大丈夫だ。 = Cỡ này thì không sao cả.)|exp|A
|みんな|mọi người|n+adv|B
絵|え|bức tranh|n|B
歌|うた|bài hát|n|B
数学|すうがく|môn toán|n|B
人気|にんき|sự yêu thích (được yêu thích)|n|B
人気があります|にんきがあります|được yêu thích|exp|B
卓球|たっきゅう|bóng bàn|n|B
水泳|すいえい|bơi lội|n|B
|バドミントン|cầu lông|n|B
|バスケットボール|bóng rổ|n|B
|バレーボール|bóng chuyền|n|B
|ライブ|buổi biểu diễn trực tiếp, live show|n|B
|カラオケ|karaoke|n|B
|ダンス|nhảy, nhảy múa|n|B
|ディーブイディー|DVD|n|B
色|いろ|màu, màu sắc|n|B
何色|なにいろ|màu gì|n|B
赤|あか|màu đỏ|n|B
白|しろ|màu trắng|n|B
青|あお|màu xanh|n|B
黒|くろ|màu đen|n|B
黄色|きいろ|màu vàng|n|B
緑（色）|みどり|màu xanh lá cây  ［cũng đọc: みどりいろ］|n|B
ピンク（色）|ピンク|màu hồng  ［cũng đọc: ピンクいろ］|n|B
オレンジ（色）|オレンジ|màu cam  ［cũng đọc: オレンジいろ］|n|B
甘い|あまい|ngọt|i|B
|かっこいい|ngầu|i|B
近い|ちかい|gần|i|B
好き|すき|thích|na|B
大好き|だいすき|rất thích|na|B
嫌い|きらい|ghét|na|B
大嫌い|だいきらい|rất ghét|na|B
上手|じょうず|giỏi|na|B
下手|へた|kém|na|B
得意|とくい|giỏi, mạnh (sở trường)|na|B
苦手|にがて|không giỏi, yếu, dở, (không thích, sợ)|na|B
計算|けいさん|tính toán|n+v3|B
特に|とくに|đặc biệt|adv|B
|そうそう|đúng vậy, đúng thế. (Được dùng để thể hiện sự đồng ý, tán thành với lời nói, hành động của đối phương)|exp|B
父|ちち|bố của mình|n|C
お父さん|おとうさん|bố (khi nói về bố của người khác hoặc gọi bố mình một cách thân thiết)|n|C
母|はは|mẹ của mình|n|C
お母さん|おかあさん|mẹ (khi nói về mẹ của người khác hoặc gọi mẹ mình một cách thân thiết)|n|C
お兄さん|おにいさん|anh (khi nói về anh của người khác hoặc gọi anh mình một cách thân thiết)|n|C
姉|あね|chị gái của mình|n|C
お姉さん|おねえさん|chị (khi nói về chị của người khác hoặc gọi chị mình một cách thân thiết)|n|C
弟|おとうと|em trai của mình|n|C
弟さん|おとうとさん|em trai của người khác|n|C
祖父|そふ|ông của mình|n|C
|おじいさん|ông (khi nói về ông của người khác hoặc gọi ông mình một cách thân thiết )|n|C
祖母|そぼ|bà của mình|n|C
|おばあさん|bà (khi nói về bà của người khác hoặc gọi bà mình một cách thân thiết)|n|C
頭|あたま|đầu|n|C
背|せ|lưng|n|C
髪|かみ|tóc|n|C
目|め|mắt|n|C
鼻|はな|mũi|n|C
足|あし|bàn chân|n|C
食べ物|たべもの|đồ ăn|n|C
景色|けしき|phong cảnh|n|C
気温|きおん|nhiệt độ (bên ngoài)|n|C
身長|しんちょう|chiều cao cơ thể|n|C
|ホテル|khách sạn|n|C
|ドラマ|phim truyền hình|n|C
|アニメ|anime|n|C
低い|ひくい|thấp|i|C
長い|ながい|dài|i|C
|～センチ|～ cm (「số đếm + センチ」 được sử dụng như phó từ)|suf|C
|いっせんち|1 cm|n|C
|にせんち|2 cm|n|C
|さんせんち|3 cm|n|C
|どの|cái ～ nào (đứng trước danh từ)|oth|C
`,
  gsec: "AAAAAABBCC", qsec: "AAAAAAAABBCC",
  grammar: [
    ["Các nhóm động từ trong tiếng Nhật","Nhóm 1 (＿imasu), Nhóm 2 (＿emasu), Nhóm 3 (đặc biệt)","Nhóm 1: 買います、あります、働きます、帰ります、歩きます、休みます、遊びます、行きます、聞きます、書きます、読みます、撮ります、運びます、持ちます、泳ぎます、弾きます… ｜ Nhóm 2: 食べます、寝ます、疲れます、出かけます、浴びます… và 3 động từ đuôi ＿imasu nhưng thuộc nhóm 2: 見ます、起きます、います. ｜ Nhóm 3: 来ます、します、N＋します (勉強します、旅行します、散歩します、買い物します…)."],
    ["Động từ thể khả năng (動詞の可能形)","Chia động từ sang thể khả năng","Nhóm 1: ＿imasu → ＿emasu: 行きます → 行けます, 帰ります → 帰れます, 買います → 買えます, 読みます → 読めます. ｜ Nhóm 2: ＿masu → ＿raremasu: 寝ます → 寝られます, 食べます → 食べられます, 起きます → 起きられます, 見ます → 見られます. ｜ Nhóm 3: します → できます, 来ます → 来られます, 旅行します → 旅行できます, 買い物します → 買い物できます. ｜ Không chia sang thể khả năng: あります/います (có, ở), 知ります (biết), 分かります (hiểu)."],
    ["(N は) ～ が V (thể khả năng)","N (có thể) làm được V","❶ Diễn tả khả năng, năng lực của chủ thể. ｜ ❷ Diễn tả khả năng thực hiện một sự việc, hành động nhờ có điều kiện, hoàn cảnh cụ thể nào đó. ｜ Trợ từ 「を」 được thay bởi trợ từ 「が」.","マイさんは 日本の 新聞が 読めます。","いい 天気の 日は、BBQ が できます。","ナムさんは ギターが 弾けます。","A：写真、撮れましたか？\nB：はい、撮れました。"],
    ["N (phương tiện, công cụ) で + V","Làm V bằng N","「で」 là trợ từ biểu thị phương thức, phương tiện, công cụ. ｜ Hỏi: 何で Vか. ｜ Trường hợp 「歩いて V」 không có trợ từ 「で」 đi kèm.","車で 東京に 行きました。","スプーンで プリンを 食べます。","ベトナム語で 説明します。","A：学校には 何で 行きますか。\nB：歩いて 行きます。"],
    ["Số tiền / khoảng thời gian + くらいです / かかります","(Làm V) bằng N tốn / mất ～ (số tiền / khoảng thời gian)","Hỏi: どのくらいですか / どのくらい かかりますか.","日本から ベトナムまで、飛行機で 5時間くらいです。","東京駅まで ６５００円くらい かかります。"],
    ["Số tiền / khoảng thời gian で + V","V (được) với số tiền / trong khoảng thời gian ～","「で」 biểu thị số tiền hoặc thời gian để có thể thực hiện V. ｜ Hỏi: いくらで / どのくらいで ＋ Vか.","1万円で、何が 買えますか。","この 料理は、15分で できます。"],
    ["N1 は N2 が 好き / 嫌い / 上手 / 下手 / 得意 / 苦手 だ / です","N1 thích / ghét / giỏi / kém N2","Có thể thêm phó từ chỉ mức độ như 「とても」、「まあまあ」、「あ(ん)まり」、「そんなに」、「全然」 vào trước các tính từ này.","私は 猫が 嫌いです。","妹は 料理が 苦手です。","山田さんは 歌が あまり 上手じゃないです。"],
    ["～から ～","Vì ～ nên ～","Nですから～ / Aなだから～ / Aいから～. ｜ Dùng thể lịch sự hoặc thể thường đều được: ～ですから / ～だから. ｜ Để hỏi nguyên nhân, lí do: 「どうして」.","明日は 休みですから、カラオケに 行きます。","安いですから、買います。","A：どうしてですか。\nB：歌が あまり 上手じゃありませんから。"],
    ["N1 は N2 が A","N1 có N2 (mang đặc điểm, tính chất) A","「は」 đứng sau danh từ chủ thể. ｜ 「が」 đứng sau danh từ là một bộ phận, phương diện, khía cạnh của/ thuộc chủ thể đó.","この ホテルは 部屋が 広くて きれいです。","妹は 髪が 長いです。","兄は 目が 大きくて 鼻が 高いです。"],
    ["Phân biệt 「は」 và 「が」","N1 が N2/ A です; N1 が V ます","「は」: thông tin mới hay nội dung người nói muốn nhấn mạnh nằm sau 「は」; dùng trong câu có vị ngữ là từ nghi vấn. ｜ 「が」: thông tin mới hay nội dung muốn nhấn mạnh nằm trước 「が」; dùng trong câu có chủ ngữ là từ nghi vấn.","あの 人は どなたですか。","どの 人が 田中さんですか。","A：パーティーに 誰が 来ましたか。\nB：マイさんが 来ました。"]
  ],
  quiz: [
    ["Động từ 「見ます」 thuộc nhóm nào?","Nhóm 2","Nhóm 1","Nhóm 3","Không thuộc nhóm nào","見ます, 起きます, います có đuôi ＿imasu nhưng thuộc nhóm 2."],
    ["「行きます」 ở thể khả năng là?","行けます","行られます","行きられます","行いけます","Nhóm 1: ＿imasu → ＿emasu."],
    ["「寝ます」 ở thể khả năng là?","寝られます","寝けます","寝ります","寝できます","Nhóm 2: ＿masu → ＿raremasu."],
    ["「旅行します」 ở thể khả năng là?","旅行できます","旅行します","旅行られます","旅行けます","Nhóm 3: します → できます."],
    ["ナムさんは ギター(  ) 弾けます。","が","に","で","と","Ở thể khả năng, 「を」 được thay bởi 「が」."],
    ["車(  ) 東京に 行きました。(đi bằng xe ô tô)","で","を","に","と","Phương tiện, công cụ: N で."],
    ["学校には 何(  ) 行きますか。…歩いて 行きます。","で","を","に","が","Hỏi phương tiện: 何で ～か."],
    ["1万円(  )、何が 買えますか。","で","に","を","が","Số tiền で + V: với số tiền đó có thể V."],
    ["私は 猫(  ) 嫌いです。","が","を","に","で","N1 は N2 が 好き/嫌い…"],
    ["明日は 休み(  )、カラオケに 行きます。(Vì ngày mai nghỉ nên…)","ですから","だけど","ですが","ですし","Nですから ～: vì ～ nên ～."],
    ["妹は 髪(  ) 長いです。(Em gái tóc dài)","が","を","に","で","N1 は N2 が A: 「が」 đứng sau bộ phận/ khía cạnh của chủ thể."],
    ["A：パーティーに 誰(  ) 来ましたか。 B：マイさんが 来ました。","が","は","を","に","Chủ ngữ là từ nghi vấn thì dùng 「が」."]
  ]
},
{
  id: 9, title: "Chương 9",
  vocab: `
無料|むりょう|miễn phí|n|A
趣味|しゅみ|sở thích|n|A
夢|ゆめ|ước mơ, giấc mơ|n|A
日課|にっか|thói quen hàng ngày|n|A
日記|にっき|nhật kí|n|A
花|はな|bông hoa|n|A
切手|きって|con tem|n|A
自分|じぶん|bản thân|n|A
新聞|しんぶん|tờ báo|n|A
空港|くうこう|sân bay|n|A
飲み物|のみもの|đồ uống|n|A
|シャワー|vòi hoa sen|n|A
|コーヒーマシン|máy pha cà phê|n|A
|カフェ|quán cà phê|n|A
|ゲーム|game, trò chơi|n|A
|クラシック|nhạc cổ điển|n|A
|コンサート|buổi hòa nhạc|n|A
|スキー|trượt tuyết|n|A
|シール|nhãn dán|n|A
描きます|かきます|vẽ  ［～を］|v1|A
書きます|かきます|viết  ［～を］|v1|A
作ります|つくります|làm, tạo ra  ［～を］|v1|A
登ります|のぼります|leo (núi)|v1|A
片付けます|かたづけます|sắp xếp  ［～を］|v2|A
育てます|そだてます|nuôi dạy, nuôi dưỡng, nuôi trồng  ［～を］|v2|A
集めます|あつめます|thu thập, sưu tầm  ［～を］|v2|A
建てます|たてます|xây dựng  ［～を］|v2|A
浴びます|あびます|tắm|v2|A
運転|うんてん|lái xe  ［～を］|n+v3|A
今度|こんど|lần tới|adv|A
|それと|thêm nữa|exp|A
|そうだ|A, đúng rồi! À, phải rồi! (dùng khi chợt nhớ ra hoặc nảy ra điều gì đó muốn nói)|exp|A
字|じ|chữ|n|B
|クーポン|phiếu giảm giá|n|B
|ランチ|bữa trưa|n|B
|ニュース|tin tức|n|B
汚い|きたない|bẩn, xấu (chữ viết)|i|B
歌う|うたう|hát|v1|B
|そろそろ|sắp, chuẩn bị|adv|B
|こんなに|đến mức này, như thế này|adv|B
|～パーセントオフ|giảm ～%|exp|B
|そうか|vậy à, thế à (cách nói suồng sã, thân mật của 「そうですか」, dùng khi nói với gia đình và bạn bè, khi mình đã hiểu những gì đối phương nói)|exp|B
|そっか|vậy à, thế à (cách nói suồng sã, thân mật của 「そうですか」, dùng khi nói với gia đình và bạn bè, khi mình đã hiểu những gì đối phương nói)|exp|B
何でしょうか|なんでしょうか|cách nói lịch sự của 「何ですか」|exp|B
最後|さいご|cuối cùng|n|C
夜行バス|やこうバス|xe buýt đêm|n|C
|アクセサリー|trang sức, phụ kiện|n|C
|チーズ|phô mai|n|C
|ダイエット|ăn kiêng|n|C
死ぬ|しぬ|chết|v1|C
～中|～ちゅう|đang ～|suf|C
ダイエット中|ダイエットちゅう|đang ăn kiêng|n|C
勉強中|べんきょうちゅう|đang học|n|C
仕事中|しごとちゅう|đang làm việc|n|C
`,
  gsec: "AAAABBBCCCC", qsec: "AAABBCCCCCCAABC",
  grammar: [
    ["V ます → V る (thể từ điển 辞書形)","Thể thường của Vます","Dùng suồng sã với người thân, bạn bè. ｜ Nhóm 1: ＿imasu → ＿u: 行きます → 行く, 買います → 買う. ｜ Nhóm 2: ＿masu → ＿ru: 寝ます → 寝る, 食べます → 食べる. ｜ Nhóm 3: します → する, 来ます → くる, 旅行します → 旅行する."],
    ["V ますか → V る？","Thể thường của câu hỏi","Bỏ 「か」, lên giọng ở cuối câu. ｜ はい → うん; いいえ → ううん. ｜ Vます → Vる; Vません → Vない.","A：明日、勉強する？\nB：うん、勉強する。","A：週末、出かける？\nB：ううん、家に いる。"],
    ["V る + ことが できる / N が できる","Có thể làm V / N","「こと」 được dùng để danh từ hóa động từ. ｜ 「Vることが できる」 thường dùng trong văn viết.","わたしの 姉は ギターを 弾くことが できる。","私は 車の 運転が できます。","A：ショッピングモールで 映画を 見ることが できますか。\nB：はい、できます。"],
    ["V る + ことです","(Sở thích, ước mơ…) là V","「こと」 danh từ hóa động từ làm vị ngữ.","（私の）趣味は 映画を 見ることです。","夢は 会社を 作ることです。"],
    ["V ません → V ない (ない形)","Thể ない","Nhóm 1: ＿imasu → ＿anai: 行きます → 行かない. ｜ Nhóm 2: ＿masu → ＿nai: 寝ます → 寝ない. ｜ Nhóm 3: します → しない, 来ます → 来ない.","A：明日の バーベキュー（に）行く？\nB：ううん、行かない。","A：毎日、本を 読む？\nB：ううん、読まない。"],
    ["(一緒に) V ませんか → (一緒に) V ない？","Có cùng V không? (thể thường)","「Vませんか → Vない？」 (lên giọng ở cuối câu).","ショッピングモールに 行きませんか。→ ショッピングモール（に）行かない？","一緒に 映画を 見ませんか。→ 一緒に 映画（を）見ない？"],
    ["V (thể khả năng) ます → V る / ない","Thể từ điển và thể ない của động từ thể khả năng","Cách chia thể từ điển (辞書形) và thể ない của động từ thể khả năng hoàn toàn giống động từ nhóm 2. ｜ 行けます → 行ける → 行けない; 見られます → 見られる → 見られない; 来られます → 来られる → 来られない; できます → できる → できない.","A：Bさんは 泳げる？\nB：うん。少し 泳げる。","A：Bさんは 英語が 話せる？\nB：ううん、全然 話せない（よ）。"],
    ["V ました → V た (た形)","Thể た — thể thường của Vました","Nhóm 1: ＿います/＿ちます/＿ります → ＿った (買った, 持った, 帰った); ＿みます/＿びます/＿にます → ＿んだ (飲んだ, 遊んだ, 死んだ); ＿きます → ＿いた (書いた); ＿ぎます → ＿いだ; ＿します → ＿した (話した); ngoại lệ: 行きます → 行った. ｜ Nhóm 2: ＿ます → ＿た (寝た, 食べた). ｜ Nhóm 3: します → した, 来ます → 来た. ｜ Aかったです → Aかった; A(な)でした/Nでした → だった."],
    ["V ませんでした → V なかった","Phủ định quá khứ thể thường","Vません → Vませんでした; Vない → Vなかった (食べない → 食べなかった, 読まない → 読まなかった).","A：昨日、田中さん、会社に 来た？\nB：ううん、来なかったよ。","A：昨日、何時間 働いた？\nB：８時間 働いた。"],
    ["V (thể khả năng) ました → V た / V なかった","Quá khứ thể thường của động từ thể khả năng","行けました → 行けた → 行けなかった; 見られました → 見られた → 見られなかった; 来られました → 来られた → 来られなかった.","富士山の 写真を 撮れた。","今朝は 6時に 起きられた。","A：Bさんは、寿司、食べられる？\nB：うん、前は 食べられなかったけど、今は 食べられるよ。"],
    ["Thể thường của V たいです","Vたい / Vたくない / Vたかった / Vたくなかった","Vたいですか → Vたい？; Vたいです → Vたい; Vたくないです → Vたくない; Vたかったです → Vたかった; Vたくなかったです → Vたくなかった.","A：夏休み、どこか 行きたい？\nB：うん、東京に 行きたい。","A：何か 食べたい？\nB：ううん、何も 食べたくない。"]
  ],
  quiz: [
    ["「行きます」 ở thể từ điển là?","行く","行きる","行う","行くる","Nhóm 1: ＿imasu → ＿u."],
    ["「寝ます」 ở thể từ điển là?","寝る","寝う","寝く","寝ます","Nhóm 2: ＿masu → ＿ru."],
    ["「来ます」 ở thể từ điển là?","来る","来く","来きる","来う","Nhóm 3: 来ます → 来る (くる)."],
    ["「行きます」 ở thể ない là?","行かない","行きない","行くない","行ない","Nhóm 1: ＿imasu → ＿anai."],
    ["「食べます」 ở thể ない là?","食べない","食べらない","食べはない","食べずない","Nhóm 2: ＿masu → ＿nai."],
    ["「買います」 ở thể た là?","買った","買いた","買んだ","買ました","＿います → ＿った."],
    ["「書きます」 ở thể た là?","書いた","書った","書んだ","書きた","＿きます → ＿いた."],
    ["「遊びます」 ở thể た là?","遊んだ","遊った","遊いた","遊びた","＿びます → ＿んだ."],
    ["「行きます」 ở thể た là?","行った","行いた","行んだ","行きた","行きます là ngoại lệ: 行った."],
    ["「話します」 ở thể た là?","話した","話いた","話った","話んだ","＿します → ＿した."],
    ["A：昨日、田中さん、会社に 来た？ B：ううん、(  )よ。","来なかった","来ない","来ませんでした","来なくなった","Phủ định quá khứ thể thường: Vなかった."],
    ["私の 趣味は 映画を (  ) ことです。","見る","見ます","見た","見て","Vる + ことです."],
    ["ケーキを 買う(  ) できる。","ことが","ことを","ことに","ことで","Vる + ことが できる."],
    ["「一緒に 映画を 見ませんか」 → 一緒に 映画（を）(  )？","見ない","見る","見ます","見ません","Vませんか → Vない？ (thể thường)."],
    ["「行きたくないです」 → 「行き(  )」 (thể thường)","たくない","たいくない","たない","たくないだ","Vたくないです → Vたくない."]
  ]
},
{
  id: 10, title: "Chương 10",
  vocab: `
約束|やくそく|lời hứa, cuộc hẹn|n|A
荷物|にもつ|hành lý|n|A
自動販売機|じどうはんばいき|máy bán hàng tự động|n|A
会議|かいぎ|cuộc họp|n|A
歯|は|răng|n|A
宿題|しゅくだい|bài về nhà|n|A
|エーティーエム|cây rút tiền|n|A
|コンビニ|cửa hàng tiện lợi|n|A
磨く|みがく|đánh (răng, giày,...)  ［～を］|v1|A
引き出す|ひきだす|rút (tiền), kéo ra  ［～を］|v1|A
終わる|おわる|kết thúc|v1|A
準備|じゅんび|chuẩn bị  ［～を］|n+v3|A
掃除|そうじ|dọn dẹp  ［～を］|n+v3|A
|みんなで|tất cả (mọi người) (cùng thực hiện một hành động nào đó)|adv|A
曲|きょく|ca khúc, khúc nhạc|n|B
海外|かいがい|nước ngoài|n|B
|バンド|nhóm nhạc|n|B
|さっき|lúc nãy, vừa nãy|n+adv|B
～度|～ど|～lần|n+adv|B
一度|いちど|1 lần (ví dụ: 4年に1度 = 4 năm 1 lần)|n+adv|B
何度も|なんども|nhiều lần (一度も～ない = một lần cũng không/ chưa ～)|n+adv|B
待つ|まつ|chờ  ［～を］|v1|B
着く|つく|đến (nơi)  ［～に］|v1|B
始まる|はじまる|( ～) bắt đầu  ［～が］|v1|B
入る|はいる|vào (vào phòng, vào đại học...)  ［～に］|v1|B
遅れる|おくれる|muộn  ［～に］|v2|B
慣れる|なれる|quen, quen thuộc (với ～)  ［～に］|v2|B
卒業|そつぎょう|tốt nghiệp|n+v3|B
|ごめん|xin lỗi  ［cũng đọc: ごめんなさい］|exp|B
お待たせ|おまたせ|xin lỗi đã để anh/chị/bạn chờ (lưu ý: đây là lối nói suồng sã của 「お待たせしました」)|exp|B
|こちらこそ|chính phía tôi ～|exp|B
お腹がいっぱい|おなかがいっぱい|no|exp|B
`,
  gsec: "AAABBB", qsec: "AAAAABBBBB",
  grammar: [
    ["V ましょう → V よう (意向形)","Thể ý chí — thể thường của Vましょう","Nhóm 1: ＿imasu → ＿ou: 行きます → 行こう, 帰ります → 帰ろう, 買います → 買おう. ｜ Nhóm 2: ＿masu → ＿you: 寝ます → 寝よう, 食べます → 食べよう, 浴びます → 浴びよう. ｜ Nhóm 3: します → しよう, 来ます → 来よう. ｜ Dùng để rủ rê, chốt ý định.","A：おいしい ケーキが 食べたいな。\nB：じゃあ、（一緒に）駅前の カフェに 行こうよ。","A：日本語を 勉強したいな。\nB：日本語学校で 勉強しよう。"],
    ["V1る / N の + 前に、V2","Trước khi V1 / N thì V2","Thì của câu được chia ở cuối câu (Vます、Vた、Vたい、Vよう…). ｜ Trước 「前に」 động từ luôn ở dạng 「Vる」.","昨日 寝る 前に 本を 読みました。","旅行の 前に 荷物を 準備します。","今晩 コンサートの 前に、食事を しましょう。"],
    ["V1た / N の + 後で、V2","Sau khi V1 / N thì V2","Thì của câu được chia ở cuối câu. ｜ Trước 「後で」 động từ luôn ở dạng 「Vた」.","毎日 家に 帰った 後で、テレビを 見ます。","会議の 後で 会議室を 掃除します。","食事の 後で、コンサートに 行きましょう。"],
    ["V1たら、V2","Sau khi V1 thì V2 (khi/ nếu V1)","V1 chắc chắn xảy ra trong tương lai và là điều kiện để xảy ra V2. ｜ V2 ở tương lai: Vる、Vたい、Vよう. ｜ Khác với 「後で」: V2 không kết thúc bằng quá khứ. ｜ ○ 実家に 帰ったら、ゆっくり 休みます。 ✘ 実家に 帰ったら、ゆっくり 休みました。","日本に 行ったら ラーメンを 食べたい。","ベトナムへ 行ったら、ミーケビーチへ 行きたいです。","家に 帰ったら、シャワーを 浴びます。"],
    ["V たばかりだ","Vừa mới V","「ばかり」 được xem như một danh từ → 「ばかりだから」、「ばかりの」. ｜ Khoảng thời gian hành động vừa kết thúc có tính chủ quan: 昨日、去年…","今、ご飯を 食べたばかりですから、食べたくないです。","日本に 来たばかりですから、日本語が 話せません。"],
    ["V たことが あります","Đã từng V","Thường kết hợp với các phó từ: 前に、一度、一回… ｜ 「Vたことがない」: chưa từng làm V; dạng phủ định thường kết hợp với phó từ 一度も. ｜ Khi giao tiếp thân mật, 「が」 có thể lược bỏ.","私は 海外へ 行ったことが ある。","私の 母は 一度も 海外に 行ったことが ありません。","A：ダナンに 行ったことが ありますか。\nB：はい、１回あります。"]
  ],
  quiz: [
    ["「行きます」 ở thể ý chí (意向形) là?","行こう","行ごう","行きよう","行くよう","Nhóm 1: ＿imasu → ＿ou."],
    ["「食べます」 ở thể ý chí là?","食べよう","食べおう","食べろう","食べいよう","Nhóm 2: ＿masu → ＿you."],
    ["「します」 ở thể ý chí là?","しよう","すよう","しおう","しろう","Nhóm 3: します → しよう, 来ます → 来よう."],
    ["Câu nào đúng? (Hôm qua trước khi ngủ tôi đã đọc sách)","昨日 寝る 前に 本を 読みました。","昨日 寝た 前に 本を 読みました。","昨日 寝て 前に 本を 読みました。","昨日 寝ない 前に 本を 読みました。","Trước 「前に」 động từ luôn ở dạng 「Vる」."],
    ["ご飯を 食べ(  ) 後で、散歩します。","た","る","て","ない","Trước 「後で」 động từ luôn ở dạng 「Vた」."],
    ["日本に 行っ(  )、ラーメンを 食べたいです。","たら","たり","てら","ると","V1たら、V2: sau khi V1 thì V2 (V1 chắc chắn xảy ra trong tương lai)."],
    ["Câu nào đúng?","実家に 帰ったら、ゆっくり 休みます。","実家に 帰ったら、ゆっくり 休みました。","実家に 帰ったら、ゆっくり 休んだ。","実家に 帰ったら、ゆっくり 休んでいました。","Với V1たら, vế V2 ở tương lai: không kết thúc bằng quá khứ."],
    ["今、ご飯を 食べ(  )ばかりです。","た","る","て","ない","Vたばかりだ: vừa mới V."],
    ["私は 海外へ 行っ(  )ことが あります。","た","る","て","ない","Vたことが あります: đã từng V."],
    ["母は (  ) 海外に 行ったことが ありません。(chưa một lần nào)","一度も","一度は","一度に","一度で","Dạng phủ định thường kết hợp với 一度も."]
  ]
},
{
  id: 11, title: "Chương 11",
  vocab: `
席|せき|chỗ ngồi|n|A
説明書|せつめいしょ|sách hướng dẫn|n|A
両親|りょうしん|bố mẹ|n|A
お風呂|おふろ|bồn tắm|n|A
|ドライブ|việc lái xe ô tô đi dạo/ đi chơi xa|n|A
|アプリ|ứng dụng (phần mềm), app|n|A
遅い|おそい|muộn, chậm|i|A
|しょうがない|đành chịu, hết cách|i|A
言う|いう|nói|v1|A
急ぐ|いそぐ|khẩn trương, nhanh chóng|v1|A
頑張る|がんばる|cố gắng  ［～を］|v1|A
間に合う|まにあう|kịp, kịp giờ  ［～に］|v1|A
|やる|làm  ［～を］|v1|A
出る|でる|ra (khỏi phòng/ khỏi nhà)  ［～を］|v2|A
予約|よやく|đặt trước  ［～を］|n+v3|A
練習|れんしゅう|luyện tập  ［～を］|n+v3|A
安心|あんしん|an tâm, yên tâm|n+v3|A
|まだ|vẫn chưa (khi đi với phủ định) vẫn còn (khi đi với khẳng định)|adv|A
お疲れ様です|おつかれさまです|anh/ chị làm việc vất vả rồi.|exp|A
お疲れ様でした|おつかれさまでした|anh/ chị làm việc vất vả rồi (nói khi kết thúc công việc)|exp|A
乾杯!|かんぱい|cạn ly!|exp|A
頑張ってください|がんばってください|cố gắng lên.|exp|A
世界|せかい|thế giới|n|B
世界一周|せかいいっしゅう|vòng quanh thế giới|n|B
広告|こうこく|quảng cáo|n|B
野球|やきゅう|bóng chày|n|B
健康診断|けんこうしんだん|khám sức khỏe|n|B
病気|びょうき|ốm, bệnh|n|B
全員|ぜんいん|tất cả mọi người|n+adv|B
不合格|ふごうかく|không đỗ; trượt|n|B
資料|しりょう|tài liệu|n|B
世話|せわ|chăm sóc|n|B
薬|くすり|thuốc|n|B
|たばこ|thuốc lá|n|B
お知らせ|おしらせ|thông báo|n|B
手|て|tay, bàn tay|n|B
|レポート|báo cáo|n|B
|だめ|không được|na|B
洗う|あらう|rửa  ［～を］|v1|B
吸う|すう|hút (thuốc)  ［～を］|v1|B
回す|まわす|xoay tròn, vung tròn (thứ gì đó)  ［～を］|v1|B
乗る|のる|lên (tàu, xe,.. )  ［～に］|v1|B
連れて行く|つれていく|dẫn (ai) đi (đến đâu)  ［人を・場所に］|v1|B
持っていく|もっていく|mang đi, cầm đi  ［～を］|v1|B
晴れる|はれる|nắng|v2|B
気を付ける|きをつける|chú ý  ［～に］|v2|B
注意|ちゅうい|chú ý; nhắc nhở (người khác)  ［～に］|n+v3|B
合格|ごうかく|đỗ～  ［～に］|n+v3|B
生活|せいかつ|sinh sống, sinh hoạt|n+v3|B
残業|ざんぎょう|tăng ca|n+v3|B
出張|しゅっちょう|đi công tác|n+v3|B
一生懸命|いっしょうけんめい|chăm chỉ|adv|B
絶対に|ぜったいに|nhất định, tuyệt đối|adv|B
|いつか|một lúc nào đó|adv|B
|そうなんですね|vậy à, thế à (sử dụng để thể hiện sự đồng cảm hoặc bất ngờ, ngạc nhiên với câu chuyện của đối phương)|exp|B
|そうなんだ|vậy à, thế à (cách nói suồng sã, thân mật của 「そうなんですね」)|exp|B
`,
  gsec: "AAAABBB", qsec: "AAAAAAAABBB",
  grammar: [
    ["Thể ば (ば形)","Cách chia sang thể ば","Động từ nhóm 1: ＿imasu → ＿eba: 行きます → 行けば, 読みます → 読めば, 書きます → 書けば. ｜ Nhóm 2: ＿masu → ＿reba: 寝ます → 寝れば, います → いれば, 起きます → 起きれば. ｜ Nhóm 3: します → すれば, 来ます → 来れば, 買い物します → 買い物すれば. ｜ Vない → Vなければ (行かない → 行かなければ). ｜ Tính từ Aい: Aい + ければ (大きい → 大きければ, 高い → 高ければ, いい → よければ); Aいくない → Aいくなければ."],
    ["V ば / Aい ければ ～","Nếu ～ thì sẽ (là có thể) ～","Vế sau thường là những sự việc mà người nói kỳ vọng, mong đợi, nên thường là những từ mang tính đánh giá: だいじょうぶ、いい、わかる, hay là V (khả năng).","お金が あれば、旅行に 行けます。","A：大丈夫ですか？\nB：ええ、少し 寝れば、大丈夫です。","高ければ、買いません。"],
    ["Từ nghi vấn + V ば、～か","Nên V (như thế nào…) thì ～?","Vế trước 「～ば」 có thể kết hợp với các từ nghi vấn: いつ、どこ、誰、何、どう、どのくらい… ｜ Vế sau thường kết hợp cùng 「いい」 hoặc là một kết quả mà bản thân mong đợi. ｜ Trả lời cho 「V ば いい」: 「～Vると いいですよ」 hoặc 「～Vたら どうですか」.","どうすれば、日本の 大学に 行けますか。","お金が ありません。どうすれば いいですか。→ アルバイトを したら どうですか。"],
    ["V なければ、～","Nếu không V thì ～","ない → なければ: 行かない → 行かなければ, 読まない → 読まなければ, 書かない → 書かなければ.","野菜も 食べなければ、病気に なりますよ。","働かなければ、生活できません。"],
    ["V なければなりません / V ないといけません","Phải làm V","「～なければ なりません」 và 「～ないと いけません」; thể thường: 「～ないと いけない」、「～ないと」.","学生は 毎日 授業に 来なければ なりません。","店に 行く 前に、予約しないと いけない。","あ、6時だ。帰らないと。"],
    ["V なきゃ、～","Nếu không ～ thì không ～ (câu điều kiện phủ định)","「～なきゃ」 là cách nói ngắn của 「～なければ」, thường được dùng trong văn nói. ｜ 行かない → 行かなければ／行かなきゃ; 見ない → 見なければ／見なきゃ; しない → しなければ／しなきゃ; 来ない → 来なければ／来なきゃ.","全部 食べなきゃ、もったいないですよ。","本を 見なきゃ、漢字の 読み方が わからない。"],
    ["V なきゃ いけない / V ないと いけない","Phải V (cách nói thân mật)","なければ + なりません/ いけません/ だめだ; なきゃ + いけない/ だめだ; ないと + いけない/ だめだ.","忙しいから、日曜日も 仕事を しなきゃ いけない。","買い物の 前に、ATMに 行かなきゃ いけない。"]
  ],
  quiz: [
    ["「行きます」 ở thể ば là?","行けば","行くば","行きば","行かば","Nhóm 1: ＿imasu → ＿eba."],
    ["「食べます」 ở thể ば là?","食べれば","食べるば","食べば","食べられば","Nhóm 2: ＿masu → ＿reba."],
    ["「します」 ở thể ば là?","すれば","しれば","するば","しば","Nhóm 3: します → すれば, 来ます → 来れば."],
    ["「高い」 ở thể ば là?","高ければ","高いば","高くば","高かれば","Aい: bỏ い + ければ."],
    ["「いい」 ở thể ば là?","よければ","いければ","いいければ","よいば","いい → よければ."],
    ["「行かない」 ở thể ば là?","行かなければ","行かなくば","行かないば","行かなけば","ない → なければ."],
    ["お金が (  )、旅行に 行けます。(Nếu có tiền thì có thể đi du lịch)","あれば","あるば","ありば","あらば","あります → あれば."],
    ["お金が ありません。どうすれば (  )ですか。","いい","いく","ある","いる","Vế sau của 「Vば」 thường kết hợp cùng 「いい」."],
    ["学生は 毎日 勉強し(  ) なりません。(Học sinh phải học mỗi ngày)","なければ","ないで","なくて","ないが","Vなければ なりません: phải làm V."],
    ["店に 行く 前に、予約し(  ) いけない。(thể thường)","ないと","なくて","ないで","ずに","Vないと いけない: phải V."],
    ["全部 食べ(  )、もったいないですよ。(Nếu không ăn hết thì uổng đấy)","なきゃ","なくて","ないで","ない","「なきゃ」 là cách nói ngắn của 「なければ」."]
  ]
},
{
  id: 12, title: "Chương 12",
  vocab: `
体|からだ|cơ thể|n|A
|ハンバーグ|thịt viên rán|n|A
|インターネット|internet|n|A
置く|おく|đặt, để  ［～を］|v1|A
下ろす|おろす|rút (tiền)  ［～を］|v1|A
調べる|しらべる|tra cứu, tìm hiểu  ［～を］|v2|A
帰ってくる|かえってくる|về đến|v3|A
|もう|đã, rồi|adv|A
|おやすみ|chúc ngủ ngon  ［cũng đọc: おやすみなさい］|exp|A
|ほら|nào! (lời kêu gọi sự chú ý của đối phương)|exp|A
|やだ|① không thích, không được ② thôi chết! (cách nói khác của いやだ, nữ giới thường dùng khi gặp chuyện mình không thích hoặc khi nhầm lẫn. Lưu ý: không dùng với người bề trên.)|exp|A
空|そら|bầu trời|n|B
雪|ゆき|tuyết|n|B
風|かぜ|gió|n|B
地面|じめん|mặt đất|n|B
休憩室|きゅうけいしつ|phòng nghỉ|n|B
探す|さがす|tìm kiếm  ［～を］|v1|B
降る|ふる|rơi (mưa rơi, tuyết rơi)|v1|B
飛ぶ|とぶ|bay|v1|B
走る|はしる|chạy|v1|B
通う|かよう|đi lại (chỉ việc thường hay đi đến một địa điểm nào đó như đi học 「学校に通う」, đi làm 「会社に通う」,...)  ［～に］|v1|B
泣く|なく|khóc|v1|B
笑う|わらう|cười|v1|B
曇る|くもる|âm u, nhiều mây|v1|B
続く|つづく|liên tục|v1|B
吹く|ふく|thổi|v1|B
揺れる|ゆれる|rung lắc|v2|B
運動|うんどう|vận động, tập thể dục|n+v3|B
|コピー|photo  ［～を］|n+v3|B
体にいい|からだにいい|tốt cho cơ thể (cách chia thì và thể hoàn toàn tương tự tính từ đuôi い)|i|B
お先に失礼します|おさきにしつれいします|tôi xin phép về trước|exp|B
`,
  gsec: "AAABBBCCC", qsec: "AAAAAAAAAABCC",
  grammar: [
    ["Thể て (て形)","Cách chia động từ sang thể て","Nhóm 1: ＿います/＿ちます/＿ります → ＿って (買って, 持って, 帰って); ＿みます/＿びます/＿にます → ＿んで (飲んで, 遊んで, 死んで); ＿きます → ＿いて (聞いて); ＿ぎます → ＿いで (急いで); ＿します → ＿して (話して); ngoại lệ: 行きます → 行って. ｜ Nhóm 2: ＿ます → ＿て (寝て, 食べて, 起きて, 浴びて). ｜ Nhóm 3: します → して (買い物して, 旅行して), 来ます → 来て."],
    ["V1 て、V2 て、… V","V1 rồi V2, … rồi V","Thể て được sử dụng để nối các hành động xảy ra liên tục. ｜ Thì của câu được chia ở động từ cuối cùng trong câu.","テレビを 見て、シャワーを 浴びて、寝ます。","病院に 行って、薬を 買って、家に 帰りました。","A：昨日、何を しましたか。\nB：昨日 友達の うちに 行って、ケーキを 食べて、それから コーヒーを 飲みました。"],
    ["V1 てから V2","Sau khi V1 thì V2","Khác với 「V1て、V2て～」: 「Vて」 liệt kê các hành động liên tiếp của một chủ thể và có thể xuất hiện nhiều lần trong 1 câu; 「Vてから」 hành động vế trước và vế sau có thể là cùng một hoặc hai chủ thể, và trong 1 câu chỉ dùng 「Vてから」 1 lần. ｜ ✕ お父さんが 帰ってきて 一緒に ご飯を 食べます。 ○ いつも、お父さんが 帰ってきてから、一緒に ご飯を 食べます。","朝、新聞を 読んでから 会社へ 行きます。","A：今から ゲームを しますか。\nB：いいえ、宿題を してから ゲームを します。"],
    ["(N は) V て います","N đang V","Diễn tả hành động V đang xảy ra ngay tại thời điểm nói. ｜ Trong văn nói suồng sã, thân mật, 「い」 của 「ている」 có thể được lược bỏ.","A：田中さんは どこですか。\nB：今、休憩室で 休んでいますよ。","もしもし、今、何（を）して（い）る？","A：何を していますか。\nB：日本語を 勉強しています。"],
    ["N が V て います","N đang V (sự việc trước mắt)","Diễn tả sự việc, hiện tượng đang xảy ra ngay trước mắt mà đối phương không nhìn thấy hoặc không để ý đến. ｜ Chủ thể N được biểu thị bởi trợ từ 「が」.","あ、見て。あそこで 猫が 寝ているよ。","あれ、田中さんが 何か 食べていますね。","犬が 遊んで（い）ます（よ）。"],
    ["(N は) V て います (thói quen)","Thường V","Diễn tả thói quen, lối sống.","最近は、毎日 スポーツジムに 行っています。","毎朝、新聞を 読んでいます。"],
    ["N が V て います (trạng thái)","Diễn tả trạng thái, kết quả của hành động","Động từ thể hiện trạng thái như 「ある」、「いる」… không có dạng 「Vている」.","あ、窓が 開いていますよ。","あ、桜が 咲いていますよ。","あ、服が 汚れていますよ。"],
    ["V て います (trạng thái, hành động duy trì lâu dài)","Đang V (kéo dài)","Diễn tả trạng thái, hành động duy trì trong một thời gian dài: 住む、結婚する、習う、持つ、働く、勉強する.","鈴木さんは その会社で 働いていますね。","ABC日本語学校で 3年、日本語を 勉強しています。","車を 持っていますか。→ はい、持っています。／いいえ、持っていません。"],
    ["N を 知っていますか","Bạn có biết N không?","Trả lời: はい、知っています。／いいえ、知りません。(quá khứ: 知りませんでした).","この 会社を 知っていますか。","私は 「東京タワー」を 知りませんでした。"]
  ],
  quiz: [
    ["「買います」 ở thể て là?","買って","買いて","買んで","買て","＿います → ＿って."],
    ["「飲みます」 ở thể て là?","飲んで","飲って","飲いて","飲みて","＿みます → ＿んで."],
    ["「聞きます」 ở thể て là?","聞いて","聞って","聞んで","聞きて","＿きます → ＿いて."],
    ["「行きます」 ở thể て là?","行って","行いて","行んで","行きて","行きます là ngoại lệ: 行って."],
    ["「急ぎます」 ở thể て là?","急いで","急いて","急んで","急って","＿ぎます → ＿いで."],
    ["「話します」 ở thể て là?","話して","話いて","話って","話んで","＿します → ＿して."],
    ["「食べます」 ở thể て là?","食べて","食べって","食べんで","食べいて","Nhóm 2: ＿ます → ＿て."],
    ["「来ます」 ở thể て là?","来て","来きて","来って","来んで","来ます → 来て."],
    ["テレビを 見(  )、シャワーを 浴びて、寝ます。","て","た","る","ない","V1て、V2て…: nối các hành động xảy ra liên tục."],
    ["朝、新聞を 読ん(  ) 会社へ 行きます。","でから","てから","でて","たから","読む → 読んで + から: sau khi đọc báo thì đi làm."],
    ["今、カフェで コーヒーを 飲ん(  )。(đang uống)","でいます","ています","でです","たいます","Vて います: đang V (飲む → 飲んで)."],
    ["あ、窓が 開(  )よ。(Cửa sổ đang mở — trạng thái)","いています","いでいます","けています","くています","Trạng thái, kết quả của hành động: N が Vて います (開く → 開いて)."],
    ["Hỏi 「Bạn có biết công ty này không?」 nói thế nào?","この 会社を 知っていますか。","この 会社を 知りますか。","この 会社を 知りましたか。","この 会社を 知っていましたか。","Nを 知っていますか: bạn có biết N không?"]
  ]
},
{
  id: 13, title: "Chương 13",
  vocab: `
俺|おれ|tôi, tớ, tao  ［nam giới dùng, thân mật］|n|A
小学生|しょうがくせい|học sinh tiểu học|n|A
内容|ないよう|nội dung|n|A
制服|せいふく|đồng phục|n|A
宅配便|たくはいびん|dịch vụ giao hàng tận nhà|n|A
|えんぴつ|bút chì|n|A
|はんこ|con dấu|n|A
|はがき|bưu thiếp|n|A
|メモ|bản ghi nhớ, ghi chép|n|A
|メール|email, tin nhắn|n|A
|サイン|chữ ký|n|A
アルバイト先|アルバイトさき|nơi làm thêm, chỗ làm thêm|n|A
|ティーシャツ|áo phông  ［viết: Tシャツ］|n|A
|スーツ|âu phục, com lê|n|A
|ボールペン|bút bi|n|A
|クレジットカード|thẻ tín dụng|n|A
|ドル|đô la|n|A
楽|らく|nhàn, an nhàn, nhàn nhã|na|A
|ふわふわ|mềm, bông xốp|na+adv|A
触る|さわる|sờ, chạm  ［～を/に］|v1|A
持って帰る|もってかえる|mang về  ［～を］|v1|A
取る|とる|ghi chép  ［メモを］|v1|A
開ける|あける|mở  ［～を］|v2|A
覚える|おぼえる|nhớ, ghi nhớ  ［～を］|v2|A
|アルバイト|làm thêm|n+v3|A
早退|そうたい|về sớm  ［～を］|n+v3|A
料理|りょうり|nấu ăn  ［～を］|n+v3|A
試着|しちゃく|mặc thử (quần áo...)  ［～を］|n+v3|A
連絡|れんらく|liên lạc  ［～を/に］|n+v3|A
参加|さんか|tham gia  ［～に］|n+v3|A
構わない|かまわない|không sao, không thành vấn đề  ［cách nói lịch sự: 構いません（かまいません）］|exp|A
|いかがですか|anh/chị thấy thế nào ạ?  ［cách nói lịch sự của 「どうですか」］|exp|A
|いただきます|① tôi xin nhận ạ (nói khi nhận thứ gì từ người khác, hàm ý cảm ơn) ② tôi xin phép dùng bữa (nói trước khi ăn/uống)|exp|A
商品|しょうひん|hàng hóa|n|B
道|みち|con đường|n|B
店長|てんちょう|quản lý cửa hàng, chủ cửa hàng|n|B
先輩|せんぱい|đàn anh, tiền bối|n|B
食器|しょっき|dụng cụ đồ ăn (bát đĩa, thìa đũa...)|n|B
申込書|もうしこみしょ|tờ khai đăng ký, đơn đăng ký|n|B
迷惑|めいわく|phiền phức, phiền hà|n|B
住所|じゅうしょ|địa chỉ|n|B
|キッチン|phòng bếp|n|B
|スーツケース|va li|n|B
手伝う|てつだう|giúp đỡ  ［～を］|v1|B
拭く|ふく|lau (bàn...)  ［～を］|v1|B
助かる|たすかる|① được giúp đỡ ② may quá! đỡ quá! (cách nói khi nhận được sự giúp đỡ từ người khác)|v1|B
並ぶ|ならぶ|xếp hàng (ở ～)  ［～に］|v1|B
取る|とる|photo  ［コピーを］|v1|B
貸す|かす|cho vay, cho mượn, cho thuê (nhà, xe...)  ［～を］|v1|B
止まる|とまる|dừng, đỗ, đậu|v1|B
足りる|たりる|đủ|v2|B
見せる|みせる|cho (ai) xem ～  ［～を～に］|v2|B
届ける|とどける|gửi, đưa ～ đến (ai đó)  ［～を～に］|v2|B
|つける|bật, mở  ［～を］|v2|B
教える|おしえる|dạy, chỉ bảo, cho biết  ［～を］|v2|B
忘れる|わすれる|quên  ［～を］|v2|B
持ってくる|もってくる|mang đến  ［～を］|v3|B
確認|かくにん|xác nhận ～  ［～を］|n+v3|B
|メール|gửi mail, tin nhắn  ［～に］|n+v3|B
|チーズ！|lời nói khi hô chụp ảnh (như “cheese!”)|exp|B
`,
  gsec: "", qsec: "",
  grammar: [],
  quiz: []
}
];

/*
  CÁCH ĐỌC BỔ SUNG cho chữ Hán xuất hiện trong ngữ pháp / câu hỏi mà không nằm trong danh sách từ vựng.
  Mỗi dòng "Cách viết|Cách đọc". Mục ở đây được ưu tiên hơn từ vựng; mục dài nhất được khớp trước.
*/
const EXTRA_READINGS = `
語|ご
火|か
月|がつ
日|にち
京都|きょうと
大阪|おおさか
木村|きむら
田中|たなか
富士山|ふじさん
東京|とうきょう
生活|せいかつ
旅行|りょこう
個|こ
台|だい
枚|まい
回|かい
9歳|きゅうさい
38歳|さんじゅうはっさい
3,000円|さんぜんえん
300円|さんびゃくえん
1階|いっかい
3階|さんがい
1時|いちじ
3時|さんじ
4時|よじ
6時|ろくじ
7時|しちじ
9時|くじ
12時|じゅうにじ
5分|ごふん
2月|にがつ
3月|さんがつ
1人|ひとり
2人|ふたり
10人|じゅうにん
5枚|ごまい
2時間|にじかん
1週間|いっしゅうかん
2回|にかい
1か月|いっかげつ
1年|いちねん
人|ひと
日本人|にほんじん
アメリカ人|アメリカじん
～人 (người|～にん (người
～人|～じん
何|なに
何ですか|なんですか
何人|なんにん
何枚|なんまい
何台|なんだい
一|いち
二|に
三|さん
四|よん
五|ご
六|ろく
七|なな
八|はち
九|きゅう
十|じゅう
三人|さんにん
五人|ごにん
三枚|さんまい
三台|さんだい
三本|さんぼん
五台|ごだい
五枚|ごまい
二枚|にまい
二台|にだい
人 chỉ|じん chỉ
日本 + 人|にほん + じん
Người: ～人|Người: ～にん
鈴木|すずき
員|いん
時|じ
分|ふん
時半|じはん
郵便|ゆうびん
局|きょく
番号|ばんごう
誕生|たんじょう
酒|さけ
日本酒|にほんしゅ
賑やか|にぎやか
美味しい|おいしい
北海道|ほっかいどう
匹|ひき
お願い|おねがい
冊|さつ
杯|はい
男|おとこ
女|おんな
週間|しゅうかん
祭り|まつり
方|かた
使い方|つかいかた
書き方|かきかた
行き方|いきかた
読み方|よみかた
食べ方|たべかた
動詞|どうし
可能|かのう
形|けい
辞書|じしょ
意向|いこう
室|しつ
度|ど
知|し
分かります|わかります
万|まん
旅|たび
開|あ
桜|さくら
咲|さ
住む|すむ
結婚|けっこん
習う|ならう
年|ねん
何ですか|なんですか
何の|なんの
何で|なんで
何人|なんにん
何匹|なんびき
何歳|なんさい
1時|いちじ
2時|にじ
3時|さんじ
4時|よじ
5時|ごじ
6時|ろくじ
7時|しちじ
8時|はちじ
9時|くじ
10時|じゅうじ
11時|じゅういちじ
12時|じゅうにじ
10時半|じゅうじはん
9時半|くじはん
４時|よじ
４時半|よじはん
６時|ろくじ
９時|くじ
1分|いっぷん
2分|にふん
3分|さんぷん
4分|よんぷん
5分|ごふん
6分|ろっぷん
7分|ななふん
8分|はっぷん
9分|きゅうふん
10分|じゅっぷん
15分|じゅうごふん
30分|さんじゅっぷん
50分|ごじゅっぷん
1人|ひとり
2人|ふたり
3人|さんにん
4人|よにん
5人|ごにん
6人|ろくにん
7人|ななにん
8人|はちにん
9人|きゅうにん
10人|じゅうにん
1匹|いっぴき
2匹|にひき
3匹|さんびき
4匹|よんひき
5匹|ごひき
6匹|ろっぴき
7匹|ななひき
8匹|はっぴき
9匹|きゅうひき
10匹|じゅっぴき
３日|みっか
4日|よっか
5日|いつか
3本|さんぼん
4時間|よじかん
5時間|ごじかん
8時間|はちじかん
８時間|はちじかん
1か月|いっかげつ
1回|いっかい
１回|いっかい
1週間|いっしゅうかん
3年|さんねん
500円|ごひゃくえん
1,000円|せんえん
1,980円|せんきゅうひゃくはちじゅうえん
～時半|～じはん
半|はん
補足|ほそく
場所|ばしょ
山田|やまだ
後で|あとで
の日|のひ
汚れ|よごれ
何時間|なんじかん
時間|じかん
来る|くる
来ない|こない
来なかった|こなかった
来なくなった|こなくなった
来なければ|こなければ
来なきゃ|こなきゃ
来られ|こられ
来よう|こよう
来れば|くれば
1万円|いちまんえん
６５００円|ろくせんごひゃくえん
`;
