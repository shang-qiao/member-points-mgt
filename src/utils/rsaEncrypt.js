import { JSEncrypt } from 'jsencrypt/bin/jsencrypt';

/**
 * 加密
 * @param { 公钥 } publicKey
 * @param { 待加密内容 } txt
 * @returns { 加密后内容 }
 */
export function encrypt(publicKey, txt) {
  const encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);
  // 对需要加密的数据进行加密
  return encryptor.encrypt(txt);
}
