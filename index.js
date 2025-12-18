import axios from "axios";
import Mock from "mockjs";
import { promiseLimit, sleep } from "./utils/index.js";
import {
  decreaseLoginCount,
  generateEducationPdf,
  getAllUsers,
  getUserData,
  increaseLoginCount,
  increasePdfLimit,
  register,
  updateUserData,
} from "./apis/index.js";

/**
 * 生成随机用户名（中文名或英文名）
 * @returns {string} 随机生成的中文名或英文名
 * @example
 * generateUsername(); // "张三" 或 "John Smith"
 */
const generateUsername = () => {
  // 随机选择生成中文名或英文名
  const isChinese = Math.random() > 0.5;

  if (isChinese) {
    // 生成中文名（2-4个字）
    return Mock.Random.cname() + Math.random().toString(36).substring(2, 10);
  } else {
    // 生成英文名（名 + 姓）
    return (
      `${Mock.Random.first()} ${Mock.Random.last()}` + Math.random().toString(36).substring(2, 10)
    );
  }
};
const generatePassword = () => {
  return Math.random().toString(36).substring(2, 20);
};

async function main() {
  // 注册任务
  /*   const tasks = Array.from({ length: 10000000 }, (_, index) => async () => {
    const username = generateUsername();
    const password = generatePassword();
    console.log("注册", index, "-", username, "-", password);
    await register(username, password);
  });
  await promiseLimit(tasks, 50); */

  const username = /* generateUsername() */ "Ayumi398";
  const password = /* generatePassword() */ "111111";
  /* console.log("注册", username, "-", password);
  const registerResult = await register(username, password);
  console.log("注册结果", registerResult); */

  /* const users = await getAllUsers();
  console.log("users", users); */

  /*   let index = 0;
  for (const user of users) {
    try {
      const { username, password, remaining_logins, pdf_limit } = user;
      if (!(remaining_logins || pdf_limit)) {
        continue;
      }
      const now = () => new Date().toISOString().replace("T", " ").substring(0, 19);
      console.log(`[${now()}] 增加积分`, index, "-", username);
      const increasePdfLimitResult = await increasePdfLimit(
        username,
        Math.floor(99999999 * Math.random())
      );
      console.log(`[${now()}] 增加积分结果`, increasePdfLimitResult);
      console.log(`[${now()}] 增加登录次数`, index, "-", username);
      const increaseLoginCountResult = await increaseLoginCount(
        username,
        Math.floor(99999999 * Math.random())
      );
      console.log(`[${now()}] 增加登录次数结果`, index, "-", increaseLoginCountResult);
      index++;
      await sleep(1000 * 60 * 1);
    } catch (error) {
      console.log("error", error);
    }
  } */

  /* // 减登录次数
  console.log("减登录次数", username);
  const decreaseLoginCountResult = await decreaseLoginCount(username, 48);
  console.log("减登录次数结果", decreaseLoginCountResult); */

  /*  console.log("增加积分", username);
  const increasePdfLimitResult = await increasePdfLimit(username, 99999999);
  console.log("增加积分结果", increasePdfLimitResult);
  console.log("增加登录次数", username);
  const increaseLoginCountResult = await increaseLoginCount(username, 99999999);
  console.log("增加登录次数结果", increaseLoginCountResult); */

  /* console.log("重置登录次数", username);
  const resetUserLoginsResult = await resetUserLogins(username);
  console.log("重置登录次数结果", resetUserLoginsResult); */

  /* console.log("生成教育PDF", username);
  const generateEducationPdfResult = await generateEducationPdf();
  console.log("生成教育PDF结果", generateEducationPdfResult); */
  /* const generateEducationTasks = Array.from({ length: 10000000 }, (_, index) => async () => {
    const username = generateUsername();
    const password = generatePassword();
    console.log("生成教育PDF", username);
    const generateEducationPdfResult = await generateEducationPdf();
    console.log("生成教育PDF结果", generateEducationPdfResult);
  });
  await promiseLimit(generateEducationTasks, 100); */

/*   const userId = "2724793a-a01b-41fd-8d91-3fa47851a39e";
  const userData = await getUserData(userId);
  console.log("userData", userData);
  for (const data of userData.student_status) {
    const { id } = data;
    console.log("id", id);
    await updateUserData(userId, { id });
    await sleep(5000);
  } */
}

main();
