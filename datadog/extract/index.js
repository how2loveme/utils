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

  let reg = {
    referer: /(?<=(referer":"))(.*?)(?=")/g,
    commandPath: /(?<=(command.path : ))(.*?)(?= ,)/g,
    commandUrl: /(?<=(options : {"url":"))(.*?)(?=")/g,
    xNodeUrl: /(?<=("x-node-url":"))(.*?)(?=")/g,
    loginType: /(?<=("loginType":"))(.*?)(?=")/g,
    userId: /(?<=("userId":"))(.*?)(?=")/g,
    svcMgmtNum: /(?<=("svcMgmtNum":"))(.*?)(?=")/g,
    mbrChlId: /(?<=("mbrChlId":"))(.*?)(?=")/g,
    errCode: /(?<=("code":"))(.*?)(?=")/g,
    errMsg: /(?<=(\\"msg\\":\\"))(.*?)(?=\\")/g,
  };

  // const res = message.match(regexr).join('')
  temp.referer = (message.match(reg.referer))?.[0];
  temp.commandPath = (message.match(reg.commandPath)||[])?.[0];
  temp.commandUrl = (message.match(reg.commandUrl)||[])?.[0];
  temp.xNodeUrl = (message.match(reg.xNodeUrl)||[])?.[0];
  temp.loginType = (message.match(reg.loginType)||[])?.[0];
  temp.userId = (message.match(reg.userId)||[])?.[0];
  temp.svcMgmtNum = (message.match(reg.svcMgmtNum)||[])?.[0];
  temp.mbrChlId = (message.match(reg.mbrChlId)||[])?.[0];
  temp.errCode = (message.match(reg.errCode)||[])?.[0];
  temp.errMsg = (message.match(reg.errMsg)||[])?.[0];

  // if (idx === 0 ) console.log(temp);
  arr.push(temp);
})
const wb = xlsx.utils.book_new()
const ws = xlsx.utils.json_to_sheet(arr)
xlsx.utils.book_append_sheet(wb, ws, filename.substring(0, filename.length - 4))
xlsx.writeFile(wb, `dist/${filename}`)
