import { useEffect } from 'react';

export default function useLog() {
  useEffect(()=> {
    console.log('组件创建');
    return () => {
      console.log('组件卸载');
    };
  }, []);
}
