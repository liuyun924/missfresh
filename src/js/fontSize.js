<script type="text/javascript">

	// �ѳߴ�Ŵ�N����N��window.devicePixelRatio��
	var wd = document.documentElement.clientWidth*window.devicePixelRatio/10;
	//��������*�豸���ر�=��ʵ����

	document.getElementsByTagName("html")[0].style.fontSize = wd + "px";

	// ����Ļ�ı�����С��N��֮һ��N��window.devicePixelRatio��
	var scale = 1/window.devicePixelRatio;
	var mstr = 'initial-scale='+ scale +', maximum-scale='+ scale +', minimum-scale='+ scale +', user-scalable=no';
	document.getElementById("vp").content = mstr;
</script>