import { JSEncrypt } from 'jsencrypt/bin/jsencrypt';

// 加密
export function encrypt(publicKey, txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  const en = encryptor.encrypt(txt);
  console.log('en', en);
  return en; // 对需要加密的数据进行加密
}

