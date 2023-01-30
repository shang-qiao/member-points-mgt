import { useCallback } from 'react';
import { useState } from 'react';

export function useAsync(asyncFunc, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 返回一个 memoized 回调函数。
  // 该回调函数仅在某个依赖项改变时才会更新。
  // 自定义hook其实就是把useXXX方法执行以后，把方法体里的内容平铺到组件内部（便于理解）
  const execute = useCallback(() => {
    setLoading(true);
    return asyncFunc(params).then((res) => {
      setLoading(false);
      setData(res);
    }).catch((error) => {
      setLoading(false);
      setError(error);
    });
  }, [asyncFunc]);

  return { execute, data, loading, error };
};