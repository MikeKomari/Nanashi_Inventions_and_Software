// Shared by scripts/screens.mjs and scripts/videos.mjs: the real Chinese words typed into Lexi and
// the enrichment answer pasted back (readings: Hanyu Pinyin with tone marks, kana, Revised Romanisation).
/** Words typed into Lexi's quick capture. All six are enriched below. */
export const LEXI_WORDS = ["咖啡", "图书馆", "朋友", "天气", "学习", "旅行"];

/**
 * The enrichment answer pasted into Lexi, keyed by the Chinese word. Readings use Hanyu Pinyin with
 * tone marks, kana, and Revised Romanisation, as Lexi's prompt asks. Relationships are optional and
 * left out, so Lexi creates exactly one concept per captured word.
 */
export const LEXI_ENRICHMENT = {
  咖啡: {
    label: "coffee",
    tags: ["food and drink"],
    entries: [
      { language: "zh", writtenForm: "咖啡", reading: "kāfēi", meaning: "coffee", notes: "Measure word: 杯 (bēi) for a cup." },
      { language: "ja", writtenForm: "コーヒー", reading: "コーヒー", meaning: "coffee", notes: "Written in katakana." },
      { language: "ko", writtenForm: "커피", reading: "keopi", meaning: "coffee", notes: "Counted with 잔 (jan), a cup." },
    ],
    examples: [
      { language: "zh", text: "我每天早上喝一杯咖啡。", translation: "I drink a cup of coffee every morning." },
      { language: "ja", text: "毎朝コーヒーを一杯飲みます。", translation: "I drink a cup of coffee every morning." },
      { language: "ko", text: "저는 매일 아침 커피를 한 잔 마셔요.", translation: "I drink a cup of coffee every morning." },
    ],
  },
  图书馆: {
    label: "library",
    tags: ["places"],
    entries: [
      { language: "zh", writtenForm: "图书馆", reading: "túshūguǎn", meaning: "library", notes: "馆 marks a building or hall." },
      { language: "ja", writtenForm: "図書館", reading: "としょかん", meaning: "library", notes: "Same characters, Japanese reading." },
      { language: "ko", writtenForm: "도서관", reading: "doseogwan", meaning: "library", notes: "Sino-Korean word from 圖書館." },
    ],
    examples: [
      { language: "zh", text: "我常常去图书馆看书。", translation: "I often go to the library to read." },
      { language: "ja", text: "図書館で本を借りました。", translation: "I borrowed a book from the library." },
      { language: "ko", text: "도서관에서 공부해요.", translation: "I study at the library." },
    ],
  },
  朋友: {
    label: "friend",
    tags: ["people"],
    entries: [
      { language: "zh", writtenForm: "朋友", reading: "péngyou", meaning: "friend", notes: "The second syllable is in the neutral tone." },
      { language: "ja", writtenForm: "友達", reading: "ともだち", meaning: "friend", notes: "Everyday word; 友人 (ゆうじん) is more formal." },
      { language: "ko", writtenForm: "친구", reading: "chingu", meaning: "friend", notes: "Usually a friend of about the same age." },
    ],
    examples: [
      { language: "zh", text: "他是我最好的朋友。", translation: "He is my best friend." },
      { language: "ja", text: "週末に友達と映画を見ました。", translation: "I watched a film with a friend at the weekend." },
      { language: "ko", text: "친구를 만나러 가요.", translation: "I'm going to meet a friend." },
    ],
  },
  天气: {
    label: "weather",
    tags: ["daily life"],
    entries: [
      { language: "zh", writtenForm: "天气", reading: "tiānqì", meaning: "weather", notes: "Day-to-day conditions, not climate (气候)." },
      { language: "ja", writtenForm: "天気", reading: "てんき", meaning: "weather", notes: "いい天気 means fine weather." },
      { language: "ko", writtenForm: "날씨", reading: "nalssi", meaning: "weather", notes: "Native Korean word." },
    ],
    examples: [
      { language: "zh", text: "今天天气很好。", translation: "The weather is nice today." },
      { language: "ja", text: "今日はいい天気ですね。", translation: "Lovely weather today, isn't it?" },
      { language: "ko", text: "오늘 날씨가 좋아요.", translation: "The weather is nice today." },
    ],
  },
  学习: {
    label: "to study",
    tags: ["school"],
    entries: [
      { language: "zh", writtenForm: "学习", reading: "xuéxí", meaning: "to study; to learn", notes: "Also a noun: study, learning." },
      { language: "ja", writtenForm: "勉強する", reading: "べんきょうする", meaning: "to study", notes: "学習 (がくしゅう) exists but is more formal." },
      { language: "ko", writtenForm: "공부하다", reading: "gongbu-hada", meaning: "to study", notes: "From 공부 (study) plus 하다 (to do)." },
    ],
    examples: [
      { language: "zh", text: "我在学习中文。", translation: "I am studying Chinese." },
      { language: "ja", text: "毎日日本語を勉強しています。", translation: "I study Japanese every day." },
      { language: "ko", text: "저는 한국어를 공부하고 있어요.", translation: "I am studying Korean." },
    ],
  },
  旅行: {
    label: "to travel",
    tags: ["travel"],
    entries: [
      { language: "zh", writtenForm: "旅行", reading: "lǚxíng", meaning: "to travel; a trip", notes: "旅游 (lǚyóu) leans towards sightseeing." },
      { language: "ja", writtenForm: "旅行", reading: "りょこう", meaning: "travel; a trip", notes: "旅行する is the verb." },
      { language: "ko", writtenForm: "여행", reading: "yeohaeng", meaning: "travel; a trip", notes: "여행하다 is the verb." },
    ],
    examples: [
      { language: "zh", text: "我们打算明年去日本旅行。", translation: "We plan to travel to Japan next year." },
      { language: "ja", text: "夏休みに京都へ旅行しました。", translation: "I took a trip to Kyoto in the summer holidays." },
      { language: "ko", text: "다음 달에 부산으로 여행을 가요.", translation: "I'm travelling to Busan next month." },
    ],
  },
};

