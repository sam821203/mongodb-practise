// const fs = require("node:fs/promises");

// const readFile = async () => {
//   try {
//     const data = await fs.readFile("./text.txt", "utf8");
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// readFile();

const fs = require("node:fs/promises");

const deleteFile = async () => {
  try {
    await fs.unlink("./text.txt");
    console.log("檔案刪除成功！");
  } catch (err) {
    console.error("無法刪除檔案 ：", err);
  }
};

// deleteFile();

// path 模組
// __dirname 就是 global 物件中的一個屬性，這個屬性可以讓我們取得當前檔案的路徑
const path = require("node:path");
const filePath = path.join(__dirname, "text.txt");

console.log(filePath);

// os 模組
const os = require("node:os");

const osName = os.platform();
console.log("操作系統名稱：", osName);

const osVersion = os.release();
console.log("操作系統版本：", osVersion);

const cpuInfo = os.cpus();
console.log("CPU 資訊：", cpuInfo);

const networkInterfaces = os.networkInterfaces();
console.log("網路介面資訊：", networkInterfaces);

const totalMemory = os.totalmem();
console.log("總內存量：", totalMemory);
