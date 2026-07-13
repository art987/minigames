//获取公众平台access_token
    protected function getopen_token()
    {
        if (Cache::get('open_token_time') > time()) {
            return Cache::get('open_token');
        } else {
            $appid = 'wx51de7996f36db20f';
            $appsecret = '3d8a834df7070576c5609f87a1440bfa';
            $url = 'https://api.weixin.qq.com/cgi-bin/token';
            $data = [
                'grant_type' => 'client_credential',
                'appid' => $appid,
                'secret' => $appsecret
            ];
            $res = do_get($url, $data);
            $res = json_decode($res, true);
           Cache::set('open_token_time', time() + 7200);
            Cache::set('open_token', $res['access_token']);
            return $res['access_token'];
        }
    }
     //  公众号换ticket
    protected function wxticket()
    {
        if (Cache::get('open_ticket_time') > time()) {
            return Cache::get('open_ticket');
        } else {
            $url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' . $this->getopen_token() . '&type=jsapi';
            $res = http_url($url);
            $res = json_decode($res,true);
            $ticket = $res['ticket'];
            Cache::set('open_ticket_time', time() + 7200);
            Cache::set('open_ticket', $ticket);
            return $ticket;
        }
    }
    // 公众号生成签名
    public function signtrue()
    {
        header("Access-Control-Allow-Origin:*");
        header('Access-Control-Allow-Methods:*');
        $ticket = $this->wxticket();
        $timestamp = (string)time();
        $noncestr = generateNonceStr();
        $string1 = 'jsapi_ticket='.$ticket;
        $string1.='&noncestr='.$noncestr;
        $string1.='&timestamp='.$timestamp;
        $string1.='&url=https://0315678.cn/';
        $str = sha1($string1);
        $data = [
            'timestamp'=>$timestamp,
            'noncestr'=>$noncestr,
            'signature'=>$str
        ];
        return json(['status'=>1,'data'=>$data]);
    }