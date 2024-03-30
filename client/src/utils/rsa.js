/* 引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。
export default {
      /* JSEncrypt加密 */
      rsaPublicData(data) {
        var jsencrypt = new JSEncrypt();
        jsencrypt.setPublicKey(publicKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = jsencrypt.encrypt(data);
        return result
      },
      /* JSEncrypt解密 */
      // rsaPrivateData(data) {
      //   var jsencrypt = new JSEncrypt()
      //   jsencrypt.setPrivateKey(privateKey)
      //   // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      //   var result = jsencrypt.encrypt(data)
      //   return result
      // },
      /* 加密 */
      encrypt(data) {
        const PUBLIC_KEY = publicKey;
        var encryptor = new Encrypt();
        encryptor.setPublicKey(PUBLIC_KEY)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        const result = encryptor.encryptLong(data);
        return result
      },
      /* 解密 - PRIVATE_KEY - 验证 */
      // decrypt(data) {
      //   const PRIVATE_KEY = privateKey
      //   var encryptor = new Encrypt()
      //   encryptor.setPrivateKey(PRIVATE_KEY)
      //   // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      //   var result = encryptor.decryptLong(data)
      //   return result
      // }
    }