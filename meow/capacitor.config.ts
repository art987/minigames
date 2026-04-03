import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flashmeow.poster',
  appName: '闪喵海报',
  webDir: 'www',
  server: {
    url: 'https://peacelove.top/postdiy/index.html',
    cleartext: true
  }
};

export default config;