<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="xqlc" uri="http://www.xqlc.com/xqlc" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <xqlc:block name="title">
    <fmt:message key="ui.cms.CMSManagement"/>
        </xqlc:block>
    </title>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/core/bootstrap/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/core/bootstrap/bootstrap-responsive.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/lib/xqlcuiextend/xqlc-platform-icons.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/lib/xqlcui/xqlc-ui-main.css">
    <link rel="stylesheet" href="${ctx}/static/ueditor/themes/default/ueditor.css" type="text/css" />
    <link rel="stylesheet" href="${ctx}/static/upload/css/uploadify.css" type="text/css" />
    <!-- 3rd party -->
    <link rel="stylesheet" type="text/css" href="${ctx}/static/websitetheme/css/datepicker.css">
    <xqlc:block name="css">
    </xqlc:block>
    <script src="${ctx}/static/js/core/jquery/jquery.js"></script>
    <script src="${ctx}/static/js/core/bootstrap/bootstrap.js"></script>
    <script src="${ctx}/static/js/lib/xqlcuiextend/xqlc.core.js"></script>
    <script src="${ctx}/static/upload/js/jquery.uploadify-3.1.js"></script>
    <script src="${ctx}/static/ueditor/editor_all.js"></script>
    <script src="${ctx}/static/ueditor/editor_config.js"></script>
    <!-- 3rd party -->
    <script src="${ctx}/static/websitetheme/js/bootstrap-datepicker.js"></script>
    <script src="${ctx}/static/websitetheme/js/jquery.pin.min.js"></script>
    <script src="${ctx}/static/js/ui/pinyin/pinyin.js"></script>
    <script src="${ctx}/static/js/ui/zClip/jquery.zclip.js"></script>
    <script type="text/javascript">
	    $(function() {
		    $('.btn-cancel').click(function() {
		        location.href = document.referrer;
		    });
	    });
    </script>

    <xqlc:block name="javascript">
    </xqlc:block>
</head>


<body>
<xqlc:block name="body">
</xqlc:block>
</body>
</html>
