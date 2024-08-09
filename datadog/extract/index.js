const xlsx = require('xlsx');
const filename = 'ICAS3163_bom.csv'
const workbook = xlsx.readFile(__dirname + '/xlsx/' + filename)
const sheetName = workbook.SheetNames[0]
const result = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
const arr = [];
result.forEach((row, idx) => {
  let temp = {
    date: row['Date'],
    host: row['Host'],
    service: row['Service'],
  };
  const message = row['Message'];
  // if (idx === 0 ) console.log(message);

  const reg_referer = /(?<=(referer":"))(.*?)(?=")/g;
  const reg_commandPath = /(?<=(command.path : ))(.*?)(?= ,)/g;
  const reg_commandUrl = /(?<=(options : {"url":"))(.*?)(?=")/g;
  const reg_xNodeUrl = /(?<=("x-node-url":"))(.*?)(?=")/g;
  const reg_loginType = /(?<=("loginType":"))(.*?)(?=")/g;
  const reg_userId = /(?<=("userId":"))(.*?)(?=")/g;
  const reg_svcMgmtNum = /(?<=("svcMgmtNum":"))(.*?)(?=")/g;
  const reg_mbrChlId = /(?<=("mbrChlId":"))(.*?)(?=")/g;
  const reg_errCode = /(?<=("code":"))(.*?)(?=")/g;
  const reg_errMsg = /(?<=(\\"msg\\":\\"))(.*?)(?=\\")/g;

  // const res = message.match(regexr).join('')
  temp.referer = (message.match(reg_referer))?.[0];
  temp.commandPath = (message.match(reg_commandPath)||[])?.[0];
  temp.commandUrl = (message.match(reg_commandUrl)||[])?.[0];
  temp.xNodeUrl = (message.match(reg_xNodeUrl)||[])?.[0];
  temp.loginType = (message.match(reg_loginType)||[])?.[0];
  temp.userId = (message.match(reg_userId)||[])?.[0];
  temp.svcMgmtNum = (message.match(reg_svcMgmtNum)||[])?.[0];
  temp.mbrChlId = (message.match(reg_mbrChlId)||[])?.[0];
  temp.errCode = (message.match(reg_errCode)||[])?.[0];
  temp.errMsg = (message.match(reg_errMsg)||[])?.[0];

  // if (idx === 0 ) console.log(temp);
  arr.push(temp);
})
const wb = xlsx.utils.book_new()
const ws = xlsx.utils.json_to_sheet(arr)
xlsx.utils.book_append_sheet(wb, ws, filename.substring(0, filename.length - 4))
xlsx.writeFile(wb, `dist/${filename}`)
