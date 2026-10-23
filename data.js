/*
  DỮ LIỆU ÔN TẬP — Minna no Nihongo, Bài 1 ~ 12
  -----------------------------------------------------------------
  vocab   : mỗi dòng "Kanji|Cách đọc|Nghĩa". Không có kanji thì để trống phần đầu.
  grammar : [mẫu câu, ý nghĩa, ví dụ (JP), ví dụ (VN), ví dụ 2 (JP)?, ví dụ 2 (VN)?]
  quiz    : [câu hỏi, ĐÁP ÁN ĐÚNG, sai 1, sai 2, sai 3, giải thích]
            (thứ tự đáp án được trộn tự động; "(  )" là chỗ trống)
*/
const CHAPTERS = [
{
  id: 1, title: "Chương 1",
  vocab: `
私|わたし|tôi
|あなた|bạn
あの人|あのひと|người kia
あの方|あのかた|vị kia (lịch sự)
先生|せんせい|giáo viên, thầy/cô
教師|きょうし|giáo viên (nghề nghiệp)
学生|がくせい|học sinh, sinh viên
会社員|かいしゃいん|nhân viên công ty
社員|しゃいん|nhân viên (công ty ~)
銀行員|ぎんこういん|nhân viên ngân hàng
医者|いしゃ|bác sĩ
研究者|けんきゅうしゃ|nhà nghiên cứu
|エンジニア|kỹ sư
大学|だいがく|đại học
病院|びょういん|bệnh viện
|だれ|ai
|どなた|vị nào (lịch sự)
歳|さい|tuổi
何歳|なんさい|mấy tuổi
|はい|vâng, dạ
|いいえ|không
人|じん|người (nước ~)
|アメリカ|Mỹ
|イギリス|Anh
|インド|Ấn Độ
|インドネシア|Indonesia
韓国|かんこく|Hàn Quốc
|タイ|Thái Lan
中国|ちゅうごく|Trung Quốc
|ドイツ|Đức
日本|にほん|Nhật Bản
|フランス|Pháp
|ブラジル|Brazil
|はじめまして|rất hân hạnh được làm quen
`,
  grammar: [
    ["N1 は N2 です", "N1 là N2. Trợ từ は đọc là「わ」; です là cách nói khẳng định lịch sự.", "わたしは マイク・ミラーです。", "Tôi là Mike Miller."],
    ["N1 は N2 じゃ ありません", "N1 không phải là N2. Trong văn viết dùng では ありません.", "サントスさんは 学生じゃ ありません。", "Anh Santos không phải là sinh viên."],
    ["S か", "Thêm か vào cuối câu để tạo câu hỏi (lên giọng ở cuối câu).", "ミラーさんは アメリカ人ですか。", "Anh Miller là người Mỹ phải không?", "はい、そうです。", "Vâng, đúng vậy."],
    ["N も", "Cũng là N (thay は khi thông tin giống câu trước).", "ミラーさんは 会社員です。グプタさんも 会社員です。", "Anh Miller là nhân viên công ty. Anh Gupta cũng vậy."],
    ["N1 の N2", "N1 bổ nghĩa cho N2: trực thuộc, sở thuộc (công ty, trường học...).", "ミラーさんは IMCの 社員です。", "Anh Miller là nhân viên của công ty IMC."],
    ["～さん / ～人 / ～歳", "さん gắn sau tên người khác (không dùng cho mình); 人 chỉ quốc tịch; 歳 chỉ tuổi.", "テレサちゃんは 9歳です。", "Bé Teresa 9 tuổi."]
  ],
  quiz: [
    ["わたし(  ) マイク・ミラーです。", "は", "を", "に", "の", "は đánh dấu chủ đề của câu (đọc là「わ」)."],
    ["ミラーさんは 会社員です。サントスさん(  ) 会社員です。(Anh Santos cũng là nhân viên công ty)", "も", "は", "の", "を", "も = cũng. Dùng thay は khi thông tin giống câu trước."],
    ["わたしは 学生(  )。(Tôi không phải là sinh viên)", "じゃ ありません", "ありません", "じゃ ません", "じゃ です", "Phủ định danh từ: N じゃ ありません."],
    ["あの 人は だれ(  )。(Người kia là ai?)", "ですか", "ですよ", "ですも", "ですの", "Thêm か ở cuối câu để tạo câu hỏi."],
    ["ミラーさんは IMC(  ) 社員です。(…nhân viên của công ty IMC)", "の", "は", "も", "を", "N1 の N2: N1 là nơi trực thuộc của N2."],
    ["Câu nào có nghĩa「Tôi là kỹ sư」?", "わたしは エンジニアです。", "わたしは エンジニアですか。", "わたしも エンジニアじゃ ありません。", "わたしの エンジニアです。", "N1 は N2 です: khẳng định."],
    ["A: ミラーさんは 医者ですか。 B: いいえ、(  )。", "医者じゃ ありません", "医者です", "医者も ありません", "医者の ありません", "Trả lời phủ định: いいえ、N じゃ ありません."],
    ["ミラーさんは (  )ですか。…38歳です。", "何歳", "だれ", "どこ", "いくら", "何歳 (なんさい) dùng để hỏi tuổi."],
    ["「～人」gắn sau tên nước để chỉ quốc tịch. 「Người Nhật」là?", "日本人", "日本語", "日本の", "日本さん", "日本 + 人 (じん) = 日本人 (にほんじん)."]
  ]
},
{
  id: 2, title: "Chương 2",
  vocab: `
|これ|cái này (gần người nói)
|それ|cái đó (gần người nghe)
|あれ|cái kia (xa cả hai)
本|ほん|sách
辞書|じしょ|từ điển
雑誌|ざっし|tạp chí
新聞|しんぶん|báo
|ノート|vở
手帳|てちょう|sổ tay
名刺|めいし|danh thiếp
|カード|thẻ
鉛筆|えんぴつ|bút chì
|ボールペン|bút bi
鍵|かぎ|chìa khóa
時計|とけい|đồng hồ
傘|かさ|cái ô
|かばん|cặp, túi xách
|テレビ|ti vi
|カメラ|máy ảnh
|コンピューター|máy vi tính
車|くるま|ô tô
机|つくえ|cái bàn (học)
椅子|いす|cái ghế
|チョコレート|sô cô la
|コーヒー|cà phê
お土産|おみやげ|quà lưu niệm
英語|えいご|tiếng Anh
日本語|にほんご|tiếng Nhật
何|なん|cái gì
|そう|đúng vậy
|ちがいます|không phải, sai rồi
|どうぞ|xin mời
|どうも|cảm ơn (thân mật)
`,
  grammar: [
    ["これ / それ / あれ", "Đại từ chỉ vật: これ (gần người nói), それ (gần người nghe), あれ (xa cả hai). Không đi kèm danh từ.", "これは 辞書です。", "Đây là từ điển."],
    ["この N / その N / あの N", "Đứng trước danh từ để chỉ định vật/người.", "この 本は わたしのです。", "Cuốn sách này là của tôi."],
    ["そうです / そうじゃ ありません", "Trả lời câu hỏi danh từ: đúng / không đúng.", "それは 辞書ですか。…はい、そうです。", "Đó là từ điển à? — Vâng, đúng vậy."],
    ["S1 か、S2 か", "Câu hỏi lựa chọn. Trả lời bằng cách nhắc lại phương án đúng, KHÔNG dùng はい / いいえ.", "これは「9」ですか、「7」ですか。…「9」です。", "Đây là số 9 hay số 7? — Số 9."],
    ["N1 の N2 / N1 の", "N1 の N2: N2 của N1 (sở hữu, loại). N1 の đứng một mình thay cho danh từ đã nhắc (cái của N1).", "あの かばんは わたしのです。", "Cái cặp kia là của tôi."],
    ["～は ～語で 何ですか", "Hỏi cách nói một từ bằng ngôn ngữ nào đó.", "「ありがとう」は 英語で 何ですか。", "Từ「ありがとう」tiếng Anh là gì?"]
  ],
  quiz: [
    ["(  )は 本です。(Đây là sách — vật gần người nói)", "これ", "この", "あの", "その", "これ là đại từ đứng một mình; この phải đi kèm danh từ."],
    ["A: それは 何ですか。 B: (  )は 辞書です。", "これ", "それ", "あれ", "あの", "A hỏi vật ở gần B, nên B trả lời bằng これ (gần người nói)."],
    ["(  ) かさは わたしのです。(Cái ô kia — xa cả hai người)", "あの", "あれ", "これ", "それ", "Trước danh từ dùng あの, không dùng あれ."],
    ["A: これは 本ですか、雑誌ですか。 B: (  )。(Đó là tạp chí)", "雑誌です", "はい、雑誌です", "いいえ、雑誌です", "はい、そうです", "Câu hỏi lựa chọn không trả lời はい/いいえ."],
    ["これは 日本語(  ) 本です。(Đây là sách tiếng Nhật)", "の", "は", "を", "も", "N1 の N2: 日本語の 本 = sách (về) tiếng Nhật."],
    ["A: それは ミラーさんの かさですか。 B: はい、(  )。", "そうです", "そうじゃ ありません", "ちがいます", "そうですか", "Trả lời đồng ý: はい、そうです."],
    ["この 本は (  )のですか。(Cuốn sách này của ai?)", "だれ", "なん", "どこ", "いつ", "Hỏi người sở hữu dùng だれ."],
    ["「ありがとう」は 英語(  ) 何ですか。", "で", "は", "の", "を", "N語で: bằng tiếng ~."]
  ]
},
{
  id: 3, title: "Chương 3",
  vocab: `
|ここ|chỗ này
|そこ|chỗ đó
|あそこ|chỗ kia
|どこ|ở đâu
|こちら|phía này (lịch sự)
|そちら|phía đó (lịch sự)
|あちら|phía kia (lịch sự)
|どちら|phía nào, đâu (lịch sự)
教室|きょうしつ|lớp học
食堂|しょくどう|nhà ăn
事務所|じむしょ|văn phòng
会議室|かいぎしつ|phòng họp
受付|うけつけ|quầy lễ tân
部屋|へや|căn phòng
お手洗い|おてあらい|nhà vệ sinh
階段|かいだん|cầu thang
|エレベーター|thang máy
|エスカレーター|thang cuốn
自動販売機|じどうはんばいき|máy bán hàng tự động
電話|でんわ|điện thoại
国|くに|đất nước
会社|かいしゃ|công ty
|うち|nhà
靴|くつ|giày
|ネクタイ|cà vạt
売り場|うりば|quầy bán hàng
地下|ちか|tầng hầm
階|かい|tầng
何階|なんがい|tầng mấy
円|えん|yên (Nhật)
|いくら|bao nhiêu tiền
百|ひゃく|trăm
千|せん|nghìn
万|まん|vạn (mười nghìn)
`,
  grammar: [
    ["ここ / そこ / あそこ / どこ", "Chỉ nơi chốn: ở đây / ở đó / ở kia / ở đâu.", "ここは 食堂です。", "Đây là nhà ăn."],
    ["N は địa điểm です", "Nói vị trí của người / vật.", "トイレは あそこです。", "Nhà vệ sinh ở đằng kia."],
    ["こちら / そちら / あちら / どちら", "Cách nói lịch sự của ここ/そこ/あそこ/どこ; còn chỉ phương hướng. どちら còn hỏi nước, công ty, trường.", "お国は どちらですか。", "Bạn đến từ nước nào ạ?"],
    ["N1 の N2 (xuất xứ)", "N1 là nước / công ty sản xuất, N2 là sản phẩm.", "これは 日本の 車です。", "Đây là xe của Nhật."],
    ["いくら", "Hỏi giá tiền.", "この ワインは いくらですか。…3,000円です。", "Chai rượu này bao nhiêu tiền? — 3.000 yên."],
    ["Số lớn & ～階", "百, 千, 万 có biến âm: 300 = さんびゃく, 600 = ろっぴゃく, 800 = はっぴゃく, 3000 = さんぜん, 8000 = はっせん. ～階: 1階 = いっかい, 3階 = さんがい.", "会議室は 3階です。", "Phòng họp ở tầng 3."]
  ],
  quiz: [
    ["電話は (  )です。(Điện thoại ở chỗ kia — xa cả hai)", "あそこ", "ここ", "そこ", "どこ", "あそこ = chỗ kia (xa cả người nói và người nghe)."],
    ["食堂は (  )ですか。(Nhà ăn ở đâu?)", "どこ", "だれ", "なに", "いくら", "Hỏi địa điểm dùng どこ."],
    ["この ワインは (  )ですか。(Chai rượu này bao nhiêu tiền?)", "いくら", "どこ", "だれ", "なんさい", "Hỏi giá dùng いくら."],
    ["「こちら」là cách nói lịch sự của từ nào?", "ここ", "そこ", "あそこ", "どこ", "こちら ← ここ, そちら ← そこ, あちら ← あそこ, どちら ← どこ."],
    ["これは イタリア(  ) くつです。(Đây là giày của Ý)", "の", "は", "で", "を", "N1 の N2 chỉ xuất xứ."],
    ["会議室は 3(  )です。(Phòng họp ở tầng 3)", "階", "円", "時", "人", "～階 (かい) là tầng."],
    ["このネクタイは 3,000(  )です。", "円", "階", "時", "人", "～円 (えん) là đơn vị tiền Nhật."],
    ["「300円」đọc là gì?", "さんびゃくえん", "さんひゃくえん", "さんぴゃくえん", "さんびゃくいん", "300 = さんびゃく (biến âm び)."]
  ]
},
{
  id: 4, title: "Chương 4",
  vocab: `
起きます|おきます|thức dậy
寝ます|ねます|ngủ
働きます|はたらきます|làm việc
休みます|やすみます|nghỉ ngơi
勉強します|べんきょうします|học
終わります|おわります|kết thúc
銀行|ぎんこう|ngân hàng
郵便局|ゆうびんきょく|bưu điện
図書館|としょかん|thư viện
美術館|びじゅつかん|bảo tàng mỹ thuật
今|いま|bây giờ
時|じ|giờ
分|ふん/ぷん|phút
半|はん|rưỡi
何時|なんじ|mấy giờ
午前|ごぜん|buổi sáng (AM)
午後|ごご|buổi chiều (PM)
朝|あさ|buổi sáng
昼|ひる|buổi trưa
晩|ばん|buổi tối
昨日|きのう|hôm qua
今日|きょう|hôm nay
明日|あした|ngày mai
毎日|まいにち|mỗi ngày
毎朝|まいあさ|mỗi sáng
休み|やすみ|ngày nghỉ
月曜日|げつようび|thứ Hai
火曜日|かようび|thứ Ba
水曜日|すいようび|thứ Tư
木曜日|もくようび|thứ Năm
金曜日|きんようび|thứ Sáu
土曜日|どようび|thứ Bảy
日曜日|にちようび|Chủ nhật
番号|ばんごう|số, số hiệu
`,
  grammar: [
    ["今 ～時 ～分です", "Nói giờ. 4時 = よじ, 7時 = しちじ, 9時 = くじ. Phút: 1 = いっぷん, 2 = にふん, 3 = さんぷん, 4 = よんぷん, 5 = ごふん, 6 = ろっぷん, 8 = はっぷん, 10 = じゅっぷん.", "今 4時 5分です。", "Bây giờ là 4 giờ 5 phút."],
    ["V ます / V ません", "Thì hiện tại / tương lai: khẳng định ～ます, phủ định ～ません.", "毎朝 6時に 起きます。", "Mỗi sáng tôi dậy lúc 6 giờ."],
    ["V ました / V ませんでした", "Thì quá khứ khẳng định / phủ định.", "昨日 勉強しませんでした。", "Hôm qua tôi đã không học."],
    ["N(thời điểm) に V", "Trợ từ に đi sau thời điểm cụ thể (giờ, ngày, thứ). Không dùng với 今日, 毎朝, 昨日, 今...", "7時に 寝ます。", "Tôi ngủ lúc 7 giờ."],
    ["N1 から N2 まで", "Từ N1 đến N2 (thời gian / nơi chốn).", "銀行は 9時から 3時までです。", "Ngân hàng làm việc từ 9 giờ đến 3 giờ."],
    ["N1 と N2", "N1 và N2 (nối danh từ). Cuối câu thêm ね để xác nhận, đồng cảm.", "休みは 土曜日と 日曜日です。", "Ngày nghỉ là thứ Bảy và Chủ nhật."]
  ],
  quiz: [
    ["わたしは 毎朝 6時(  ) 起きます。", "に", "で", "を", "へ", "Thời điểm cụ thể (giờ) + に."],
    ["昨日は 勉強(  )。(Hôm qua tôi đã không học)", "しませんでした", "しません", "しました", "しないでした", "Quá khứ phủ định: ～ませんでした."],
    ["銀行は 9時(  ) 3時(  )です。", "から … まで", "まで … から", "に … まで", "から … に", "N1 から N2 まで = từ N1 đến N2."],
    ["日曜日は 働き(  )。(Chủ nhật tôi không làm việc)", "ません", "ませんでした", "ました", "ない", "Phủ định hiện tại / tương lai: ～ません."],
    ["「4時5分」đọc là gì?", "よじ ごふん", "よじ ごぷん", "しじ ごふん", "よじ ごっぷん", "4時 = よじ; 5分 = ごふん."],
    ["「起きます」ở dạng quá khứ phủ định là?", "起きませんでした", "起きません", "起きました", "起きなかった", "～ます → ～ませんでした."],
    ["昨日が 火曜日です。今日は (  )です。", "水曜日", "木曜日", "月曜日", "金曜日", "火 → 水: hôm nay là thứ Tư."],
    ["昼休みは 12時(  ) 1時までです。", "から", "に", "を", "で", "Bắt đầu từ ~: から."]
  ]
},
{
  id: 5, title: "Chương 5",
  vocab: `
行きます|いきます|đi
来ます|きます|đến
帰ります|かえります|về
学校|がっこう|trường học
|スーパー|siêu thị
駅|えき|nhà ga
飛行機|ひこうき|máy bay
船|ふね|thuyền, tàu thủy
電車|でんしゃ|tàu điện
地下鉄|ちかてつ|tàu điện ngầm
新幹線|しんかんせん|tàu Shinkansen
|バス|xe buýt
|タクシー|taxi
自転車|じてんしゃ|xe đạp
歩いて|あるいて|đi bộ
友達|ともだち|bạn bè
彼|かれ|anh ấy, bạn trai
彼女|かのじょ|cô ấy, bạn gái
家族|かぞく|gia đình
一人で|ひとりで|một mình
先週|せんしゅう|tuần trước
今週|こんしゅう|tuần này
来週|らいしゅう|tuần sau
先月|せんげつ|tháng trước
今月|こんげつ|tháng này
来月|らいげつ|tháng sau
去年|きょねん|năm ngoái
今年|ことし|năm nay
来年|らいねん|năm sau
|いつ|khi nào
誕生日|たんじょうび|sinh nhật
1日|ついたち|ngày mùng 1
2日|ふつか|ngày mùng 2
3日|みっか|ngày mùng 3
4日|よっか|ngày mùng 4
5日|いつか|ngày mùng 5
8日|ようか|ngày mùng 8
10日|とおか|ngày mùng 10
20日|はつか|ngày 20
`,
  grammar: [
    ["N(nơi) へ 行きます / 来ます / 帰ります", "Trợ từ へ (đọc là「え」) chỉ hướng di chuyển.", "わたしは 京都へ 行きます。", "Tôi đi Kyoto."],
    ["どこ[へ]も 行きません", "Không đi đâu cả (phủ định hoàn toàn).", "昨日 どこへも 行きませんでした。", "Hôm qua tôi không đi đâu cả."],
    ["N(phương tiện) で 行きます", "Trợ từ で chỉ phương tiện. Đi bộ dùng 歩いて (không có で).", "電車で 行きます。", "Tôi đi bằng tàu điện.", "駅から 歩いて 帰ります。", "Tôi đi bộ từ ga về."],
    ["N(người) と V", "Làm gì cùng với ai. Một mình: 一人で.", "友達と 日本へ 来ました。", "Tôi đã đến Nhật cùng bạn."],
    ["いつ", "Hỏi thời điểm (không dùng に sau いつ). Ngày tháng: ～月 ～日.", "誕生日は いつですか。…3月3日です。", "Sinh nhật bạn khi nào? — Ngày 3 tháng 3."],
    ["～よ", "Cuối câu: nhấn mạnh, thông báo điều người nghe chưa biết.", "この 電車は 大阪へ 行きますよ。", "Tàu này đi Osaka đấy."]
  ],
  quiz: [
    ["わたしは 会社(  ) 行きます。", "へ", "を", "で", "が", "Hướng di chuyển: へ (đọc là え)."],
    ["電車(  ) 学校へ 行きます。", "で", "を", "に", "と", "Phương tiện: N で."],
    ["駅まで (  ) 行きます。(Đi bộ đến ga)", "歩いて", "歩きて", "歩きます", "歩いに", "Đi bộ: 歩いて (không dùng で)."],
    ["友達(  ) 日本へ 来ました。(Đến Nhật cùng bạn)", "と", "で", "を", "も", "Cùng với người: N と."],
    ["昨日は どこ(  ) 行きませんでした。(Hôm qua không đi đâu cả)", "へも", "を", "は", "に", "どこへも + phủ định = không đi đâu cả."],
    ["誕生日は (  )ですか。(Sinh nhật khi nào?)", "いつ", "どこ", "だれ", "なに", "Hỏi thời điểm: いつ."],
    ["「3月3日」đọc là gì?", "さんがつ みっか", "さんがつ さんにち", "さんがつ みか", "さんがつ さんか", "3日 = みっか (ngày đặc biệt)."],
    ["一人(  ) 日本へ 行きます。(Đi Nhật một mình)", "で", "と", "を", "に", "一人で = một mình."]
  ]
},
{
  id: 6, title: "Chương 6",
  vocab: `
食べます|たべます|ăn
飲みます|のみます|uống
吸います|すいます|hút (thuốc)
見ます|みます|xem, nhìn
聞きます|ききます|nghe, hỏi
読みます|よみます|đọc
書きます|かきます|viết, vẽ
買います|かいます|mua
撮ります|とります|chụp (ảnh)
|します|làm
会います|あいます|gặp (bạn bè)
ご飯|ごはん|cơm, bữa ăn
朝ご飯|あさごはん|bữa sáng
昼ご飯|ひるごはん|bữa trưa
晩ご飯|ばんごはん|bữa tối
|パン|bánh mì
卵|たまご|trứng
肉|にく|thịt
魚|さかな|cá
野菜|やさい|rau
果物|くだもの|trái cây
水|みず|nước
お茶|おちゃ|trà
牛乳|ぎゅうにゅう|sữa bò
|ジュース|nước ép
|ビール|bia
お酒|おさけ|rượu
映画|えいが|phim
手紙|てがみ|thư
写真|しゃしん|ảnh
店|みせ|cửa hàng
庭|にわ|vườn
宿題|しゅくだい|bài tập về nhà
お花見|おはなみ|ngắm hoa anh đào
一緒に|いっしょに|cùng nhau
|ちょっと|một chút
時々|ときどき|thỉnh thoảng
|いつも|luôn luôn
`,
  grammar: [
    ["N を V (tha động từ)", "Trợ từ を chỉ đối tượng của hành động.", "わたしは パンを 食べます。", "Tôi ăn bánh mì."],
    ["N(nơi) で V", "Trợ từ で chỉ nơi diễn ra hành động.", "図書館で 本を 読みます。", "Tôi đọc sách ở thư viện."],
    ["V ませんか", "Rủ rê, mời mọc một cách lịch sự.", "いっしょに 映画を 見ませんか。", "Cùng xem phim không?"],
    ["V ましょう", "Đề nghị cùng làm / đồng ý với lời mời.", "ええ、見ましょう。", "Vâng, cùng xem nào."],
    ["何も V ません", "Không ... gì cả (何も + phủ định). Hỏi: 何を ～ますか.", "昨日 何も 食べませんでした。", "Hôm qua tôi không ăn gì cả."],
    ["N を します", "します = làm / chơi khi đi với danh từ (môn thể thao, trò chơi...).", "日曜日 サッカーを します。", "Chủ nhật tôi chơi bóng đá."]
  ],
  quiz: [
    ["毎朝 パン(  ) 食べます。", "を", "が", "に", "へ", "Đối tượng của hành động: を."],
    ["図書館(  ) 本を 読みます。(Đọc sách ở thư viện)", "で", "を", "へ", "と", "Nơi diễn ra hành động: で."],
    ["いっしょに 映画を 見(  )。(Cùng xem phim không?)", "ませんか", "ますか", "ません", "ました", "Rủ rê: V ませんか."],
    ["A: いっしょに 昼ご飯を 食べませんか。 B: ええ、(  )。", "食べましょう", "食べません", "食べますか", "食べました", "Đồng ý lời mời: V ましょう."],
    ["昨日 何(  ) 食べませんでした。(Hôm qua không ăn gì cả)", "も", "を", "が", "に", "何も + phủ định = không ... gì cả."],
    ["駅(  ) 友達に 会いました。(Gặp bạn ở ga)", "で", "を", "へ", "が", "Nơi gặp gỡ (hành động): で."],
    ["音楽を (  )。(Nghe nhạc)", "聞きます", "見ます", "読みます", "飲みます", "音楽を 聞きます."],
    ["ちょっと 休み(  )。(Nghỉ một chút nào)", "ましょう", "ません", "ませんか", "ました", "Đề nghị cùng làm: V ましょう."]
  ]
},
{
  id: 7, title: "Chương 7",
  vocab: `
切ります|きります|cắt
送ります|おくります|gửi
|あげます|cho, tặng
|もらいます|nhận
貸します|かします|cho mượn
借ります|かります|mượn
教えます|おしえます|dạy, chỉ
習います|ならいます|học (từ ai đó)
掛けます|かけます|gọi (điện thoại)
手|て|tay
箸|はし|đũa
|スプーン|thìa
|ナイフ|dao ăn
|フォーク|nĩa
|はさみ|kéo
|パソコン|máy tính cá nhân
|ファクス|máy fax
消しゴム|けしゴム|cục tẩy
紙|かみ|giấy
花|はな|hoa
|シャツ|áo sơ mi
|プレゼント|quà tặng
荷物|にもつ|hành lý, đồ đạc
お金|おかね|tiền
切符|きっぷ|vé (tàu, xe)
|クリスマス|Giáng sinh
父|ちち|bố (của mình)
母|はは|mẹ (của mình)
お父さん|おとうさん|bố (người khác)
お母さん|おかあさん|mẹ (người khác)
|もう|đã, rồi
|まだ|chưa
|これから|từ bây giờ
`,
  grammar: [
    ["N(công cụ) で V", "Trợ từ で chỉ phương tiện, dụng cụ, ngôn ngữ: bằng ~.", "はしで ご飯を 食べます。", "Tôi ăn cơm bằng đũa."],
    ["N(người) に あげます", "Cho / tặng ai cái gì. Tương tự: 貸します, 教えます, 送ります, 電話を かけます.", "わたしは 友達に 花を あげました。", "Tôi đã tặng hoa cho bạn."],
    ["N(người) に もらいます", "Nhận từ ai (に hoặc から). Tương tự: 借ります, 習います.", "わたしは 母に 本を もらいました。", "Tôi được mẹ cho một cuốn sách."],
    ["N1(người) は N2(người) に N3 を V", "Cấu trúc ba thành phần: người cho — người nhận — vật.", "ミラーさんは 木村さんに 本を 貸しました。", "Anh Miller đã cho chị Kimura mượn sách."],
    ["もう V ました", "Đã làm ... rồi. Phủ định: いいえ、まだです。", "もう 昼ご飯を 食べましたか。…いいえ、まだです。", "Bạn đã ăn trưa chưa? — Chưa."]
  ],
  quiz: [
    ["鉛筆(  ) 手紙を 書きます。(Viết thư bằng bút chì)", "で", "を", "に", "と", "Dụng cụ / phương tiện: で."],
    ["友達(  ) 花を あげました。(Tặng hoa cho bạn)", "に", "を", "で", "が", "Người nhận của あげます: に."],
    ["友達(  ) 本を もらいました。(Nhận sách từ bạn)", "から", "で", "を", "へ", "Người cho trong もらいます: に hoặc から."],
    ["A: もう 昼ご飯を 食べましたか。 B: いいえ、(  )です。", "まだ", "もう", "いつも", "よく", "Chưa làm: いいえ、まだです."],
    ["先生は わたし(  ) 英語を 教えました。", "に", "を", "で", "へ", "Người được dạy: に."],
    ["A: もう 宿題を しましたか。 B: はい、(  ) しました。", "もう", "まだ", "ぜんぜん", "あまり", "Đã làm rồi: はい、もう V ました."],
    ["友達に お金を (  )。(Tôi cho bạn mượn tiền)", "貸しました", "借りました", "もらいました", "あげました", "貸します = cho mượn; 借ります = mượn."],
    ["Câu nào đúng:「Tôi đã tặng hoa cho Mary」?", "わたしは メリーさんに 花を あげました。", "わたしは メリーさんで 花を あげました。", "わたしは メリーさんを 花に あげました。", "わたしに メリーさんは 花を あげました。", "Người nhận + に, vật + を."]
  ]
},
{
  id: 8, title: "Chương 8",
  vocab: `
|ハンサム|đẹp trai (な)
|きれい|đẹp, sạch sẽ (な)
静か|しずか|yên tĩnh (な)
|にぎやか|náo nhiệt (な)
有名|ゆうめい|nổi tiếng (な)
親切|しんせつ|tốt bụng (な)
元気|げんき|khỏe (な)
暇|ひま|rảnh rỗi (な)
便利|べんり|tiện lợi (な)
|すてき|tuyệt vời (な)
大きい|おおきい|to, lớn (い)
小さい|ちいさい|nhỏ (い)
新しい|あたらしい|mới (い)
古い|ふるい|cũ (い)
|いい|tốt (い)
悪い|わるい|xấu, tệ (い)
暑い|あつい|nóng (thời tiết) (い)
熱い|あつい|nóng (đồ vật) (い)
寒い|さむい|lạnh (thời tiết) (い)
冷たい|つめたい|lạnh (đồ vật) (い)
難しい|むずかしい|khó (い)
易しい|やさしい|dễ (い)
高い|たかい|cao, đắt (い)
安い|やすい|rẻ (い)
低い|ひくい|thấp (い)
面白い|おもしろい|thú vị (い)
|おいしい|ngon (い)
忙しい|いそがしい|bận (い)
楽しい|たのしい|vui (い)
白い|しろい|trắng (い)
黒い|くろい|đen (い)
赤い|あかい|đỏ (い)
青い|あおい|xanh dương (い)
桜|さくら|hoa anh đào
山|やま|núi
町|まち|thị trấn, phố
仕事|しごと|công việc
|とても|rất
|あまり|không ... lắm
`,
  grammar: [
    ["N は い-Adj / な-Adj です", "Tính từ làm vị ngữ. い-Adj kết thúc bằng い; な-Adj bỏ な khi làm vị ngữ.", "桜は きれいです。", "Hoa anh đào đẹp.", "富士山は 高いです。", "Núi Phú Sĩ cao."],
    ["Adj + N", "い-Adj + N; な-Adj + な + N.", "きれいな 町です。", "Là một thành phố đẹp.", "高い 山です。", "Là một ngọn núi cao."],
    ["Phủ định của tính từ", "い-Adj: ～い → ～くないです. な-Adj: ～じゃ ありません. Riêng いい → よくないです.", "この 本は 面白くないです。", "Cuốn sách này không thú vị.", "あの 人は 親切じゃ ありません。", "Người đó không tốt bụng."],
    ["とても / あまり", "とても + Adj: rất ~; あまり + Adj phủ định: không ~ lắm.", "この 料理は とても おいしいです。", "Món này rất ngon."],
    ["S1 が、S2", "Nhưng (nối hai vế trái ngược).", "日本語は 難しいですが、面白いです。", "Tiếng Nhật khó nhưng thú vị."],
    ["どう / どんな", "N は どうですか: hỏi cảm tưởng. どんな N: hỏi tính chất của N.", "日本の 生活は どうですか。", "Cuộc sống ở Nhật thế nào?"]
  ],
  quiz: [
    ["富士山は (  ) 山です。(Núi cao)", "高い", "高く", "高いな", "高な", "い-Adj đứng trực tiếp trước danh từ."],
    ["京都は (  ) 町です。(Kyoto là thành phố đẹp)", "きれいな", "きれいい", "きれい", "きれいの", "な-Adj + な + N."],
    ["この 本は 面白(  )。(Cuốn sách này không thú vị)", "くないです", "じゃ ないです", "くないでした", "じゃ ありません", "い-Adj phủ định: bỏ い + くないです."],
    ["あの 人は 親切(  )。(Người đó không tốt bụng)", "じゃ ありません", "くないです", "くありません", "ではない", "な-Adj phủ định: じゃ ありません."],
    ["日本語は 難しいです(  )、面白いです。", "が", "を", "に", "で", "が (nhưng) nối hai vế trái ngược."],
    ["東京は (  )ですか。(Tokyo thế nào?)", "どう", "どこ", "だれ", "どれ", "Hỏi cảm tưởng: どうですか."],
    ["この 料理は (  ) おいしくないです。(Món này không ngon lắm)", "あまり", "とても", "いつも", "たくさん", "あまり + phủ định = không ~ lắm."],
    ["「いい」ở dạng phủ định lịch sự là?", "よくないです", "いくないです", "いいくないです", "よいじゃ ありません", "いい → よくないです (bất quy tắc)."]
  ]
},
{
  id: 9, title: "Chương 9",
  vocab: `
分かります|わかります|hiểu
|あります|có (đồ vật, sự việc)
好き|すき|thích (な)
嫌い|きらい|ghét (な)
上手|じょうず|giỏi (な)
下手|へた|kém (な)
料理|りょうり|món ăn, nấu ăn
飲み物|のみもの|đồ uống
|スポーツ|thể thao
野球|やきゅう|bóng chày
|ダンス|khiêu vũ
音楽|おんがく|âm nhạc
歌|うた|bài hát
絵|え|tranh
字|じ|chữ
漢字|かんじ|chữ Hán
|ひらがな|chữ Hiragana
|かたかな|chữ Katakana
細かいお金|こまかいおかね|tiền lẻ
|チケット|vé (xem phim, hòa nhạc)
時間|じかん|thời gian
用事|ようじ|việc bận
約束|やくそく|cuộc hẹn, lời hứa
|アルバイト|việc làm thêm
ご主人|ごしゅじん|chồng (người khác)
夫|おっと|chồng (của mình)
奥さん|おくさん|vợ (người khác)
妻|つま|vợ (của mình)
子ども|こども|con cái, trẻ em
|よく|thường, rõ
|だいたい|đại khái, hầu hết
|たくさん|nhiều
少し|すこし|một chút
全然|ぜんぜん|hoàn toàn không (+ phủ định)
早く|はやく|sớm, nhanh
|どうして|tại sao
残念|ざんねん|đáng tiếc (な)
`,
  grammar: [
    ["N が あります / わかります", "Chủ thể của あります, わかります đi với が.", "わたしは 日本語が わかります。", "Tôi hiểu tiếng Nhật."],
    ["N が 好きです / 嫌いです / 上手です / 下手です", "Sở thích, năng lực: đối tượng đi với が.", "わたしは 料理が 好きです。", "Tôi thích nấu ăn."],
    ["どんな N", "Hỏi loại, kiểu của danh từ.", "どんな スポーツが 好きですか。", "Bạn thích môn thể thao nào?"],
    ["Phó từ chỉ mức độ", "よく > だいたい > 少し > あまり > ぜんぜん (hai từ cuối đi với phủ định).", "英語が 少し わかります。", "Tôi hiểu một chút tiếng Anh."],
    ["S1 から、S2", "Vì S1 nên S2 (nguyên nhân đặt trước から).", "時間が ありませんから、行きません。", "Vì không có thời gian nên tôi không đi."],
    ["どうして", "Hỏi lý do: どうして ～か → ～から です.", "どうして 来ませんでしたか。…用事が ありましたから。", "Sao bạn không đến? — Vì tôi có việc."]
  ],
  quiz: [
    ["わたしは 音楽(  ) 好きです。", "が", "を", "に", "で", "好きです đi với が."],
    ["田中さんは 日本語(  ) わかります。", "が", "を", "に", "で", "わかります đi với が."],
    ["わたしは 料理が (  )。(Tôi nấu ăn giỏi)", "上手です", "上手ます", "上手がです", "上手なです", "な-Adj làm vị ngữ: bỏ な, thêm です."],
    ["英語が (  ) わかりません。(Hoàn toàn không hiểu tiếng Anh)", "ぜんぜん", "とても", "たくさん", "だいたい", "ぜんぜん + phủ định."],
    ["時間が ありません(  )、行きません。(Vì không có thời gian nên không đi)", "から", "が", "を", "も", "S1 から、S2 = vì S1 nên S2."],
    ["A: (  ) 昨日 パーティーに 来ませんでしたか。 B: 用事が ありましたから。", "どうして", "どこ", "だれ", "いつ", "Hỏi lý do: どうして."],
    ["(  ) 音楽が 好きですか。(Bạn thích loại nhạc nào?)", "どんな", "どう", "いつ", "だれ", "どんな + N: loại N nào."],
    ["Câu nào đúng ngữ pháp:「Tôi hiểu một chút tiếng Nhật」?", "日本語が すこし わかります。", "日本語を すこし わかります。", "日本語に すこし わかります。", "日本語で すこし わかります。", "わかります đi với が."]
  ]
},
{
  id: 10, title: "Chương 10",
  vocab: `
|います|có, ở (người, động vật)
男の人|おとこのひと|người đàn ông
女の人|おんなのひと|người phụ nữ
男の子|おとこのこ|bé trai
女の子|おんなのこ|bé gái
犬|いぬ|con chó
猫|ねこ|con mèo
木|き|cây
箱|はこ|cái hộp
冷蔵庫|れいぞうこ|tủ lạnh
|テーブル|cái bàn
|ベッド|giường
棚|たな|cái kệ, giá
|ドア|cửa ra vào
窓|まど|cửa sổ
|ポスト|hòm thư
|ビル|tòa nhà
公園|こうえん|công viên
喫茶店|きっさてん|quán cà phê
本屋|ほんや|hiệu sách
乗り場|のりば|bến xe, ga đón
県|けん|tỉnh
上|うえ|trên
下|した|dưới
前|まえ|trước
後ろ|うしろ|sau
右|みぎ|phải
左|ひだり|trái
中|なか|trong
外|そと|ngoài
隣|となり|bên cạnh
近く|ちかく|gần, vùng lân cận
間|あいだ|giữa
|いろいろ|nhiều loại (な)
`,
  grammar: [
    ["N が あります / います", "あります: vật, cây cối, sự việc (không tự di chuyển); います: người, động vật.", "机の 上に 本が あります。", "Trên bàn có sách.", "庭に 犬が います。", "Trong vườn có con chó."],
    ["N1 は N2(nơi) に あります / います", "Nói vị trí của N1 (đã biết).", "ミラーさんは 事務所に います。", "Anh Miller đang ở văn phòng."],
    ["N1 の + từ chỉ vị trí", "上, 下, 前, 後ろ, 右, 左, 中, 外, 隣, 近く, 間 đi sau の.", "銀行は 郵便局の 隣に あります。", "Ngân hàng nằm cạnh bưu điện."],
    ["N1 や N2 (など)", "Liệt kê không đầy đủ: N1, N2 (và những thứ khác).", "箱の 中に 手紙や 写真が あります。", "Trong hộp có thư, ảnh (v.v.)."],
    ["だれも / 何も ～ません", "Không có ai / không có gì (phủ định hoàn toàn).", "部屋に だれも いません。", "Trong phòng không có ai."]
  ],
  quiz: [
    ["机の 上に 本が (  )。(Trên bàn có sách)", "あります", "います", "きます", "ります", "Vật vô tri: あります."],
    ["庭に 犬が (  )。(Trong vườn có con chó)", "います", "あります", "ます", "ありません", "Động vật: います."],
    ["テーブルの (  )に 猫が います。(Dưới gầm bàn có con mèo)", "下", "上", "前", "外", "下 (した) = dưới."],
    ["駅の (  )に 銀行が あります。(Cạnh ga có ngân hàng)", "隣", "下", "中", "後ろ", "隣 (となり) = bên cạnh."],
    ["机の 上に 本(  ) ノートが あります。(Trên bàn có sách, vở...)", "や", "に", "は", "を", "N1 や N2: liệt kê không đầy đủ."],
    ["ミラーさんは 事務所(  ) います。", "に", "を", "で", "が", "Nơi tồn tại của います: に."],
    ["Câu nào đúng:「Ngân hàng ở bên phải bưu điện」?", "銀行は 郵便局の 右に あります。", "銀行は 郵便局の 右で あります。", "銀行は 郵便局を 右に あります。", "銀行が 郵便局の 右に います。", "N1 の + vị trí + に あります."],
    ["部屋に だれも (  )。(Trong phòng không có ai)", "いません", "ありません", "いりません", "いなかった", "Người: います → いません."]
  ]
},
{
  id: 11, title: "Chương 11",
  vocab: `
一つ|ひとつ|1 cái
二つ|ふたつ|2 cái
三つ|みっつ|3 cái
四つ|よっつ|4 cái
五つ|いつつ|5 cái
六つ|むっつ|6 cái
七つ|ななつ|7 cái
八つ|やっつ|8 cái
九つ|ここのつ|9 cái
十|とお|10 cái
|いくつ|mấy cái, mấy tuổi
一人|ひとり|1 người
二人|ふたり|2 người
|りんご|táo
|みかん|quýt
|サンドイッチ|bánh sandwich
|カレー|cà ri
|アイスクリーム|kem
切手|きって|tem
|はがき|bưu thiếp
封筒|ふうとう|phong bì
両親|りょうしん|bố mẹ
兄弟|きょうだい|anh chị em
兄|あに|anh trai (của mình)
姉|あね|chị gái (của mình)
弟|おとうと|em trai (của mình)
妹|いもうと|em gái (của mình)
外国|がいこく|nước ngoài
週間|しゅうかん|~ tuần (thời lượng)
か月|かげつ|~ tháng (thời lượng)
年|ねん|~ năm
|ぐらい|khoảng
|どのくらい|bao lâu, khoảng bao nhiêu
全部で|ぜんぶで|tổng cộng
|みんな|mọi người
|だけ|chỉ
`,
  grammar: [
    ["Số đếm ひとつ ～ とお", "1 cái = ひとつ ... 10 cái = とお. Từ 11 trở đi dùng số thường + 個.", "りんごを 3つ 買いました。", "Tôi đã mua 3 quả táo."],
    ["Đếm người, máy móc, vật mỏng", "～人 (người: 一人, 二人, 三人...), ～台 (máy, xe), ～枚 (giấy, tem, áo).", "切手を 5枚 ください。", "Cho tôi 5 con tem."],
    ["Số lượng + V", "Từ chỉ số lượng đặt ngay trước động từ, không có trợ từ.", "教室に 学生が 10人 います。", "Trong lớp có 10 học sinh."],
    ["～ぐらい / どのくらい", "Khoảng ~; hỏi thời gian / số lượng.", "東京から 京都まで 2時間半ぐらい かかります。", "Từ Tokyo đến Kyoto mất khoảng 2 tiếng rưỡi."],
    ["N(thời gian) に ～回", "Tần suất: trong một khoảng thời gian có bao nhiêu lần.", "1週間に 2回 テニスを します。", "Một tuần tôi chơi tennis 2 lần."],
    ["N だけ", "Chỉ N.", "休みは 日曜日だけです。", "Ngày nghỉ chỉ có Chủ nhật."]
  ],
  quiz: [
    ["りんごを (  ) 買いました。(Mua 3 quả táo)", "三つ", "三枚", "三台", "三本", "Vật nhỏ, không có đơn vị riêng: 〜つ."],
    ["教室に 学生が (  ) います。(Có 5 học sinh)", "五人", "五つ", "五台", "五枚", "Người: ～人."],
    ["切手を (  ) ください。(Cho tôi 2 con tem)", "二枚", "二つ", "二人", "二台", "Vật mỏng, dẹt: ～枚."],
    ["家族は (  )ですか。(Gia đình bạn có mấy người?)", "何人", "いくつ", "何枚", "何台", "Hỏi số người: 何人."],
    ["東京から 大阪まで 2時間半(  ) かかります。(Khoảng 2 tiếng rưỡi)", "ぐらい", "ごろ", "まで", "から", "ぐらい = khoảng (lượng); ごろ = khoảng (thời điểm)."],
    ["1か月(  ) 2回 映画を 見ます。(Một tháng xem phim 2 lần)", "に", "を", "で", "が", "Khoảng thời gian + に + số lần."],
    ["「1人」đọc là gì?", "ひとり", "いちにん", "ひとにん", "いちり", "1人 = ひとり, 2人 = ふたり (đọc đặc biệt)."],
    ["「8つ」đọc là gì?", "やっつ", "はちつ", "ようつ", "やつつ", "8つ = やっつ."]
  ]
},
{
  id: 12, title: "Chương 12",
  vocab: `
簡単|かんたん|đơn giản (な)
近い|ちかい|gần (い)
遠い|とおい|xa (い)
速い|はやい|nhanh (い)
遅い|おそい|chậm, muộn (い)
多い|おおい|nhiều (い)
少ない|すくない|ít (い)
暖かい|あたたかい|ấm áp (い)
涼しい|すずしい|mát mẻ (い)
甘い|あまい|ngọt (い)
辛い|からい|cay (い)
重い|おもい|nặng (い)
軽い|かるい|nhẹ (い)
季節|きせつ|mùa
春|はる|mùa xuân
夏|なつ|mùa hè
秋|あき|mùa thu
冬|ふゆ|mùa đông
天気|てんき|thời tiết
雨|あめ|mưa
雪|ゆき|tuyết
曇り|くもり|trời nhiều mây
|ホテル|khách sạn
空港|くうこう|sân bay
海|うみ|biển
世界|せかい|thế giới
|パーティー|bữa tiệc
祭り|まつり|lễ hội
試験|しけん|kỳ thi
刺身|さしみ|sashimi
|すし|sushi
|てんぷら|tempura
紅葉|もみじ|lá đỏ mùa thu
|どちらも|cả hai
|ずっと|hơn hẳn, suốt
初めて|はじめて|lần đầu tiên
一番|いちばん|nhất
`,
  grammar: [
    ["Quá khứ của câu danh từ & な-Adj", "Khẳng định: ～でした. Phủ định: ～じゃ ありませんでした.", "昨日は 雨でした。", "Hôm qua trời mưa."],
    ["Quá khứ của い-Adj", "Khẳng định: ～かったです. Phủ định: ～くなかったです / ～く ありませんでした. いい → よかったです.", "旅行は 楽しかったです。", "Chuyến du lịch đã rất vui."],
    ["N1 は N2 より Adj", "N1 ... hơn N2.", "東京は 大阪より 人が 多いです。", "Tokyo đông người hơn Osaka."],
    ["N1 と N2 と どちらが Adj ですか", "So sánh hai đối tượng. Trả lời: N1 / N2 の ほうが Adj です.", "犬と 猫と どちらが 好きですか。…猫のほうが 好きです。", "Chó và mèo, bạn thích con nào hơn? — Tôi thích mèo hơn."],
    ["N1[の中]で ～が いちばん Adj", "So sánh nhất trong một nhóm. Hỏi bằng 何, どこ, だれ, いつ.", "1年で いつが いちばん 寒いですか。…2月が いちばん 寒いです。", "Một năm, khi nào lạnh nhất? — Tháng 2 lạnh nhất."],
    ["どちらも", "Cả hai (đều). Với phủ định: cả hai đều không.", "どちらも 好きです。", "Tôi thích cả hai."]
  ],
  quiz: [
    ["昨日は 雨(  )。(Hôm qua trời mưa)", "でした", "ました", "かったです", "じゃ ありません", "Câu danh từ ở quá khứ: ～でした."],
    ["昨日の パーティーは 楽し(  )。(Bữa tiệc hôm qua đã vui)", "かったです", "でした", "くないです", "かったでした", "い-Adj quá khứ: bỏ い + かったです."],
    ["旅行は 楽しく(  )。(Chuyến đi đã không vui)", "ありませんでした", "なかったでした", "じゃ ありませんでした", "ませんでした", "い-Adj quá khứ phủ định: ～く ありませんでした."],
    ["東京は 大阪(  ) 人が 多いです。(Tokyo đông người hơn Osaka)", "より", "から", "まで", "だけ", "N1 は N2 より Adj."],
    ["犬と 猫と (  )が 好きですか。(Chó và mèo, thích con nào hơn?)", "どちら", "どれ", "どこ", "いつ", "So sánh hai đối tượng: どちら."],
    ["果物(  ) 何が いちばん 好きですか。", "の中で", "の中に", "の中を", "の中は", "Trong phạm vi nhóm: N の中で."],
    ["私は 犬より 猫(  ) 好きです。(Tôi thích mèo hơn chó)", "のほうが", "のなかで", "よりも", "のほうを", "N のほうが: phía N thì hơn."],
    ["昨日は 天気が (  )。(Hôm qua thời tiết tốt)", "よかったです", "いかったです", "よいでした", "よくでした", "いい → よかったです (bất quy tắc)."]
  ]
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
`;
