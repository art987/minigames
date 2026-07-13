/**
 * 生成随机字串
 * @param number $length 长度，默认为16，最长为32字节
 * @return string
 */
function generateNonceStr($length = 16)
{
    // 密码字符集，可任意添加你需要的字符
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
        $str .= $chars[mt_rand(0, strlen($chars) - 1)];
    }
    return $str;
}
//curl请求
function http_url($url)
{
    $info = curl_init();
    curl_setopt($info, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($info, CURLOPT_HEADER, 0);
    curl_setopt($info, CURLOPT_NOBODY, 0);
    curl_setopt($info, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($info, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($info, CURLOPT_URL, $url);
    $output = curl_exec($info);
    curl_close($info);
    return $output;
}
 //get请求
     function do_get($url, $params)
    {
        $url = "{$url}?" . http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }