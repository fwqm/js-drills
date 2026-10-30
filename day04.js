// ===========1. 对象 / 解构 / 展开 ===============
const user = {
    name: "张三",
    age: 20,
    tags:
    ["js", "git"],
    city: "成都"
};

// ① 解构：按“键名”取值（跟数组按位置不同）
const { name, age } = user;
console.log("1-1.", name, age);

// ② 解构时改名（当名字撞车时用）
const { name : userName } = user;
console.log("1-2.", userName);

// ③ 嵌套解构：取 tags 的第一个
const { tags : [firstTag] } = user;
console.log("1-3.", firstTag);

// ④ 展开：复制并覆盖（React 里每天用）
const older = {...user, age: 21};
console.log("1-4.", older);

// ⑤ 剩余运算符：把剩下的收进一个对象
const { city, ...others } = user;
console.log("1-5.", city, others);


// 一个假的异步函数：1 秒后给你结果
function delay(ms){
    return new Promise(reslove => setTimeout(reslove, ms));
}

async function demo() {
    console.log("A 开始");
    await delay(1000);
    console.log("B 一秒后");
}
demo();
console.log("C 我在外面，可能比 B 先打印");
/*
规则	                            说明
async 函数永远返回 Promise	        哪怕你 return 1，外面拿到的是 Promise<1>
await 只能写在 async 函数里	        顶层直接写会报错（SyntaxError: await is only valid in async functions）
用 try/catch 捕获 await 的错误	    不写的话错误会变成未捕获异常，程序可能静默失败
*/

// ============ 2. 异步请求 ============
async function getUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: { "User_Agent": "fwqm-learning" }  // GitHub 要求带 UA，否则 403
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return await res.json();
}

async function main() {
    try {
        const u = await getUser("fwqm");
        console.log("名字：", u.name);
        console.log("粉丝：", u.followers);
        console.log("公开仓库：", u.public_repos);
        console.log("注册时间：", u.created_at);
        console.log("头像：", u.avatar_url);
    } catch(e) {
        console.log("", e.message);        
    }
}

main();