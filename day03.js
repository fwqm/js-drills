// // ①let / const -- const 不能重新赋值
// const a = 1;
// let b = 2;
// b = 3;          // 合法
// // a = 3;       // 报错

// // ②函数由两种写法，完全等价
// function add(x, y) {return x + y; }
// const add2 = (x, y) => x + y;
// const square = n => n * n;  // 单参数可省括号，单行可省return

// // ③模板字符串（比字符串拼接方便）
// const msg = `${a} 和 ${b} 相加等于 ${add(a, b)}`;

// // ④解构（从对象/数组里取值）
// const {name, score } = students[0];
// const [first, ...rest] = [1, 2, 3];

// // ⑤展开（复制对象并覆盖某个字段，这是React里最常用的写法）
// const newObj = { ...students[0], score: 100};


// day03.js -- JS 基础练习
// day03.js —— JS 基础练习
const students = [
  { name: "张三", cls: "软件1班", score: 88, subject: "数学" },
  { name: "李四", cls: "软件1班", score: 59, subject: "数学" },
  { name: "王五", cls: "软件2班", score: 92, subject: "英语" },
  { name: "赵六", cls: "软件2班", score: 45, subject: "英语" },
  { name: "钱七", cls: "软件1班", score: 76, subject: "数学" },
  { name: "孙八", cls: "软件2班", score: 100, subject: "英语" },
];

// 1. 所有人的名字
const allNames = students.map(s => s.name);
console.log("1.", allNames);
// 期望：(6) ['张三', '李四', '王五', '赵六', '钱七', '孙八']

// 2. 名字 + 分数
const nameWithScore = students.map(s => `${s.name}: ${s.score}`);
console.log("2.", nameWithScore);

// 3. 分数 +5，上限 100
const boostedScores = students.map(s => s.score + 5 > 100 ? 100 : s.score + 5);
console.log("3.", boostedScores);
// 期望：(6) [93, 64, 97, 50, 81, 100]

// 4. 名字（班级）
const nameWithClass = students.map(s => `${s.name}(${s.cls})`);
console.log("4.", nameWithClass);

// 5. 加 isPass 标记
const withPassFlag = students.map(s => `${s.name}, isPass:${s.score >= 60 ? true : false}`);
console.log("5.", withPassFlag);

// 6. 分数转等级
function toGrade(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  return "D";
}
const grades = students.map(s => toGrade(s.score));
console.log("6.", grades);
// 期望：(6) ['B', 'D', 'A', 'D', 'B', 'A']

// 7. 及格的人
const passedStudents = students.filter(s => s.score >= 60);
console.log("7.", passedStudents.map(s => s.name));
// 期望：(4) ['张三', '王五', '钱七', '孙八']

// 8. 软件1班的人
const class1Students = students.filter(s => s.cls == "软件1班");
console.log("8.", class1Students.length, "人");
// 期望：8. 3 人

// 9. 分数在 60~90 之间（含两端）
const inRangeStudents = students.filter(s => s.score >= 60 && s.score <= 90);
console.log("9.", inRangeStudents.map(s => s.name));
// 期望：(2) ['张三', '钱七']

// 10. 名字里含"三"
const nameHasSan = students.filter(s => s.name.includes("三"));
console.log("10.", nameHasSan.map(s => s.name));
// 期望：(1) ['张三']

// ============================================================
//                    11 ~ 19 题（自己写）
//  把每题的占位值 = [] / 0 / {} 换成你的表达式，跑通再写下一题
// ============================================================

// 11. filter —— 不及格的（score < 60）
//     期望：["李四", "赵六"]
const q11 = students.filter(s => s.score < 60); // TODO: students.filter(...).map(s => s.name)
console.log("11.", q11.map(s => s.name));

// 12. filter —— 软件2班 且 分数 > 90
//     期望：["王五", "孙八"]
const q12 = students.filter(s => s.cls == "软件2班" && s.score > 90); // TODO: 两个条件用 && 连起来
console.log("12.", q12.map(s => s.name));

// 13. reduce —— 总分
//     期望：460
const q13 = students.reduce((acc, s) => acc + s.score, 0); // TODO: reduce((acc, s) => acc + s.score, 0)
console.log("13.", q13);

// 14. reduce —— 平均分，保留 1 位小数
//     期望：76.7
//     坑：toFixed(1) 返回的是"字符串"，打印看不出区别，但不能再参与计算
//         要数字就用 Math.round(x * 10) / 10
const q14 = Math.round(students.reduce((acc, s) => acc + s.score, 0) / students.length * 10) / 10; // TODOs
console.log("14.", q14);

// 15. reduce —— 最高分的那个人，返回整个对象
//     期望：{ name: "孙八", cls: "软件2班", score: 100, subject: "英语" }
//     提示：初始值给 students[0] 当"擂主"，之后每个来挑战
const q15 = students.reduce((best, s) => best = best.score > s.score ? best : s, students[0]); // TODO: reduce((best, s) => 谁分高留谁, students[0])
console.log("15.", q15);

// 16. reduce —— 按班级分组，得到一个对象，每个班一个数组  ← 今天最难
//     期望：{ "软件1班": ["张三","李四","钱七"], "软件2班": ["王五","赵六","孙八"] }
//     提示：初始值给 {}，回调里四行：
//       const key = s.cls;
//       if (!acc[key]) acc[key] = [];   // 第一次遇到这个班，先建空数组
//       acc[key].push(s.name);          // 然后往里放
//       return acc;                     // 别忘了返回累加器
const q16 = students.reduce((acc, s) => 
    {
        const key = s.cls;
        if (!acc[key]) acc[key] = [];
        acc[key].push(s.name);
        return acc;
    }
    ,{}); // TODO
console.log("16.", q16);

// 17. reduce —— 及格人数
//     期望：4
//     提示：累加器是数字，回调里用三元 acc + (s.score >= 60 ? 1 : 0)
const q17 = students.reduce((acc, s) => acc + (s.score >= 60 ? 1 : 0), 0); // TODO
console.log("17.", q17);

// 18. reduce —— 按科目求平均分
//     期望：{ "数学": 74.3, "英语": 79 }
//     提示：两次 reduce。第一次按科目分组拿总分和人数，第二次算平均
//         或者从头就用一个累加器 { 科目: [总分, 人数] }
const raw = students.reduce((acc, s) => 
    {
        const key = s.subject;
        if(!acc[key])
            acc[key] = [0,0];
        acc[key][0] += s.score;
        acc[key][1] += 1;
        return acc;
    }
    ,{}); 
const q18 = {}// TODO
for (const[subject, [sum, count]] of Object.entries(raw)){
    q18[subject] = Math.round(sum / count * 10) / 10;
}
console.log("18.", q18);

// 19. 链式 —— 软件1班 及格同学 的平均分
//     期望：82
//     提示：filter → filter → reduce 三段拼起来，或者先 filter 再 reduce
const q19_filter1 = students.filter(s => s.cls == "软件1班"); // TODO
const q19_filter2 = q19_filter1.filter(s => s.score >= 60);
const q19_reduce_raw = q19_filter2.reduce((acc, s) => acc += s.score, 0);
const q19 = Math.round(q19_reduce_raw / q19_filter2.length * 10) / 10;
console.log("19.", q19);