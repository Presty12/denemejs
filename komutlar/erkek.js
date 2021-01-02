const Discord = require('discord.js')
const datab = require('quick.db')
const ayarlar = require('../ayarlar.json')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {

if(!['790861621685256212','790861621648031771'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)

const erkek = message.guild.roles.cache.find(r => r.id === '790861621554839579')
const erkek2 = message.guild.roles.cache.find(r => r.id === '790861621529411621')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '790861621479211017')
const savelogs = message.guild.channels.cache.find(c => c.id === '790861621743714361')





const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı belirtmelisin.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
if(member.id === member.user.username.includes(ayarlar.tag)) return message.channel.send('Taglı alımdayız. Üyeyi tag almadan kayıt etmeyin!')

if(!args[0]) return message.channel.send('Bir kullanıcı belirtmelisin.')
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
 datab.add('case', 1)
 const gruzzramirez = await datab.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``

let tag = '✩'
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirtmelisin.')
if(!age) return message.channel.send('Bir yaş belirtmelisin.')

datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)
let erkekdata = datab.fetch(`yetkili.${message.author.id}.erkek`)

const rol = "790861621554839579";
datab.set(`rol.${message.guild.id}`, rol)
let rol1 = datab.fetch(`rol.${message.guild.id}`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.add(erkek2)
member.roles.remove(kayıtsız)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.add(erkek2)
member.roles.remove(kayıtsız)

const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
:christmas_tree: ${member} adlı kullanıcı, ${message.author} adlı yetkili tarafından kayıt edildi.
:christmas_tree: ${erkek} & ${erkek2} rolleri Verilip ${kayıtsız} rolü alındı.
:christmas_tree: Kullanıcının takma adı \`${tag} ${name} | ${age}\` olarak güncellendi`)
.setFooter(`Kayıt Bilgileri İçin .teyitsay! Top 10 için .topteyit!`)
.setColor("0x2f3136")
message.channel.send(embed)


const saveall = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
:christmas_tree: ${member} adlı kullanıcı ${message.author} tarafından kayıt edildi.
:christmas_tree: Yetkilinin toplam ${alldata} kayıtı & ${erkekdata} erkek kayıtı var.
:christmas_tree: Yetkili kullanıcıyı ${name} | ${age} olarak kayıt etti.`)
.setFooter(`Kayıt saati : ${kayıtsaat}`)
savelogs.send(saveall)

datab.push(`isim.${message.guild.id}`, {
  userID: member.id,
  isim: name,
  yas: age,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }
