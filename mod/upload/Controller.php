<?php  
!defined('DATA_DIR')&&die('');
define("UPPATH",DATA_DIR.basename($_POST['pid']).DS.substr(basename($_POST['id']) , 0 , 6).DS.basename($_POST['id']).DS);
define("ALBUMS_PATH",UPPATH.'albums'.DS);
define("RESIZES_PATH",UPPATH.'640'.DS);
define("THUMBS_PATH",UPPATH.'200'.DS);
define("SMALL_PATH",UPPATH.'64'.DS);
/* 解决 escapeshellarg 中文被过滤 */
setlocale(LC_CTYPE,'en_US.UTF-8');
/* 允许跨域
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 header('Access-Control-Allow-Origin: *');
 exit;
}
else {
 header('Access-Control-Allow-Origin: *');
}
 */
class upload_Controller extends Controller{
    private $options = array(
        '640'=>array(
            'path'=>RESIZES_PATH,
            'width' =>640,
            'height'=>640,
            'master'=>2
        ),
        '200'=>array(
            'path'=>THUMBS_PATH,
            'width' =>200,
            'height'=>200,
            'master'=>2
        ),
        '64'=>array(
            'path'=>SMALL_PATH,
            'width' =>64,
            'height'=>64,
            'master'=>2
        )
    );
    
    private $config=array();
    /* 初始化函数 */
    public function __construct(){
        $this->config['image_quality']       =	 75;
        $this->config['image_sharpen']       =	 15;
        $this->config['driver']              =   'GD';
    } 
    public function has(){
         $ary = explode('-',$_POST['id']);
         if(count($ary) > 1 && View::getInstance()->auth->getAuthData('ID') === $ary[1]){
            return true;
         }
         return false;
    }
    public function mkFolder($path){ 
	/* 第三个参数是“true”表示能创建多级目录，iconv防止中文目录乱码 */
	//if (!is_dir($path)) @mkdir(iconv("UTF-8","GBK",$path),0777,true);
	    if (!is_dir($path)) @mkdir($path,0744,true);
    }
   /** 保存上传文件 */
    private function _uploadfile($origin, $dest, $tmp_name)
    {
        $baseName = pathinfo($origin,PATHINFO_FILENAME);
        $fulldest = $dest.$origin;
        $filename = $origin;
        $fileExt = strtolower(pathinfo($origin,PATHINFO_EXTENSION));
        if($fileExt=='php' || $fileExt=='phpx') return false;
        $fileExt= $fileExt?'.'.$fileExt:$fileExt;
        for ($i=1; file_exists($fulldest); $i++)
        {
            $filename = $baseName.'['.$i.']'.$fileExt;
            $fulldest = $dest.$filename;
        }      
        if (move_uploaded_file($tmp_name, $fulldest))
            return $filename;
        return false;
    }
    /** 保存网络文件 */
    private function _getUrlImg($url)
    {
        $filename=microtime(1).'.jpg';
        $fh = fopen(ALBUMS_PATH.$filename,"wb");
        if(function_exists('curl_init')){
            $ch = curl_init(); 
            curl_setopt($ch, CURLOPT_URL, $url); 
            curl_setopt($ch, CURLOPT_HEADER,0); 
            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); 
            curl_setopt($ch, CURLOPT_TIMEOUT,300); 
           
            curl_setopt($ch,CURLOPT_FILE,$fh); 
            $rtn = curl_exec($ch); 
            fclose($fh); 
            if(!curl_errno($ch)){
                curl_close($ch);
                //echo $rtn;
                return $filename;
            }else{ 
                //echo 'curl error'.curl_errno($ch);
                return false;
            } 
        }else{
            $state = @file_get_contents($url,0,null,0,1);//获取网络资源的字符内容
            if($state){
                ob_start();//打开输出
                readfile($url);//输出图片文件
                $img = ob_get_contents();//得到浏览器输出
                ob_end_clean();//清除输出并关闭
                $size = strlen($img);//得到图片大小
                fwrite($fh, $img);//向当前目录写入图片文件，并重新命名
                fclose($fh);
                return $filename;
            }else{
                return false;
            }
        }
    }
    public function write()
    { 
        if($_FILES&&$_FILES['Filedata']['error']>0){
            $msg=['','该文件大于PHP配置允许的大小','该文件大于此表单允许的大小','仅上载了部分文件',
            '未上传任何文件','','缺少一个临时文件夹','无法将文件写入磁盘','因扩展名被拒绝上传',
            '未知错误:'.$_FILES['Filedata']['error']];
            echo $msg[$_FILES['Filedata']['error']];
            exit;
        }
        $this->mkFolder(ALBUMS_PATH);
        $filename=false;
        if(isset($_POST['url']))$filename=$this->_getUrlImg($_POST['url']);
        if(isset($_FILES['Filedata']))$filename = $this->_uploadfile($_FILES['Filedata']['name'],ALBUMS_PATH,$_FILES['Filedata']['tmp_name']);
	    if($filename){
		    $finfo = finfo_open(FILEINFO_MIME_TYPE); // 返回 mime 类型
		    $mime = finfo_file($finfo, ALBUMS_PATH.$filename);
		    if(stripos($mime,'image')!== false)
		    {
        	    foreach($this->options as $option){
                    $this->mkFolder($option['path']);
            	    upload_graphics::resize(ALBUMS_PATH.$filename,$option['path'].$filename,$option,$this->config);
	    	    }
		    }	
		    $files[$filename]=$mime;
             echo json_encode(['files'=>$files,'path' => BASE_URL,'filename'=>$filename],JSON_UNESCAPED_UNICODE);
        }
    }
    public function del()
    {
        foreach ($this->options as $k => $v)
        {
            @unlink($v['path'].basename($_POST['filename']));
        }
        if(unlink(ALBUMS_PATH.basename($_POST['filename'])))
            echo 1;
        else
            echo 0;
        foreach ($this->options as $k => $v)
        {
            @rmdir($v['path']);
        }
        @rmdir(ALBUMS_PATH);
        @rmdir(UPPATH);      
    }
    public function ls()
    {
	    $files =[];		
	    if(is_dir(ALBUMS_PATH))
	    {
		    $finfo = finfo_open(FILEINFO_MIME_TYPE); // 返回 mime 类型
		    foreach (glob(ALBUMS_PATH."*.*") as $file) {
			
                $filename = basename($file);         
			    $files[$filename] = finfo_file($finfo, $file);
		    }
		    finfo_close($finfo);
        }
        /* 返回其他格式文件替代图片的目录 */
   	    echo json_encode(['files'=>$files,'path' => BASE_URL],JSON_UNESCAPED_UNICODE);
    }
}
?>
