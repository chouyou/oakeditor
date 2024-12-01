<?php
class article_Controller extends Controller{
	public function __construct(){
		$this->mod = 'article';
        parent::__construct();
		$this->sql = new article_articleTable($this->db);
		$this->cfg = new config_table($this->db);
		$this->cfg=$this->cfg->getcfg($this->mod);
    }
    public function has(){
        $this->sql->fields=$this->view->auth->storage_options;
        $this->sql->where=array('ID' => $_GET['id'],'USER' => $this->view->auth->session['username']);
        return $this->sql->has();
    }
    public function ls(){
        (empty($_GET['id'])||!is_numeric($_GET['id']))&&die('ID必须为数字');
       
        /* 得到 前台页面 导航 及 分类菜单 数据 */
        $this->sql->where=array('PID'=>$_GET['id']);
        $this->view->nav=$this->_get_nav($_GET['id']);
        
		/* 分页 */
		$this->view->pages=new libc_pages($this->sql->has(),20,libc_Filter::getInstance()->getURL($_GET['m'].'/'.$_GET['ac'].'/'.$_GET['id']));
        /* fields,where,limit,order by,desc */
       	$this->view->res=$this->sql->getdata($this->fields,null,$this->view->pages->begin.','.$this->view->pages->end,'UPTIME',true);
		/* true 此页面允许缓存 */
		$this->view->exc(true);
    }
    public function read(){
        $this->sql->where=array('ID'=>$_GET['id']);
        $this->view->res=$this->sql->getdata();
        count($this->view->res)||die('无此记录！');
		$this->view->nav=$this->_get_nav($this->view->res['0']['PID']);
        $this->view->header = $this->view->res[0];
		/* true 此页面允许缓存 */
		$this->view->exc(true);
    }
    public function edit(){
        if(empty($_GET['id']) or empty($_POST['title'])) return;
		$this->sql->where=array('ID'=>$_GET['id']);
		$_POST['UPTIME']='NOW()';
		$this->sql->up($_POST);
		echo libc_Filter::getInstance()->getURL($_GET['m'].'/read/'.$_GET['id']);
    }
    public function del(){
		$this->sql->where=array('ID'=>$_GET['id']);
        $pid=$this->sql->getdata()[0]['PID'];
        $id = basename($_GET['id']);
        $this->sql->del(); /* 删除 记录 */
        $sql = new comment_commentTable($this->db);/* 删除 评论 */
        $sql->where = array('CID'=>$_GET['id'],'PID'=>$pid);
        $sql->del();
        $this->view->delDir(DATA_DIR.$pid.DS.substr($id,0,6).DS.$id); /* 删除 上传文件 */
		echo libc_Filter::getInstance()->getURL($_GET['m'].'/ls/'.$pid);
    }
	public function write(){
        /* 上传文件检查，在网页刷新或关闭时，如果数据库没有此ID记录，上传的文件将被删除 */
        if(isset($_POST) && isset($_POST['file_check'])){
            $this->sql->where=array('ID'=>$_POST['id']);
            if($this->sql->has() < 1){
                $id = basename($_POST['id']);
                $pid = basename($_POST['pid']);
                $this->view->delDir(DATA_DIR.$pid.DS.substr($id,0,6).DS.$id);
            }
            return;
        }
        $this->view->id = date("YmdHis").'-'.$this->view->auth->getAuthData('ID');
		if(empty($_POST) or empty($_POST['id']) or empty($_POST['pid']) or empty($_POST['title'])){
			$this->view->pid = $_GET['id'];
			/* 此页面不允许缓存 */
	    	$this->view->exc(false);
		}else{
            $_POST['USER'] = $this->view->auth->session['username'];
			$_POST['ADDTIME']='NOW()';//date("Y-m-d H:i:s");
            $_POST['UPTIME']='NOW()';
            $this->sql->in($_POST);
            header("location:".libc_Filter::getInstance()->getURL($_GET['m'].'/read/'.$_POST['id']));
        }   
    }
}
?>

