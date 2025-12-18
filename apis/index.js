import axios from "axios";
import { fileToBase64, generateSignature } from "../utils/index.js";
import path from "path";
import dayjs from "dayjs";
import fs from "fs";

const BASE_URL = "http://chsiii.cn:9092";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Timestamp": Date.now().toString(),
    "X-App-Key": "sadwgfsefsdgfsdgf",
  },
});

axiosInstance.interceptors.request.use(config => {
  const timestamp = Date.now().toString();
  const { method, url, data } = config;
  config.headers["X-Timestamp"] = timestamp;
  config.headers["X-App-Key"] = "sadwgfsefsdgfsdgf";
  config.headers["X-Signature"] = generateSignature(method, url, data || {}, timestamp);
  return config;
});

/** 注册 */
export const register = async (username, password) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/api/register`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          "proxy-connection": "keep-alive",
          AppKey: "fuckyou_20251217",
          Referer: `${BASE_URL}/register`,
        },
      }
    );
    // console.log(response.data);
    if (response.data.success) {
      console.log("注册成功", username, "-", password);
    } else {
      console.log("注册失败");
    }
  } catch (error) {
    console.error("注册请求失败:", error.message);
    if (error.response) {
      console.error("响应数据:", error.response.data);
    }
  }
};

/** 增加积分 */
export const increasePdfLimit = async (username, increaseAmount = 100) => {
  const response = await axiosInstance.post("/api/increase-pdf-limit", {
    username,
    increaseAmount,
  });
  return response.data;
};

/** 扣除积分 */
export const decreasePdfLimit = async (username, decreaseAmount = 100) => {
  const response = await axiosInstance.post("/api/decrease-pdf-limit", {
    username,
    decreaseAmount,
  });
  return response.data;
};

/** 重置积分 */
export const resetPdfLimit = async username => {
  const response = await axiosInstance.post("/api/reset-pdf-limit", {
    username,
  });
  return response.data;
};

/** 增加登录次数 */
export const increaseLoginCount = async (username, addLogins = 10000000) => {
  const response = await axiosInstance.post("/api/update-user-logins", {
    username,
    addLogins,
  });
  return response.data;
};

/** 减少登录次数 */
export const decreaseLoginCount = async (username, decreaseLogins = 10000000) => {
  const response = await axiosInstance.post("/api/decrease-user-logins", {
    username,
    decreaseLogins,
  });
  return response.data;
};

/** 重置登录次数 */
export const resetUserLogins = async username => {
  const response = await axiosInstance.post("/api/reset-user-logins", {
    username,
  });
  return response.data;
};

/** 生成教育PDF */
export const generateEducationPdf = async d => {
  const defaultPhoto = await fileToBase64(path.resolve(process.cwd(), "assets/avatar.jpg"));
  const {
    name = "赵子余",
    gender = "要你管",
    birthDate = "1990-01-01",
    enrollmentDate = "2010-01-01",
    graduationDate = "2014-01-01",
    school = "清华大学",
    major = "计算机科学",
    duration = "4年",
    degreeLevel = "本科",
    educationType = "全日制",
    studyType = "本科",
    graduationStatus = "毕业",
    certificateNumber = "1234567890",
    principalName = "张三",
    photo = defaultPhoto,
  } = d || {};

  const response = await axiosInstance.post("/api/generate-education-pdf", {
    name,
    gender,
    birthDate: dayjs(birthDate).format("YYYY年MM月DD日"),
    enrollmentDate: dayjs(enrollmentDate).format("YYYY年MM月DD日"),
    graduationDate: dayjs(graduationDate).format("YYYY年MM月DD日"),
    school,
    major,
    duration,
    degreeLevel,
    educationType,
    studyType,
    graduationStatus,
    certificateNumber,
    principalName,
    photo,
  });
  // 解码文件名，处理可能的URL编码
  let fileName = decodeURIComponent(response.headers["content-disposition"])
    .split("filename=")[1]
    .split(";")[0]
    .trim();
  // 去除文件名两端的双引号或单引号
  fileName = fileName.replace(/^["']|["']$/g, "");
  const file = await response.data;
  /*  const pdfDir = path.resolve(process.cwd(), "assets/pdf");
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pdfDir, fileName), file); */
  return fileName;
};

/**
 * 获取所有用户列表
 * @param {Function} l - 成功时的回调，传入用户列表
 * @param {Function} ue - 失败时的消息提示回调
 * @param {Function} L - 结束时的 loading 状态设置回调（参数为 false 关闭 loading）
 * @param {string} [et=BASE_URL] - 基础地址，可不传
 * @returns {Promise<void>}
 */
export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.post("/api/get-all-users");
    if (res.data.success) {
      const users = res.data.users;
      // 保存到文件 users.json
      fs.writeFileSync(path.resolve(process.cwd(), "users.json"), JSON.stringify(users, null, 2));
      return users;
    } else {
      throw new Error(res.data.error || "获取用户列表失败");
    }
  } catch (error) {
    console.log("error", error);
    console.error("获取用户列表失败:", error.message);
    if (error.response) {
      console.error("响应数据:", error.response.data);
    }
  }
};

/** 获取用户数据 */
export const getUserData = async userId => {
  const response = await axiosInstance.post("/api/get-user-data", {
    userId,
  });
  return response.data;
};

/** 更新用户数据 */
export const updateUserData = async (userId, data) => {
  const {
    id,
    degree_photo = await fileToBase64(
      path.resolve(
        process.cwd(),
        "assets/pdf/中国高等教育学位在线验证报告_赵子余_1765938239890.pdf"
      )
    ),
  } = data || {};
  const payload = {
    action: "update",
    table: "student_status",
    userId: userId,
    id: id,
    data: {
      degree_photo: degree_photo,
    },
  };
  const response = await axiosInstance.post("/api/update-data", payload);
  return response.data;
};
